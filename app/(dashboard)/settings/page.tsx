import { SetupWizard } from "@/components/settings/setup-wizard";
import { PageHeader } from "@/components/layout/page-header";

export default function SettingsPage() {
    return (
        <div className="space-y-12">
            <PageHeader
                title="Settings & Onboarding"
                subtitle="System Configuration"
                breadcrumbs={[{ label: "Sentinel" }, { label: "Settings" }]}
            />

            <SetupWizard />
        </div>
    );
}
