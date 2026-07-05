// ---------------------------------------------------------------
// Meta (Facebook) Marketing API client.
// Reads live spend / purchases / ROAS / CPA from the Insights
// endpoint and returns them in the exact shapes lib/data.ts exports,
// so the UI does not need to change.
//
// Required env vars (set them in Vercel > Settings > Environment
// Variables, or a local .env.local — never commit them):
//   META_ACCESS_TOKEN    A long-lived System User or Page token with
//                        ads_read permission.
//   META_AD_ACCOUNT_ID   The ad account id, with or without the
//                        "act_" prefix (e.g. act_1234567890).
// Optional:
//   META_API_VERSION     Graph API version, defaults to v21.0.
// ---------------------------------------------------------------

import type { Campaign, Metric, PlatformRow, Trend } from "@/lib/data";

const GRAPH = "https://graph.facebook.com";

// Meta reports purchase conversions under several action types
// depending on how the pixel / CAPI is set up. Prefer the omni_ value.
const PURCHASE_TYPES = [
  "omni_purchase",
  "purchase",
  "offsite_conversion.fb_pixel_purchase",
];

interface MetaConfig {
  token: string;
  accountId: string;
  version: string;
}

interface DateRange {
  since: string;
  until: string;
}

type ActionEntry = { action_type: string; value: string };

function readConfig(): MetaConfig {
  const token = process.env.META_ACCESS_TOKEN;
  const rawAccount = process.env.META_AD_ACCOUNT_ID;
  if (!token || !rawAccount) {
    throw new Error(
      "Missing Meta Marketing API credentials. Set META_ACCESS_TOKEN and META_AD_ACCOUNT_ID."
    );
  }
  const accountId = rawAccount.startsWith("act_") ? rawAccount : `act_${rawAccount}`;
  const version = process.env.META_API_VERSION ?? "v21.0";
  return { token, accountId, version };
}

function iso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

// Current = the last 7 completed days. Previous = the 7 days before
// that, so deltas are a like-for-like week-over-week comparison.
function windows(): { current: DateRange; previous: DateRange } {
  const day = 86_400_000;
  const now = Date.now();
  return {
    current: { since: iso(new Date(now - 7 * day)), until: iso(new Date(now - day)) },
    previous: { since: iso(new Date(now - 14 * day)), until: iso(new Date(now - 8 * day)) },
  };
}

async function insights(
  cfg: MetaConfig,
  params: Record<string, string>
): Promise<any[]> {
  const url = new URL(`${GRAPH}/${cfg.version}/${cfg.accountId}/insights`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  url.searchParams.set("access_token", cfg.token);

  // Cache for an hour — this dashboard is a weekly report, not realtime.
  const res = await fetch(url, { next: { revalidate: 3600 } });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(`Meta API error: ${json?.error?.message ?? res.statusText}`);
  }
  return json.data ?? [];
}

function pickAction(entries: ActionEntry[] | undefined, types: string[]): number {
  if (!entries) return 0;
  for (const type of types) {
    const hit = entries.find((e) => e.action_type === type);
    if (hit) return Number(hit.value) || 0;
  }
  return 0;
}

interface Summary {
  spend: number;
  purchases: number;
  roas: number;
  cpa: number;
}

function summarize(row: any): Summary {
  const spend = Number(row?.spend ?? 0);
  const purchases = pickAction(row?.actions, PURCHASE_TYPES);
  const roas = pickAction(row?.purchase_roas, PURCHASE_TYPES);
  const reportedCpa = pickAction(row?.cost_per_action_type, PURCHASE_TYPES);
  const cpa = reportedCpa || (purchases ? spend / purchases : 0);
  return { spend, purchases, roas, cpa };
}

function currency(n: number): string {
  return `$${n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function integer(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

// Builds the { delta, trend, good } portion of a Metric.
// higherIsGood=false flips the color logic (used for CPA, where a
// drop is the good outcome).
function movement(
  curr: number,
  prev: number,
  higherIsGood: boolean
): Pick<Metric, "delta" | "trend" | "good"> {
  const pct = prev === 0 ? (curr === 0 ? 0 : 100) : ((curr - prev) / prev) * 100;
  const trend: Trend = pct >= 0 ? "up" : "down";
  const good = higherIsGood ? trend === "up" : trend === "down";
  return { delta: `${Math.abs(pct).toFixed(1)}%`, trend, good };
}

/**
 * Fetches the Meta Ads Manager row for the Platform Performance table:
 * Spent, Purchases, ROAS and CPA for the last 7 days, each with a
 * week-over-week delta, plus a 7-point daily-spend sparkline.
 */
export async function getMetaAdsRow(): Promise<PlatformRow> {
  const cfg = readConfig();
  const { current, previous } = windows();
  const summaryFields = "spend,purchase_roas,actions,cost_per_action_type";

  const [currRows, prevRows, dailyRows] = await Promise.all([
    insights(cfg, { fields: summaryFields, time_range: JSON.stringify(current) }),
    insights(cfg, { fields: summaryFields, time_range: JSON.stringify(previous) }),
    insights(cfg, {
      fields: "spend",
      time_range: JSON.stringify(current),
      time_increment: "1",
    }),
  ]);

  const curr = summarize(currRows[0] ?? {});
  const prev = summarize(prevRows[0] ?? {});

  const daily = dailyRows.map((r) => Math.round(Number(r?.spend ?? 0)));
  const spark =
    daily.length >= 2 ? daily : daily.length === 1 ? [daily[0], daily[0]] : [0, 0];

  const metrics: Metric[] = [
    { label: "Spent", value: currency(curr.spend), ...movement(curr.spend, prev.spend, true) },
    { label: "Purchases", value: integer(curr.purchases), ...movement(curr.purchases, prev.purchases, true) },
    { label: "ROAS", value: curr.roas.toFixed(2), ...movement(curr.roas, prev.roas, true) },
    { label: "CPA", value: currency(curr.cpa), ...movement(curr.cpa, prev.cpa, false) },
  ];

  return { id: "meta", name: "Meta Ads Manager", metrics, spark };
}

/**
 * Fetches the top 4 campaigns by spend for the "Top Performing
 * Campaigns (Meta Ads)" table. Trend compares each campaign's ROAS
 * against the prior week.
 */
export async function getTopMetaCampaigns(): Promise<Campaign[]> {
  const cfg = readConfig();
  const { current, previous } = windows();
  const fields = "campaign_id,campaign_name,spend,purchase_roas,actions";

  const [currRows, prevRows] = await Promise.all([
    insights(cfg, {
      level: "campaign",
      fields,
      time_range: JSON.stringify(current),
      sort: "spend_descending",
      limit: "4",
    }),
    insights(cfg, {
      level: "campaign",
      fields,
      time_range: JSON.stringify(previous),
      limit: "200",
    }),
  ]);

  const prevRoas = new Map<string, number>();
  for (const row of prevRows) {
    prevRoas.set(row.campaign_id, pickAction(row.purchase_roas, PURCHASE_TYPES));
  }

  return currRows.map((row): Campaign => {
    const roas = pickAction(row.purchase_roas, PURCHASE_TYPES);
    const before = prevRoas.get(row.campaign_id) ?? 0;
    return {
      name: row.campaign_name ?? "Unnamed campaign",
      spent: currency(Number(row.spend ?? 0)),
      purchases: Math.round(pickAction(row.actions, PURCHASE_TYPES)),
      roas,
      trend: roas >= before ? "up" : "down",
    };
  });
}
