import Pipeline from "@/components/Pipeline";
import { PageHeader, SectionCard } from "@/components/ui";
import { pipelineRun, pipelineStages } from "@/lib/data";
import { CheckCircle2, Clock, Database, RefreshCw } from "lucide-react";

const summary = [
  { label: "Last Run", value: pipelineRun.startedAt, icon: Clock },
  { label: "Duration", value: pipelineRun.duration, icon: RefreshCw },
  { label: "Records Processed", value: pipelineRun.records.toLocaleString("en-US"), icon: Database },
  { label: "Next Run", value: pipelineRun.nextRun, icon: Clock },
];

export default function PipelinePage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-5">
      <PageHeader
        title="Pipeline"
        subtitle="How data flows from your ad platforms to your Monday report."
        action={
          <span className="inline-flex items-center gap-1.5 rounded-full bg-up/10 px-2.5 py-1 text-xs font-semibold text-up">
            <CheckCircle2 size={13} strokeWidth={2.4} />
            Last sync successful
          </span>
        }
      />

      <Pipeline />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map((s) => (
          <div key={s.label} className="card p-5">
            <div className="flex items-center gap-2 text-muted">
              <s.icon size={14} strokeWidth={1.8} />
              <p className="text-xs">{s.label}</p>
            </div>
            <p className="mt-1.5 text-lg font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <SectionCard title="Stage Activity">
        <div className="divide-y divide-line">
          {pipelineStages.map((stage) => (
            <div
              key={stage.id}
              className="grid grid-cols-1 items-center gap-2 py-4 first:pt-0 last:pb-0 md:grid-cols-[1.5fr_2fr_auto_auto]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-up/10">
                  <CheckCircle2 size={15} strokeWidth={2.2} className="text-up" />
                </span>
                <span className="text-sm font-semibold">{stage.name}</span>
              </div>
              <p className="text-xs text-muted md:pl-0">{stage.detail}</p>
              <p className="text-xs font-medium md:text-right">{stage.records}</p>
              <p className="text-xs text-muted md:pl-6 md:text-right">{stage.duration}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
