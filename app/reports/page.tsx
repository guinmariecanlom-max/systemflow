import { PageHeader, SectionCard } from "@/components/ui";
import { reports } from "@/lib/data";
import { FileText, Plus, Download } from "lucide-react";

const summary = [
  { label: "Reports Delivered", value: String(reports.length) },
  { label: "On-time Rate", value: "100%" },
  { label: "Next Report", value: "Mon 8:00 AM" },
];

export default function ReportsPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-5">
      <PageHeader
        title="Reports"
        subtitle="Automated reports are generated and delivered every Monday at 8:00 AM."
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-bold text-ink hover:brightness-95">
            <Plus size={14} strokeWidth={2.5} />
            New Report
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {summary.map((s) => (
          <div key={s.label} className="card p-5">
            <p className="text-xs text-muted">{s.label}</p>
            <p className="mt-1 text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <SectionCard title="Recent Reports">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs text-muted">
              <th className="pb-3 font-medium">Report</th>
              <th className="pb-3 font-medium">Delivered</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {reports.map((r) => (
              <tr key={r.name}>
                <td className="py-3 pr-2">
                  <span className="flex items-center gap-2.5 font-medium">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-white">
                      <FileText size={15} strokeWidth={1.8} />
                    </span>
                    {r.name}
                  </span>
                </td>
                <td className="py-3 pr-2 text-muted">{r.date}</td>
                <td className="py-3 pr-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-up/10 px-2.5 py-1 text-xs font-semibold text-up">
                    <span className="h-1.5 w-1.5 rounded-full bg-up" />
                    {r.status}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <button className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-medium hover:bg-surface">
                    <Download size={13} strokeWidth={2} />
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </div>
  );
}
