"use client";

import { revenueOverview, topCampaigns, type Campaign } from "@/lib/data";
import { SectionCard, PillSelect } from "@/components/ui";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ArrowDown, ArrowUp } from "lucide-react";

export function RevenueOverview() {
  return (
    <SectionCard title="Revenue Overview" action={<PillSelect label="This Week" />}>
      <div className="flex items-center gap-5">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted">Total Revenue</p>
          <p className="mt-1 text-2xl font-bold">{revenueOverview.total}</p>
          <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-up">
            <ArrowUp size={12} strokeWidth={2.5} />
            {revenueOverview.delta} vs last week
          </p>
          <ul className="mt-4 space-y-2">
            {revenueOverview.segments.map((s) => (
              <li key={s.name} className="flex items-center gap-2 text-xs">
                <span
                  className="h-2.5 w-2.5 rounded-sm"
                  style={{ backgroundColor: s.color }}
                />
                <span className="text-muted">{s.name}</span>
                <span className="ml-auto font-semibold">
                  ${s.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}{" "}
                  <span className="font-normal text-muted">({s.share})</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-32 w-32 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={revenueOverview.segments}
                dataKey="value"
                innerRadius={38}
                outerRadius={56}
                startAngle={90}
                endAngle={-270}
                stroke="none"
                paddingAngle={2}
              >
                {revenueOverview.segments.map((s) => (
                  <Cell key={s.name} fill={s.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </SectionCard>
  );
}

export function TopCampaigns({
  campaigns = topCampaigns,
}: {
  campaigns?: Campaign[];
}) {
  return (
    <SectionCard
      title="Top Performing Campaigns (Meta Ads)"
      action={<PillSelect label="This Week" />}
    >
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="text-muted">
            <th className="pb-2 font-medium">Campaign</th>
            <th className="pb-2 font-medium">Spent</th>
            <th className="pb-2 text-right font-medium">Purchases</th>
            <th className="pb-2 text-right font-medium">ROAS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {campaigns.map((c) => (
            <tr key={c.name}>
              <td className="py-2.5 pr-2 font-medium">{c.name}</td>
              <td className="py-2.5 pr-2">{c.spent}</td>
              <td className="py-2.5 text-right">{c.purchases}</td>
              <td className="py-2.5">
                <span
                  className={`flex items-center justify-end gap-1 font-semibold ${
                    c.trend === "up" ? "text-up" : "text-down"
                  }`}
                >
                  {c.roas.toFixed(2)}
                  {c.trend === "up" ? (
                    <ArrowUp size={11} strokeWidth={2.5} />
                  ) : (
                    <ArrowDown size={11} strokeWidth={2.5} />
                  )}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 border-t border-line pt-3 text-center">
        <button className="text-xs font-semibold underline decoration-accent decoration-2 underline-offset-4 hover:decoration-4">
          View all campaigns
        </button>
      </div>
    </SectionCard>
  );
}
