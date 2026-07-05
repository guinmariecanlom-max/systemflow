import Link from "next/link";
import { alerts, reports } from "@/lib/data";
import { SectionCard } from "@/components/ui";
import { AlertTriangle, CalendarDays, Download, Info } from "lucide-react";

function ViewAll({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="text-xs font-semibold underline decoration-accent decoration-2 underline-offset-4 hover:decoration-4"
    >
      View all
    </Link>
  );
}

export function RecentAlerts() {
  return (
    <SectionCard title="Recent Alerts" action={<ViewAll href="/alerts" />}>
      <ul className="space-y-3">
        {alerts.slice(0, 3).map((a) => (
          <li
            key={a.title}
            className="flex items-start gap-3 rounded-xl border border-line p-3"
          >
            <span
              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                a.level === "warn" ? "bg-accent-soft" : "bg-surface"
              }`}
            >
              {a.level === "warn" ? (
                <AlertTriangle size={15} strokeWidth={2} />
              ) : (
                <Info size={15} strokeWidth={2} />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium leading-snug">{a.title}</p>
              <p className="mt-1 text-[11px] text-muted">{a.time}</p>
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
    </SectionCard>
  );
}

export function AutomatedReports() {
  return (
    <SectionCard title="Automated Reports" action={<ViewAll href="/reports" />}>
      <ul className="divide-y divide-line">
        {reports.map((r) => (
          <li key={r.name} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface">
              <CalendarDays size={15} strokeWidth={1.8} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium">{r.name}</p>
              <p className="mt-0.5 text-[11px] text-muted">{r.date}</p>
            </div>
            <span className="shrink-0 rounded-md bg-up/10 px-2 py-1 text-[10px] font-semibold text-up">
              {r.status}
            </span>
            <button
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line hover:bg-surface"
              aria-label={`Download ${r.name}`}
            >
              <Download size={14} />
            </button>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
