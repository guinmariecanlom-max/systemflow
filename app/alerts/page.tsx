"use client";

import { useState } from "react";
import { PageHeader, SectionCard } from "@/components/ui";
import { alerts, alertRules } from "@/lib/data";
import { AlertTriangle, Info } from "lucide-react";

const filters = ["All", "Action Needed", "Info"] as const;
type Filter = (typeof filters)[number];

export default function AlertsPage() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = alerts.filter((a) => {
    if (filter === "All") return true;
    if (filter === "Action Needed") return a.level === "warn";
    return a.level === "info";
  });

  const actionCount = alerts.filter((a) => a.level === "warn").length;

  return (
    <div className="mx-auto max-w-[1400px] space-y-5">
      <PageHeader
        title="Alerts"
        subtitle={`${actionCount} item${actionCount === 1 ? "" : "s"} need attention across your platforms.`}
      />

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                active
                  ? "bg-ink text-white"
                  : "border border-line bg-white text-ink hover:bg-surface"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]">
        <SectionCard title="Alert Inbox">
          {visible.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted">
              No alerts in this view.
            </p>
          ) : (
            <ul className="space-y-3">
              {visible.map((a) => (
                <li
                  key={a.title}
                  className="flex items-start gap-3 rounded-xl border border-line p-4"
                >
                  <span
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      a.level === "warn" ? "bg-accent-soft" : "bg-surface"
                    }`}
                  >
                    {a.level === "warn" ? (
                      <AlertTriangle size={16} strokeWidth={2} />
                    ) : (
                      <Info size={16} strokeWidth={2} />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold leading-snug">{a.title}</p>
                      <span className="rounded-md bg-surface px-1.5 py-0.5 text-[10px] font-semibold text-muted">
                        {a.platform}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{a.detail}</p>
                    <p className="mt-1.5 text-[11px] text-muted">{a.time}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-semibold ${
                      a.level === "warn"
                        ? "bg-down/10 text-down"
                        : "bg-surface text-muted"
                    }`}
                  >
                    {a.tag}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <SectionCard title="Alert Rules">
          <ul className="space-y-3">
            {alertRules.map((rule) => (
              <li key={rule.name} className="rounded-xl border border-line p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">{rule.name}</p>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      rule.enabled ? "bg-up/10 text-up" : "bg-line text-muted"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        rule.enabled ? "bg-up" : "bg-muted"
                      }`}
                    />
                    {rule.enabled ? "On" : "Off"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted">{rule.condition}</p>
                <p className="mt-1 text-[11px] text-muted">Notify via {rule.channel}</p>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
