"use client";

import { useMemo, useState } from "react";
import { PageHeader, SectionCard } from "@/components/ui";
import { tasks as seedTasks, type Task, type TaskPriority } from "@/lib/data";

const filters = ["Open", "Done", "All"] as const;
type Filter = (typeof filters)[number];

const priorityStyles: Record<TaskPriority, string> = {
  high: "bg-down/10 text-down",
  medium: "bg-accent-soft text-ink",
  low: "bg-surface text-muted",
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(seedTasks);
  const [filter, setFilter] = useState<Filter>("Open");

  const toggle = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  const visible = useMemo(
    () =>
      tasks.filter((t) => {
        if (filter === "Open") return !t.done;
        if (filter === "Done") return t.done;
        return true;
      }),
    [tasks, filter]
  );

  const openCount = tasks.filter((t) => !t.done).length;

  return (
    <div className="mx-auto max-w-[1400px] space-y-5">
      <PageHeader
        title="Tasks"
        subtitle={`${openCount} open action item${openCount === 1 ? "" : "s"} from this week's reports.`}
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

      <SectionCard title="Action Items">
        {visible.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted">Nothing here — nice work.</p>
        ) : (
          <ul className="divide-y divide-line">
            {visible.map((t) => (
              <li key={t.id} className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0">
                <button
                  onClick={() => toggle(t.id)}
                  aria-label={t.done ? "Mark as not done" : "Mark as done"}
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                    t.done
                      ? "border-up bg-up text-white"
                      : "border-line bg-white hover:border-ink"
                  }`}
                >
                  {t.done && (
                    <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">
                      <path
                        d="M2.5 6.5L5 9L9.5 3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm font-medium ${
                      t.done ? "text-muted line-through" : ""
                    }`}
                  >
                    {t.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted">
                    {t.source} · Due {t.due}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-semibold capitalize ${priorityStyles[t.priority]}`}
                >
                  {t.priority}
                </span>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </div>
  );
}
