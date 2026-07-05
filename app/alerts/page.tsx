import { PageHeader, ComingSoon } from "@/components/ui";

export default function AlertsPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-5">
      <PageHeader
        title="Alerts"
        subtitle="Anomaly detection and threshold alerts across your platforms."
      />
      <ComingSoon note="A full alerts inbox with rules and notifications is coming soon. Recent alerts still show on the dashboard." />
    </div>
  );
}
