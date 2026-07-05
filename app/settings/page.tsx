import { PageHeader, SectionCard, StatusPill } from "@/components/ui";

const metaConnected = Boolean(
  process.env.META_ACCESS_TOKEN && process.env.META_AD_ACCOUNT_ID
);
const apiVersion = process.env.META_API_VERSION ?? "v21.0";

const account = [
  { label: "Name", value: "Guin Hernaez" },
  { label: "Email", value: "guinmariecanlom@gmail.com" },
  { label: "Role", value: "Admin" },
  { label: "Workspace", value: "Good Scale with Guin" },
];

const config = [
  { label: "Report schedule", value: "Mondays at 8:00 AM" },
  { label: "Meta Graph API version", value: apiVersion },
  { label: "Timezone", value: "America / Chicago" },
];

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <span className="text-xs text-muted">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-5">
      <PageHeader
        title="Settings"
        subtitle="Account details and workspace configuration."
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <SectionCard title="Account">
          <div className="divide-y divide-line">
            {account.map((r) => (
              <Row key={r.label} {...r} />
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Configuration">
          <div className="divide-y divide-line">
            {config.map((r) => (
              <Row key={r.label} {...r} />
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Data Sources">
        <div className="divide-y divide-line">
          <div className="flex items-center justify-between gap-4 py-3">
            <span className="text-sm font-medium">Meta Ads Manager</span>
            <StatusPill connected={metaConnected} />
          </div>
          <div className="flex items-center justify-between gap-4 py-3">
            <span className="text-sm font-medium">Shopify + GA4</span>
            <StatusPill connected={false} />
          </div>
          <div className="flex items-center justify-between gap-4 py-3">
            <span className="text-sm font-medium">Klaviyo</span>
            <StatusPill connected={false} />
          </div>
        </div>
        <p className="mt-4 border-t border-line pt-3 text-xs text-muted">
          Manage connections and API keys on the{" "}
          <span className="font-medium text-ink">Integrations</span> page.
        </p>
      </SectionCard>

      <SectionCard title="Brand">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-muted">Accent color</span>
          <span className="inline-flex items-center gap-2">
            <span
              className="h-5 w-5 rounded-md border border-line"
              style={{ backgroundColor: "#FFE14D" }}
            />
            <span className="font-mono text-sm font-medium">#FFE14D</span>
          </span>
        </div>
      </SectionCard>
    </div>
  );
}
