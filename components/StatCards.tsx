import { statCards } from "@/lib/data";
import { Delta } from "@/components/ui";
import { CalendarCheck, Clock, Flag, Target, Zap } from "lucide-react";

const icons = [Clock, CalendarCheck, Zap, Target, Flag];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {statCards.map((stat, i) => {
        const Icon = icons[i];
        const isStatus = stat.label === "Monday 8AM Report";
        return (
          <div key={stat.label} className="card flex items-start gap-3 p-4">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft">
              <Icon size={18} className="text-ink" strokeWidth={2} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs text-muted">{stat.label}</p>
              <p className="mt-1 text-xl font-bold leading-none">{stat.value}</p>
              <p className="mt-1.5 text-xs text-muted">
                {isStatus ? (
                  <span className="font-medium text-up">{stat.delta}</span>
                ) : (
                  <>
                    vs last week{" "}
                    <Delta delta={stat.delta} trend={stat.trend} good={stat.good} />
                  </>
                )}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
