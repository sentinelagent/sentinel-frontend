"use client";

import { PageHeader } from "@/components/layout/page-header";
import { FieldsetCard } from "@/components/common/fieldset-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Bug, AlertCircle, Clock, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
    const stats = [
        { label: "PRs Reviewed", value: "1,247", trend: "+12%", icon: ArrowUpRight },
        { label: "Bugs Found", value: "389", sub: "23 critical", icon: Bug },
        { label: "Issues Captured", value: "156", sub: "action req", icon: AlertCircle },
        { label: "Avg Review Time", value: "4.2 min", trend: "improving", icon: Clock },
    ];

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
                            {[
                                { title: "Review Complete", meta: "frontend-app #421", findings: 5, severity: "CRITICAL", time: "10:34 AM" },
                                { title: "Bug Detected", meta: "backend-api #189", findings: 2, severity: "HIGH", time: "09:12 AM" },
                                { title: "Repo Indexed", meta: "shared-utils", findings: 0, severity: "NONE", time: "YESTERDAY" },
                                { title: "Review Complete", meta: "documentation #42", findings: 1, severity: "LOW", time: "YESTERDAY" },
                            ].map((activity, i) => (
                                <div key={i} className="py-6 flex items-center justify-between group cursor-pointer hover:pl-2 transition-all duration-200">
                                    <div className="flex items-center gap-6">
                                        <div className={cn(
                                            "h-3 w-3 rotate-45 border border-black",
                                            activity.severity === "CRITICAL" ? "bg-destructive" : activity.severity === "HIGH" ? "bg-orange-500" : "bg-black/5"
                                        )} />
                                        <div>
                                            <div className="font-black text-sm uppercase tracking-tight group-hover:italic transition-all">{activity.title}</div>
                                            <div className="text-[10px] font-bold text-black/40 uppercase tracking-widest mt-1">{activity.meta} · {activity.findings} findings</div>
                                        </div>
                                    </div>
                                    <div className="text-right space-y-1">
                                        <div className="text-[10px] font-black tabular-nums">{activity.time}</div>
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
                            {[
                                { name: "frontend-app", prs: 423, bugs: 89, trend: "+5%" },
                                { name: "backend-api", prs: 312, bugs: 67, trend: "-2%" },
                                { name: "shared-logic", prs: 189, bugs: 34, trend: "0%" },
                                { name: "infra-scripts", prs: 94, bugs: 12, trend: "+12%" },
                                { name: "documentation", prs: 42, bugs: 2, trend: "-1%" },
                            ].map((repo, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-black text-black/20 italic">0{i + 1}</span>
                                            <span className="font-black text-sm uppercase tracking-tight group-hover:underline underline-offset-4">{repo.name}</span>
                                        </div>
                                        <span className={cn(
                                            "text-[9px] font-black italic",
                                            repo.trend.startsWith("+") ? "text-success" : repo.trend.startsWith("-") ? "text-destructive" : "text-black/20"
                                        )}>{repo.trend}</span>
                                    </div>
                                    <div className="h-1 w-full bg-black/5 rounded-none flex">
                                        <div
                                            className="h-full bg-black"
                                            style={{ width: `${(repo.bugs / 100) * 100}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-[8px] font-black uppercase text-black/40 tracking-widest">
                                        <span>{repo.prs} PRs</span>
                                        <span>{repo.bugs} BUGS</span>
                                    </div>
                                </div>
                            ))}

                            <div className="pt-6">
                                <Button className="w-full rounded-none h-10 border border-black bg-white text-black hover:bg-black hover:text-white transition-all font-bold uppercase tracking-widest text-[10px]">
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
