"use client";

import { revenueTrend } from "@/lib/data";
import { SectionCard, PillSelect } from "@/components/ui";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const series = [
  { key: "store", name: "Store Revenue", color: "#FFE14D", dash: undefined },
  { key: "email", name: "Email Revenue", color: "#111111", dash: undefined },
  { key: "spend", name: "Ad Spend", color: "#B8B8B0", dash: "4 4" },
];

export default function RevenueTrend() {
  return (
    <SectionCard title="Revenue Trend" action={<PillSelect label="This Week" />}>
      <div className="mb-3 flex flex-wrap gap-4">
        {series.map((s) => (
          <span key={s.key} className="flex items-center gap-1.5 text-xs text-muted">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: s.color }} />
            {s.name}
          </span>
        ))}
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueTrend} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
            <CartesianGrid stroke="#ECECE6" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: "#8A8A82" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#8A8A82" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `$${Math.round(v / 1000)}K`}
            />
            <Tooltip
              formatter={(value: number | string, name: string) => [
                `$${Number(value).toLocaleString()}`,
                name,
              ]}
              contentStyle={{
                borderRadius: 10,
                border: "1px solid #ECECE6",
                fontSize: 12,
              }}
            />
            {series.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.name}
                stroke={s.color}
                strokeWidth={2.5}
                strokeDasharray={s.dash}
                dot={{ r: 3, fill: s.color, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}
