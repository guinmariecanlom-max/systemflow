import { PageHeader, ComingSoon } from "@/components/ui";

export default function DataExplorerPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-5">
      <PageHeader
        title="Data Explorer"
        subtitle="Query and slice your raw platform data."
      />
      <ComingSoon note="An interactive explorer for custom metrics and date ranges is coming soon." />
    </div>
  );
}
