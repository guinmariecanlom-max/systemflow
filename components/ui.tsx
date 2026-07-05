import { ArrowDown, ArrowUp, Clock } from "lucide-react";
import type { Trend } from "@/lib/data";

export function Delta({
  delta,
  trend,
  good,
}: {
  delta: string;
  trend: Trend;
  good: boolean;
}) {
  const Icon = trend === "up" ? ArrowUp : ArrowDown;
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-xs font-medium ${
        good ? "text-up" : "text-down"
      }`}
    >
      <Icon size={12} strokeWidth={2.5} />
      {delta}
    </span>
  );
}

export function Sparkline({ points }: { points: number[] }) {
  const w = 96;
  const h = 32;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / range) * (h - 4) - 2;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="h-8 w-24"
      role="img"
      aria-label="7 day trend"
    >
      <path d={path} fill="none" stroke="#FFE14D" strokeWidth="2.5" strokeLinecap="round" />
      {points.map((p, i) => {
        const x = (i / (points.length - 1)) * w;
        const y = h - ((p - min) / range) * (h - 4) - 2;
        return <circle key={i} cx={x} cy={y} r="2" fill="#111111" />;
      })}
    </svg>
  );
}

export function SectionCard({
  title,
  action,
  children,
  className = "",
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`card p-5 ${className}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {action}
    </header>
  );
}

export function StatusPill({ connected }: { connected: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        connected ? "bg-up/10 text-up" : "bg-line text-muted"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${connected ? "bg-up" : "bg-muted"}`}
      />
      {connected ? "Connected" : "Not connected"}
    </span>
  );
}

export function ComingSoon({ note }: { note?: string }) {
  return (
    <div className="card flex flex-col items-center justify-center gap-3 p-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface">
        <Clock size={20} className="text-muted" strokeWidth={1.8} />
      </span>
      <p className="text-sm font-semibold">Coming soon</p>
      <p className="max-w-sm text-xs text-muted">
        {note ?? "This section is on the roadmap and will light up in a future release."}
      </p>
    </div>
  );
}

export function PillSelect({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink hover:bg-surface">
      {label}
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
        <path d="M2 3.5L5 6.5L8 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}
