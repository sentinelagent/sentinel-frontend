"use client";

import { PageHeader } from "@/components/layout/page-header";
import { FieldsetCard } from "@/components/common/fieldset-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Bug, AlertCircle, Clock } from "lucide-react";

export default function DashboardPage() {
    const stats = [
        { label: "PRs Reviewed", value: "1,247", trend: "+12%", icon: ArrowUpRight },
        { label: "Bugs Found", value: "389", sub: "23 critical", icon: Bug },
        { label: "Issues Captured", value: "156", sub: "action req", icon: AlertCircle },
        { label: "Avg Review Time", value: "4.2 min", trend: "improving", icon: Clock },
    ];

    return (
        <div className="max-w-6xl mx-auto">
            <PageHeader
                title="Dashboard"
                subtitle="Project Overview"
                breadcrumbs={[{ label: "Sentinel" }, { label: "Overview" }]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, i) => (
                    <FieldsetCard key={i} legend={stat.label}>
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                                {stat.trend && (
                                    <div className="text-[10px] font-bold text-success mt-1">{stat.trend}</div>
                                )}
                                {stat.sub && (
                                    <div className="text-[10px] font-bold text-black/40 mt-1 uppercase tracking-wider">{stat.sub}</div>
                                )}
                            </div>
                            <stat.icon className="h-5 w-5 text-black/20" />
                        </div>
                    </FieldsetCard>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <FieldsetCard legend="Review Progress">
                        <div className="space-y-4">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-sm font-bold uppercase tracking-widest text-black/60">Current Progress</span>
                                <span className="text-2xl font-bold">65%</span>
                            </div>
                            <div className="h-4 w-full border border-black bg-[#F5F5F4] relative overflow-hidden">
                                <div
                                    className="absolute top-0 left-0 h-full bg-black transition-all duration-500"
                                    style={{ width: '65%' }}
                                />
                            </div>
                        </div>
                    </FieldsetCard>

                    <FieldsetCard legend="Recent Activity">
                        <div className="space-y-6">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex gap-4 items-start pb-6 border-b border-black/5 last:border-0 last:pb-0">
                                    <div className="mt-1 h-2 w-2 bg-black rotate-45" />
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <div className="font-bold text-sm">Reviewed PR #421</div>
                                            <div className="text-[10px] font-bold text-black/40 uppercase">14:20 PM</div>
                                        </div>
                                        <div className="text-xs text-black/60 mt-1 font-medium">frontend-app · 5 findings · High Severity</div>
                                    </div>
                                </div>
                            ))}
                            <Button variant="outline" className="w-full rounded-none border-black hover:bg-black hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest">
                                View Full Activity Feed
                            </Button>
                        </div>
                    </FieldsetCard>
                </div>

                <div>
                    <FieldsetCard legend="Top Repositories" dashed>
                        <div className="space-y-4">
                            {[
                                { name: "frontend-app", prs: 423, bugs: 89 },
                                { name: "backend-api", prs: 312, bugs: 67 },
                                { name: "shared-utils", prs: 189, bugs: 34 },
                            ].map((repo, i) => (
                                <div key={i} className="flex justify-between items-center group cursor-pointer border-b border-black/10 pb-2 last:border-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-black/20">{i + 1}.</span>
                                        <span className="font-bold text-sm group-hover:underline">{repo.name}</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <Badge variant="outline" className="rounded-none border-black text-[10px] font-bold">{repo.prs}</Badge>
                                        <Badge className="rounded-none bg-black text-white text-[10px] font-bold">{repo.bugs}</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FieldsetCard>
                </div>
            </div>
        </div>
    );
}
