// ---------------------------------------------------------------
// SystemFlow data layer.
//
// Meta Ads is now wired to the real Marketing API in lib/meta.ts
// (getMetaAdsRow / getTopMetaCampaigns). The values below are used
// as a fallback when Meta credentials are not configured, and the
// Shopify+GA4 / Klaviyo rows are still mock — replace them next:
//   Shopify+GA4 -> Shopify Admin API + GA4 Data API
//   Klaviyo     -> Klaviyo Reporting API
// Keep the shapes below and the UI will not need to change.
// ---------------------------------------------------------------

export type Trend = "up" | "down";

export interface Metric {
  label: string;
  value: string;
  delta: string;
  trend: Trend;
  good: boolean; // whether the movement is a good thing
}

export interface PlatformRow {
  id: "meta" | "shopify" | "klaviyo";
  name: string;
  metrics: Metric[];
  spark: number[];
}

export interface Campaign {
  name: string;
  spent: string;
  purchases: number;
  roas: number;
  trend: Trend;
}

export const pipeline = [
  { step: 1, name: "Meta Ads Manager", id: "meta" },
  { step: 2, name: "Shopify + GA4", id: "shopify" },
  { step: 3, name: "Klaviyo", id: "klaviyo" },
  { step: 4, name: "Claude AI", id: "ai" },
  { step: 5, name: "Dashboard", id: "dashboard" },
] as const;

export const statCards: Metric[] = [
  { label: "Time Reclaimed", value: "16.2 hrs", delta: "23%", trend: "up", good: true },
  { label: "Automated Reporting", value: "100%", delta: "0%", trend: "up", good: true },
  { label: "Manual Data Pulls", value: "0", delta: "100%", trend: "down", good: true },
  { label: "Monday 8AM Report", value: "Delivered", delta: "On-time", trend: "up", good: true },
  { label: "Anomalies", value: "2", delta: "33%", trend: "down", good: true },
];

export const platformRows: PlatformRow[] = [
  {
    id: "meta",
    name: "Meta Ads Manager",
    metrics: [
      { label: "Spent", value: "$12,586.34", delta: "8.4%", trend: "down", good: false },
      { label: "Purchases", value: "342", delta: "15.7%", trend: "up", good: true },
      { label: "ROAS", value: "4.21", delta: "11.3%", trend: "up", good: true },
      { label: "CPA", value: "$36.78", delta: "7.3%", trend: "down", good: true },
    ],
    spark: [22, 28, 24, 32, 30, 38, 44],
  },
  {
    id: "shopify",
    name: "Shopify + GA4",
    metrics: [
      { label: "Revenue", value: "$52,843.21", delta: "18.2%", trend: "up", good: true },
      { label: "Orders", value: "512", delta: "16.1%", trend: "up", good: true },
      { label: "AOV", value: "$103.20", delta: "1.8%", trend: "up", good: true },
      { label: "Conversion Rate", value: "2.35%", delta: "9.4%", trend: "up", good: true },
    ],
    spark: [30, 26, 34, 31, 40, 42, 48],
  },
  {
    id: "klaviyo",
    name: "Klaviyo",
    metrics: [
      { label: "Revenue", value: "$8,742.50", delta: "24.6%", trend: "up", good: true },
      { label: "Placed Orders", value: "87", delta: "19.2%", trend: "up", good: true },
      { label: "Flow Revenue", value: "$6,231.40", delta: "27.8%", trend: "up", good: true },
      { label: "Email CTR", value: "3.41%", delta: "8.7%", trend: "up", good: true },
    ],
    spark: [18, 24, 22, 28, 27, 34, 39],
  },
];

export const revenueOverview = {
  total: "$61,585.71",
  delta: "17.4%",
  segments: [
    { name: "Store Revenue", value: 52843.21, share: "85.8%", color: "#FFE14D" },
    { name: "Email Revenue", value: 8742.5, share: "14.2%", color: "#111111" },
  ],
};

export const topCampaigns: Campaign[] = [
  { name: "BOF | Purchase | US", spent: "$4,215.21", purchases: 128, roas: 5.12, trend: "up" as Trend },
  { name: "TOF | Prospecting | Broad", spent: "$3,126.45", purchases: 76, roas: 3.84, trend: "up" as Trend },
  { name: "Retargeting | 7D | All", spent: "$2,312.88", purchases: 55, roas: 6.71, trend: "up" as Trend },
  { name: "Lookalike | 1% | Purchasers", spent: "$2,931.80", purchases: 83, roas: 4.03, trend: "down" as Trend },
];

export const revenueTrend = [
  { day: "May 12", store: 28400, email: 9800, spend: 5600 },
  { day: "May 13", store: 24100, email: 8200, spend: 5100 },
  { day: "May 14", store: 33800, email: 10400, spend: 6300 },
  { day: "May 15", store: 41200, email: 12800, spend: 6900 },
  { day: "May 16", store: 38900, email: 13400, spend: 6500 },
  { day: "May 17", store: 47600, email: 14100, spend: 7200 },
  { day: "May 18", store: 52800, email: 15300, spend: 7400 },
];

export const alerts = [
  {
    level: "warn" as const,
    title: "ROAS dropped below 3.0 for TOF | Prospecting | Broad",
    time: "May 17, 2025 · 9:15 AM",
    tag: "Action Needed",
  },
  {
    level: "info" as const,
    title: 'Klaviyo flow "Checkout Abandonment" revenue up 27.8%',
    time: "May 17, 2025 · 8:05 AM",
    tag: "Info",
  },
];

export const reports = [
  { name: "Weekly Performance Report", date: "May 19, 2025 · 8:00 AM", status: "Delivered" },
  { name: "Campaign Anomalies Report", date: "May 19, 2025 · 8:00 AM", status: "Delivered" },
  { name: "Klaviyo Flow Performance Report", date: "May 19, 2025 · 8:00 AM", status: "Delivered" },
];
