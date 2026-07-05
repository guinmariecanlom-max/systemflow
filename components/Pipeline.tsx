import { pipeline } from "@/lib/data";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bot,
  Mail,
  Megaphone,
  ShoppingBag,
} from "lucide-react";

const icons = {
  meta: Megaphone,
  shopify: ShoppingBag,
  klaviyo: Mail,
  ai: Bot,
  dashboard: BarChart3,
} as const;

export default function Pipeline() {
  return (
    <section className="card relative p-5">
      <button className="absolute right-4 top-4 rounded-lg border border-line px-3 py-1.5 text-xs font-medium hover:bg-surface">
        View Pipeline
      </button>
      <ol className="flex flex-wrap items-start justify-between gap-y-6 pr-24">
        {pipeline.map((node, i) => {
          const Icon = icons[node.id];
          return (
            <li key={node.step} className="flex items-start gap-4 sm:gap-8">
              <div className="flex w-32 flex-col items-center text-center">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-accent text-xs font-bold">
                  {node.step}
                </span>
                <span className="mt-3 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <span className="mt-2 text-sm font-semibold leading-tight">
                  {node.name}
                </span>
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-up">
                  <span className="h-1.5 w-1.5 rounded-full bg-up" />
                  Connected
                  <BadgeCheck size={12} />
                </span>
              </div>
              {i < pipeline.length - 1 && (
                <ArrowRight
                  size={20}
                  className="mt-1 hidden shrink-0 text-accent lg:block"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
