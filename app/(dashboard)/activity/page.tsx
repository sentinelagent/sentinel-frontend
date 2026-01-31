import { PageHeader } from "@/components/layout/page-header";
import { FieldsetCard } from "@/components/common/fieldset-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Bug, Clock, Search, Filter, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ActivityPage() {
    const activities = [
        {
            id: 1,
            type: "REVIEW_COMPLETED",
            project: "frontend-app",
            target: "PR #421",
            title: "Add user authentication flow with Supabase",
            timestamp: "10:34 AM",
            findings: 5,
            severity: "CRITICAL",
            status: "SUCCESS"
        },
        {
            id: 2,
            type: "BUG_DETECTED",
            project: "backend-api",
            target: "PR #189",
            title: "Fix bug in knowledge graph persistence",
            timestamp: "09:12 AM",
            findings: 2,
            severity: "HIGH",
            status: "ACTION_REQUIRED"
        },
        {
            id: 3,
            type: "INDEXING",
            project: "shared-logic",
            target: "Main Branch",
            title: "Full system re-index in progress",
            timestamp: "08:45 AM",
            findings: 0,
            severity: "NONE",
            status: "IN_PROGRESS"
        },
        {
            id: 4,
            type: "USER_JOINED",
            project: "Sentinel",
            target: "@newdeveloper",
            title: "New team member invited to organization",
            timestamp: "Yesterday",
            findings: 0,
            severity: "NONE",
            status: "INFO"
        },
        {
            id: 5,
            type: "REVIEW_COMPLETED",
            project: "documentation",
            target: "PR #42",
            title: "Update API documentation for v2.0",
            timestamp: "Yesterday",
            findings: 1,
            severity: "LOW",
            status: "SUCCESS"
        }
    ];

    const getStatusIcon = (type: string) => {
        switch (type) {
            case "REVIEW_COMPLETED": return <CheckCircle2 className="h-4 w-4 text-success" />;
            case "BUG_DETECTED": return <AlertCircle className="h-4 w-4 text-destructive" />;
            case "INDEXING": return <Clock className="h-4 w-4 text-warning" />;
            default: return <ArrowUpRight className="h-4 w-4 text-black/20" />;
        }
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "CRITICAL": return "bg-destructive text-white";
            case "HIGH": return "bg-orange-500 text-white";
            case "MEDIUM": return "bg-yellow-500 text-black";
            case "LOW": return "bg-blue-500 text-white";
            default: return "bg-black/5 text-black/40";
        }
    };

    return (
        <div className="space-y-10 max-w-6xl mx-auto pb-20">
            <div className="animate-spectacular">
                <PageHeader
                    title="System Activity"
                    subtitle="Real-time Event Stream"
                    breadcrumbs={[{ label: "Sentinel" }, { label: "Activity" }]}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1 space-y-6 animate-spectacular opacity-0 stagger-1">
                    <FieldsetCard legend="Filters">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-black/40">Search Events</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-black/20" />
                                    <Input placeholder="Filter by keyword..." className="pl-9 rounded-none border-black h-10 text-xs focus-visible:ring-0" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-black/40">Event Type</label>
                                <div className="space-y-2">
                                    {["Reviews", "Security", "Indexing", "System"].map(type => (
                                        <div key={type} className="flex items-center gap-2 group cursor-pointer">
                                            <div className="h-3 w-3 border border-black group-hover:bg-black transition-colors" />
                                            <span className="text-[11px] font-bold uppercase tracking-tight group-hover:italic">{type}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-black/5">
                                <Button variant="outline" className="w-full rounded-none h-10 border-black hover:bg-black hover:text-white transition-all text-[10px] font-black uppercase tracking-widest gap-2">
                                    <Filter className="h-3.5 w-3.5" />
                                    Clear All
                                </Button>
                            </div>
                        </div>
                    </FieldsetCard>

                    <FieldsetCard legend="Live Status" dashed>
                        <div className="flex items-center gap-3">
                            <div className="relative h-2 w-2">
                                <div className="absolute inset-0 bg-success rounded-full animate-ping opacity-75" />
                                <div className="relative h-2 w-2 bg-success rounded-full" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Connected to Stream</span>
                        </div>
                    </FieldsetCard>
                </div>

                <div className="lg:col-span-3 space-y-4 animate-spectacular opacity-0 stagger-2">
                    {activities.map((activity, i) => (
                        <div key={activity.id} className="group relative">
                            <div className="absolute -left-2 top-0 bottom-0 w-[2px] bg-black opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="border border-black p-5 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[1px] hover:-translate-y-[1px] cursor-pointer">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex gap-4 items-start">
                                        <div className="mt-1 p-2 border border-black/10 group-hover:border-black transition-colors">
                                            {getStatusIcon(activity.type)}
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-black/20 group-hover:text-black/40">{activity.type.replace('_', ' ')}</span>
                                                <span className="text-[10px] font-black uppercase tracking-widest px-1.5 bg-black text-white">{activity.project}</span>
                                            </div>
                                            <h3 className="font-bold tracking-tight text-md uppercase group-hover:italic transition-all">{activity.title}</h3>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-black/40 italic">Target: {activity.target}</div>
                                        </div>
                                    </div>

                                    <div className="text-right space-y-2">
                                        <div className="text-[10px] font-black tabular-nums text-black/40 group-hover:text-black transition-colors">{activity.timestamp}</div>
                                        {activity.findings > 0 && (
                                            <Badge className={cn("rounded-none border-0 text-[8px] font-black", getStatusSeverityColor(activity.severity))}>
                                                {activity.findings} FINDINGS
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <Button variant="ghost" className="w-full h-12 rounded-none border-2 border-dashed border-black/10 hover:border-black/40 transition-all text-[10px] font-black uppercase tracking-[0.3em] text-black/20 hover:text-black">
                        Load More History
                    </Button>
                </div>
            </div>
        </div>
    );
}

function getStatusSeverityColor(severity: string) {
    switch (severity) {
        case "CRITICAL": return "bg-destructive text-white";
        case "HIGH": return "bg-orange-500 text-white";
        case "LOW": return "bg-blue-500 text-white";
        default: return "bg-black text-white";
    }
}
