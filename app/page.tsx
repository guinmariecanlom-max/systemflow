import Pipeline from "@/components/Pipeline";
import StatCards from "@/components/StatCards";
import PlatformPerformance from "@/components/PlatformPerformance";
import { RevenueOverview, TopCampaigns } from "@/components/RevenueOverview";
import RevenueTrend from "@/components/RevenueTrend";
import { RecentAlerts, AutomatedReports } from "@/components/AlertsReports";
import { PillSelect } from "@/components/ui";
import { topCampaigns } from "@/lib/data";
import { getTopMetaCampaigns } from "@/lib/meta";
import { Bell, Plus } from "lucide-react";

async function resolveCampaigns() {
  try {
    const campaigns = await getTopMetaCampaigns();
    return campaigns.length ? campaigns : topCampaigns;
  } catch (err) {
    console.error("[Meta] Falling back to mock campaign data:", err);
    return topCampaigns;
  }
}

export default async function Dashboard() {
  const campaigns = await resolveCampaigns();

  return (
    <div className="mx-auto max-w-[1400px] space-y-5">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, Guin!{" "}
            <span role="img" aria-label="wave">
              👋
            </span>
          </h1>
          <p className="mt-1 text-sm text-muted">
            Here&apos;s your system overview for May 12 &ndash; May 18, 2025.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <PillSelect label="May 12 - May 18, 2025" />
          <button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-bold text-ink hover:brightness-95">
            <Plus size={14} strokeWidth={2.5} />
            New Report
          </button>
          <button
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white hover:bg-surface"
            aria-label="Notifications"
          >
            <Bell size={16} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
          </button>
        </div>
      </header>

      <Pipeline />
      <StatCards />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.6fr_1fr]">
        <PlatformPerformance />
        <div className="space-y-5">
          <RevenueOverview />
          <TopCampaigns campaigns={campaigns} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <RevenueTrend />
        <RecentAlerts />
        <AutomatedReports />
      </div>
    </div>
  );
}
