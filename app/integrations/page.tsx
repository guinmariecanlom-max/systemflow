import { PageHeader, StatusPill } from "@/components/ui";
import { Megaphone, ShoppingBag, Mail } from "lucide-react";

// Meta is live when its Marketing API credentials are present (see lib/meta.ts).
const metaConnected = Boolean(
  process.env.META_ACCESS_TOKEN && process.env.META_AD_ACCOUNT_ID
);

const integrations = [
  {
    id: "meta",
    name: "Meta Ads Manager",
    icon: Megaphone,
    description:
      "Spend, purchases, ROAS and CPA pulled from the Marketing API insights endpoint.",
    connected: metaConnected,
    env: ["META_ACCESS_TOKEN", "META_AD_ACCOUNT_ID"],
  },
  {
    id: "shopify",
    name: "Shopify + GA4",
    icon: ShoppingBag,
    description:
      "Orders, revenue and AOV from the Shopify Admin API, plus conversion rate from the GA4 Data API.",
    connected: false,
    env: ["SHOPIFY_ADMIN_TOKEN", "SHOPIFY_STORE_DOMAIN", "GA4_PROPERTY_ID"],
  },
  {
    id: "klaviyo",
    name: "Klaviyo",
    icon: Mail,
    description:
      "Flow revenue, placed orders and email CTR from the Klaviyo Reporting API.",
    connected: false,
    env: ["KLAVIYO_API_KEY"],
  },
];

export default function IntegrationsPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-5">
      <PageHeader
        title="Integrations"
        subtitle="Connect your data sources. Keys are stored as environment variables, never in code."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {integrations.map((it) => (
          <section key={it.id} className="card flex flex-col gap-4 p-5">
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white">
                <it.icon size={18} strokeWidth={1.8} />
              </span>
              <StatusPill connected={it.connected} />
            </div>
            <div>
              <h2 className="text-sm font-semibold">{it.name}</h2>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                {it.description}
              </p>
            </div>
            <div className="mt-auto space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                Required variables
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {it.env.map((v) => (
                  <li
                    key={v}
                    className="rounded-md bg-surface px-2 py-1 font-mono text-[11px] text-ink"
                  >
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <p className="text-xs text-muted">
        Add or update these under{" "}
        <span className="font-medium text-ink">
          Vercel → Project → Settings → Environment Variables
        </span>
        , then redeploy for changes to take effect.
      </p>
    </div>
  );
}
