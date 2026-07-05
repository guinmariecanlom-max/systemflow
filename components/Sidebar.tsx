"use client";

import {
  LayoutDashboard,
  GitBranch,
  Plug,
  BarChart3,
  Bell,
  CheckSquare,
  Database,
  Settings,
  ChevronDown,
  Zap,
} from "lucide-react";
import { useState } from "react";

const nav = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Pipeline", icon: GitBranch },
  { name: "Integrations", icon: Plug },
  { name: "Reports", icon: BarChart3 },
  { name: "Alerts", icon: Bell, badge: 3 },
  { name: "Tasks", icon: CheckSquare },
  { name: "Data Explorer", icon: Database },
  { name: "Settings", icon: Settings },
];

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col bg-ink text-white md:flex">
      <div className="flex items-center gap-2.5 px-5 py-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
          <Zap className="h-4.5 w-4.5 text-ink" size={18} strokeWidth={2.5} />
        </span>
        <span className="text-sm font-bold tracking-widest">
          SYSTEM<span className="font-normal text-white/60">FLOW</span>
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {nav.map((item) => {
          const isActive = active === item.name;
          return (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-accent font-semibold text-ink"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={18} strokeWidth={isActive ? 2.4 : 1.8} />
              <span className="flex-1 text-left">{item.name}</span>
              {item.badge && !isActive && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[11px] font-bold text-ink">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <button className="m-3 flex items-center gap-3 rounded-xl bg-white/5 px-3 py-3 text-left hover:bg-white/10">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-xs font-bold text-ink">
          GH
        </span>
        <span className="flex-1">
          <span className="block text-sm font-medium">Guin Hernaez</span>
          <span className="block text-xs text-white/50">Admin</span>
        </span>
        <ChevronDown size={16} className="text-white/50" />
      </button>
    </aside>
  );
}
