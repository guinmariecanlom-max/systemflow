"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader, SectionCard, PillSelect } from "@/components/ui";
import { revenueTrend } from "@/lib/data";

type MetricType = "currency" | "ratio";

const metrics: { key: string; label: string; type: MetricType }[] = [
  { key: "total", label: "Total Revenue", type: "currency" },
  { key: "store", label: "Store Revenue", type: "currency" },
  { key: "email", label: "Email Revenue", type: "currency" },
  { key: "spend", label: "Ad Spend", type: "currency" },
  { key: "roas", label: "Blended ROAS", type: "ratio" },
];

function valueFor(row: (typeof revenueTrend)[number], key: string): number {
  const total = row.store + row.email;
  switch (key) {
    case "total":
      return total;
    case "roas":
      return row.spend ? Number((total / row.spend).toFixed(2)) : 0;
    default:
      return row[key as "store" | "email" | "spend"];
  }
}

function fmt(value: number, type: MetricType): string {
  return type === "ratio"
    ? value.toFixed(2)
    : `$${Math.round(value).toLocaleString("en-US")}`;
}

export default function DataExplorerPage() {
  const [metricKey, setMetricKey] = useState("total");
  const metric = metrics.find((m) => m.key === metricKey)!;

  const data = useMemo(
    () => revenueTrend.map((row) => ({ day: row.day, value: valueFor(row, metricKey) })),
    [metricKey]
  );

  const values = data.map((d) => d.value);
  const sum = values.reduce((a, b) => a + b, 0);
  const avg = sum / (values.length || 1);
  const peak = data.reduce((a, b) => (b.value > a.value ? b : a), data[0]);
  const low = data.reduce((a, b) => (b.value < a.value ? b : a), data[0]);

  const stats =
    metric.type === "ratio"
      ? [
          { label: "Average", value: fmt(avg, "ratio") },
          { label: "Best Day", value: `${fmt(peak.value, "ratio")} · ${peak.day}` },
          { label: "Lowest Day", value: `${fmt(low.value, "ratio")} · ${low.day}` },
        ]
      : [
          { label: "Total", value: fmt(sum, "currency") },
          { label: "Daily Average", value: fmt(avg, "currency") },
          { label: "Peak Day", value: `${fmt(peak.value, "currency")} · ${peak.day}` },
        ];

  return (
    <div className="mx-auto max-w-[1400px] space-y-5">
      <PageHeader
        title="Data Explorer"
        subtitle="Slice your weekly data by metric. May 12 – May 18, 2025."
        action={<PillSelect label="May 12 - May 18, 2025" />}
      />

      <div className="flex flex-wrap gap-2">
        {metrics.map((m) => {
          const active = m.key === metricKey;
          return (
            <button
              key={m.key}
              onClick={() => setMetricKey(m.key)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                active
                  ? "bg-ink text-white"
                  : "border border-line bg-white text-ink hover:bg-surface"
              }`}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <p className="text-xs text-muted">{s.label}</p>
            <p className="mt-1 text-xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <SectionCard title={`${metric.label} · by day`}>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
              <CartesianGrid vertical={false} stroke="#ECECE6" />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#8A8A82" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={48}
                tick={{ fontSize: 11, fill: "#8A8A82" }}
                tickFormatter={(v) =>
                  metric.type === "ratio" ? String(v) : `$${(v / 1000).toFixed(0)}k`
                }
              />
              <Tooltip
                cursor={{ fill: "rgba(17,17,17,0.04)" }}
                formatter={(v) => [fmt(Number(v), metric.type), metric.label]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #ECECE6",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="value" fill="#FFE14D" radius={[6, 6, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <SectionCard title="Raw Data">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs text-muted">
              <th className="pb-3 font-medium">Day</th>
              <th className="pb-3 text-right font-medium">Store</th>
              <th className="pb-3 text-right font-medium">Email</th>
              <th className="pb-3 text-right font-medium">Spend</th>
              <th className="pb-3 text-right font-medium">Blended ROAS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {revenueTrend.map((row) => (
              <tr key={row.day}>
                <td className="py-2.5 font-medium">{row.day}</td>
                <td className="py-2.5 text-right">{fmt(row.store, "currency")}</td>
                <td className="py-2.5 text-right">{fmt(row.email, "currency")}</td>
                <td className="py-2.5 text-right">{fmt(row.spend, "currency")}</td>
                <td className="py-2.5 text-right font-semibold">
                  {fmt(valueFor(row, "roas"), "ratio")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </div>
  );
}
