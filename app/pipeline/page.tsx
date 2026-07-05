import Pipeline from "@/components/Pipeline";
import { PageHeader, ComingSoon } from "@/components/ui";

export default function PipelinePage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-5">
      <PageHeader
        title="Pipeline"
        subtitle="How data flows from your ad platforms to your Monday report."
      />
      <Pipeline />
      <ComingSoon note="Per-stage run logs, timings and retry history are on the way." />
    </div>
  );
}
