import { PageHeader, ComingSoon } from "@/components/ui";

export default function TasksPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-5">
      <PageHeader
        title="Tasks"
        subtitle="Follow-ups and action items generated from your reports."
      />
      <ComingSoon note="Task tracking and assignment are on the roadmap." />
    </div>
  );
}
