import { platformRows } from "@/lib/data";
import { getMetaAdsRow } from "@/lib/meta";
import { Delta, SectionCard, PillSelect, Sparkline } from "@/components/ui";
import { ChevronRight, Mail, Megaphone, ShoppingBag } from "lucide-react";

const icons = { meta: Megaphone, shopify: ShoppingBag, klaviyo: Mail } as const;

// Swap the mock Meta row for live Marketing API data. If credentials
// are missing or the API call fails, fall back to the mock so the
// dashboard still renders.
async function resolveRows() {
  try {
    const meta = await getMetaAdsRow();
    return platformRows.map((row) => (row.id === "meta" ? meta : row));
  } catch (err) {
    console.error("[Meta] Falling back to mock platform data:", err);
    return platformRows;
  }
}

export default async function PlatformPerformance() {
  const rows = await resolveRows();

  return (
    <SectionCard title="Platform Performance" action={<PillSelect label="This Week" />}>
      <div className="divide-y divide-line">
        {rows.map((row) => {
          const Icon = icons[row.id];
          return (
            <div
              key={row.id}
              className="grid grid-cols-2 items-center gap-x-4 gap-y-3 py-4 first:pt-0 last:pb-0 md:grid-cols-[160px_repeat(4,1fr)_auto_auto]"
            >
              <div className="col-span-2 flex items-center gap-3 md:col-span-1">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white">
                  <Icon size={16} strokeWidth={1.8} />
                </span>
                <span className="text-sm font-semibold leading-tight">{row.name}</span>
              </div>
              {row.metrics.map((m) => (
                <div key={m.label}>
                  <p className="text-xs text-muted">{m.label}</p>
                  <p className="mt-0.5 text-sm font-bold">{m.value}</p>
                  <Delta delta={m.delta} trend={m.trend} good={m.good} />
                </div>
              ))}
              <div className="hidden md:block">
                <Sparkline points={row.spark} />
              </div>
              <ChevronRight size={16} className="hidden text-muted md:block" />
            </div>
          );
        })}
      </div>
      <div className="mt-4 border-t border-line pt-3 text-center">
        <button className="text-xs font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:decoration-4">
          View all platform details
        </button>
      </div>
    </SectionCard>
  );
}
