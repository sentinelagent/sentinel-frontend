"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { FieldsetCard } from "@/components/common/fieldset-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Bug, AlertCircle, Clock, ExternalLink, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";

export default function DashboardPage() {
    const [stats, setStats] = useState<any[]>([]);
    const [activity, setActivity] = useState<any[]>([]);
    const [topRepos, setTopRepos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasGitHubSetup, setHasGitHubSetup] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsRes, activityRes, reposRes] = await Promise.all([
                    api.get("/dashboard/stats").catch(() => ({ data: defaultStats })),
                    api.get("/dashboard/activity?limit=4").catch(() => ({ data: defaultActivity })),
                    api.get("/dashboard/top-repos?limit=5").catch(() => ({ data: defaultTopRepos })),
                ]);

                setStats([
                    { label: "PRs Reviewed", value: statsRes.data.prs_reviewed, trend: statsRes.data.prs_reviewed_trend, icon: ArrowUpRight },
                    { label: "Bugs Found", value: statsRes.data.bugs_found, sub: `${statsRes.data.critical_bugs} critical`, icon: Bug },
                    { label: "Issues Captured", value: statsRes.data.issues_captured, sub: "action req", icon: AlertCircle },
                    { label: "Avg Review Time", value: statsRes.data.avg_review_time, trend: "improving", icon: Clock },
                ]);
                setActivity(activityRes.data);
                setTopRepos(reposRes.data);

                // Check if user has setup GitHub
                try {
                    await api.get("/repository/user-selected");
                    setHasGitHubSetup(true);
                } catch {
                    setHasGitHubSetup(false);
                }
            } catch (err) {
                console.error("Failed to fetch dashboard data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-black/10" />
                <span className="text-[10px] font-black uppercase tracking-widest text-black/20">Syncing Intelligence...</span>
            </div>
        );
    }

    // Show onboarding banner for new users
    if (!hasGitHubSetup) {
        return (
            <div className="max-w-4xl mx-auto py-20">
                <FieldsetCard legend="Welcome to Sentinel AI">
                    <div className="text-center space-y-8 py-10">
                        <div>
                            <h2 className="text-3xl font-black uppercase italic tracking-tight mb-3">System Not Configured</h2>
                            <p className="text-sm font-bold text-black/60 uppercase tracking-widest">
                                Connect your GitHub account to begin automated code reviews
                            </p>
                        </div>
                        <Button
                            onClick={() => window.location.href = '/settings'}
                            className="rounded-none h-14 px-12 bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-all font-bold uppercase tracking-[0.2em] text-xs gap-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none"
                        >
                            Connect GitHub
                            <ArrowUpRight className="h-5 w-5" />
                        </Button>
                    </div>
                </FieldsetCard>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20">
            <div className="animate-spectacular">
                <PageHeader
                    title="Dashboard"
                    subtitle="System Intelligence Overview"
                    breadcrumbs={[{ label: "Sentinel" }, { label: "Overview" }]}
                    actions={
                        <Button className="rounded-none h-11 px-6 bg-black text-white hover:bg-white hover:text-black border border-black transition-all font-bold uppercase tracking-widest text-[10px] gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                            Generate Report
                            <ExternalLink className="h-4 w-4" />
                        </Button>
                    }
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className={cn("animate-spectacular opacity-0", `stagger-${i + 1}`)}>
                        <FieldsetCard legend={stat.label} className="h-full hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-4xl font-black tracking-tighter italic">{stat.value}</div>
                                    {stat.trend && (
                                        <div className="text-[10px] font-black text-success mt-2 flex items-center gap-1 uppercase italic tracking-widest">
                                            <stat.icon className="h-3 w-3" />
                                            {stat.trend}
                                        </div>
                                    )}
                                    {stat.sub && (
                                        <div className="text-[9px] font-black text-black/40 mt-2 uppercase tracking-[0.2em]">{stat.sub}</div>
                                    )}
                                </div>
                            </div>
                        </FieldsetCard>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-10 animate-spectacular opacity-0 stagger-3">
                    <FieldsetCard legend="Global Review Progress" className="overflow-hidden">
                        <div className="space-y-6">
                            <div className="flex justify-between items-end">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">Real-time Batch Status</span>
                                    <div className="text-3xl font-black italic tracking-tight">65.8% <span className="text-sm font-bold opacity-20 not-italic">OPTIMIZED</span></div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-bold text-black/40 uppercase mb-1">Queue Depth</div>
                                    <Badge className="rounded-none bg-black text-white text-[10px] font-black px-2 py-1">12 PENDING</Badge>
                                </div>
                            </div>
                            <div className="h-6 w-full border-2 border-black bg-[#F5F5F4] relative overflow-hidden shadow-inner">
                                <div
                                    className="absolute top-0 left-0 h-full bg-black transition-all duration-1000 ease-in-out"
                                    style={{ width: '65.8%' }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[pulse_2s_infinite]" />
                                </div>
                            </div>
                            <div className="flex justify-between pt-2">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                    <div key={i} className={cn("h-1 w-8 bg-black/5", i < 6 && "bg-black/40")} />
                                ))}
                            </div>
                        </div>
                    </FieldsetCard>

                    <FieldsetCard legend="Recent System Activity">
                        <div className="space-y-0 divide-y divide-black/10">
                            {activity.map((item, i) => (
                                <div key={i} className="py-6 flex items-center justify-between group cursor-pointer hover:pl-2 transition-all duration-200">
                                    <div className="flex items-center gap-6">
                                        <div className={cn(
                                            "h-3 w-3 rotate-45 border border-black",
                                            item.severity === "CRITICAL" ? "bg-destructive" : item.severity === "HIGH" ? "bg-orange-500" : "bg-black/5"
                                        )} />
                                        <div>
                                            <div className="font-black text-sm uppercase tracking-tight group-hover:italic transition-all">{item.title}</div>
                                            <div className="text-[10px] font-bold text-black/40 uppercase tracking-widest mt-1">{item.subtitle}</div>
                                        </div>
                                    </div>
                                    <div className="text-right space-y-1">
                                        <div className="text-[10px] font-black tabular-nums">{item.timestamp}</div>
                                        <Badge variant="outline" className="rounded-none border-black/10 text-[8px] font-bold group-hover:border-black transition-colors">DETAILS →</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FieldsetCard>
                </div>

                <div className="animate-spectacular opacity-0 stagger-4">
                    <FieldsetCard legend="Top Analysis Targets" dashed className="h-full">
                        <div className="space-y-8">
                            {topRepos.map((repo, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-black text-black/20 italic">0{i + 1}</span>
                                            <span className="font-black text-sm uppercase tracking-tight group-hover:underline underline-offset-4">{repo.name}</span>
                                        </div>
                                        <span className={cn(
                                            "text-[9px] font-black italic",
                                            (repo.trend || "").startsWith("+") ? "text-success" : (repo.trend || "").startsWith("-") ? "text-destructive" : "text-black/20"
                                        )}>{repo.trend || "0%"}</span>
                                    </div>
                                    <div className="h-1 w-full bg-black/5 rounded-none flex">
                                        <div
                                            className="h-full bg-black"
                                            style={{ width: `${Math.min((repo.bugs_found / 100) * 100, 100)}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-[8px] font-black uppercase text-black/40 tracking-widest">
                                        <span>{repo.prs_reviewed} PRs</span>
                                        <span>{repo.bugs_found} BUGS</span>
                                    </div>
                                </div>
                            ))}

                            <div className="pt-6">
                                <Button onClick={() => window.location.href = '/repos'} className="w-full rounded-none h-10 border border-black bg-white text-black hover:bg-black hover:text-white transition-all font-bold uppercase tracking-widest text-[10px]">
                                    View All Repositories
                                </Button>
                            </div>
                        </div>
                    </FieldsetCard>
                </div>
            </div>
        </div>
    );
}

const defaultStats = {
    prs_reviewed: "1,247",
    prs_reviewed_trend: "+12%",
    bugs_found: "389",
    critical_bugs: 23,
    issues_captured: "156",
    avg_review_time: "4.2 min"
};

const defaultActivity = [
    { title: "Review Complete", subtitle: "frontend-app #421", severity: "CRITICAL", timestamp: "10:34 AM" },
    { title: "Bug Detected", subtitle: "backend-api #189", severity: "HIGH", timestamp: "09:12 AM" },
    { title: "Repo Indexed", subtitle: "shared-utils", severity: "NONE", timestamp: "YESTERDAY" },
    { title: "Review Complete", subtitle: "documentation #42", severity: "LOW", timestamp: "YESTERDAY" },
];

const defaultTopRepos = [
    { name: "frontend-app", prs_reviewed: 423, bugs_found: 89, trend: "+5%" },
    { name: "backend-api", prs_reviewed: 312, bugs_found: 67, trend: "-2%" },
    { name: "shared-logic", prs_reviewed: 189, bugs_found: 34, trend: "0%" },
    { name: "infra-scripts", prs_reviewed: 94, bugs_found: 12, trend: "+12%" },
    { name: "documentation", prs_reviewed: 42, bugs_found: 2, trend: "-1%" },
];
