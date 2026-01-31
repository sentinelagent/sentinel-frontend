import { PageHeader } from "@/components/layout/page-header";
import { FieldsetCard } from "@/components/common/fieldset-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Search, Plus, GitBranch, Shield, Activity, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function RepositoriesPage() {
    const repositories = [
        {
            id: "1",
            name: "frontend-app",
            description: "Main React dashboard for Sentinel including AI visualization components.",
            avgReviewTime: "3.2m",
            totalPrs: 423,
            health: 98,
            status: "ACTIVE",
            lastIndexed: "2h ago"
        },
        {
            id: "2",
            name: "backend-api",
            description: "Go-based core microservice for repository indexing and LLM orchestration.",
            avgReviewTime: "5.1m",
            totalPrs: 312,
            health: 84,
            status: "ACTIVE",
            lastIndexed: "5h ago"
        },
        {
            id: "3",
            name: "shared-logic",
            description: "Common TypeScript utilities and domain models shared across services.",
            avgReviewTime: "1.4m",
            totalPrs: 189,
            health: 100,
            status: "STABLE",
            lastIndexed: "Yesterday"
        },
        {
            id: "4",
            name: "infra-scripts",
            description: "Terraform and Docker configuration for distributed cloud deployments.",
            avgReviewTime: "8.4m",
            totalPrs: 94,
            health: 72,
            status: "NEEDS_ATTENTION",
            lastIndexed: "Today"
        }
    ];

    return (
        <div className="space-y-10 max-w-6xl mx-auto pb-20">
            <div className="animate-spectacular">
                <PageHeader
                    title="Repositories"
                    subtitle="Managed Inventory"
                    breadcrumbs={[{ label: "Sentinel" }, { label: "Inventory" }]}
                    actions={
                        <Link href="/settings">
                            <Button className="rounded-none h-11 px-6 bg-black text-white hover:bg-white hover:text-black border border-black transition-all font-bold uppercase tracking-widest text-[10px] gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                                <Plus className="h-4 w-4" />
                                Add Repository
                            </Button>
                        </Link>
                    }
                />
            </div>

            <div className="animate-spectacular opacity-0 stagger-1">
                <div className="relative mb-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black/20" />
                    <Input placeholder="Search your infrastructure..." className="pl-12 rounded-none border-2 border-black h-14 font-bold text-lg focus-visible:ring-0 focus-visible:bg-black/[0.02] transition-colors" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {repositories.map((repo, i) => (
                        <Link key={repo.id} href={`/repos/${repo.id}`} className={cn("animate-spectacular opacity-0 group", `stagger-${(i % 2) + 1}`)}>
                            <FieldsetCard legend={repo.name} className="h-full hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-black/60 line-clamp-2 leading-relaxed italic">{repo.description}</p>
                                        <div className="flex gap-2">
                                            <Badge variant="outline" className="rounded-none border-black/10 group-hover:border-black text-[9px] font-black tracking-widest uppercase transition-colors">
                                                <Github className="h-3 w-3 mr-1" /> GITHUB
                                            </Badge>
                                            <Badge className={cn(
                                                "rounded-none border-0 text-[9px] font-black tracking-widest uppercase",
                                                repo.status === "ACTIVE" ? "bg-success text-white" :
                                                    repo.status === "NEEDS_ATTENTION" ? "bg-destructive text-white" : "bg-black text-white"
                                            )}>
                                                {repo.status.replace('_', ' ')}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-black/5">
                                        <div className="space-y-1">
                                            <div className="text-[8px] font-black uppercase text-black/40 tracking-widest">Efficiency</div>
                                            <div className="text-sm font-bold tracking-tight uppercase flex items-center gap-1">
                                                <Activity className="h-3 w-3 text-success" />
                                                {repo.health}%
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-[8px] font-black uppercase text-black/40 tracking-widest">Latent Time</div>
                                            <div className="text-sm font-bold tracking-tight uppercase flex items-center gap-1">
                                                <Clock className="h-3 w-3 text-black/20" />
                                                {repo.avgReviewTime}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-[8px] font-black uppercase text-black/40 tracking-widest">Total PRs</div>
                                            <div className="text-sm font-bold tracking-tight uppercase flex items-center gap-1">
                                                <GitBranch className="h-3 w-3 text-black/20" />
                                                {repo.totalPrs}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-end pt-2">
                                        <span className="text-[9px] font-bold uppercase text-black/20 italic tracking-widest">Last Index: {repo.lastIndexed}</span>
                                        <div className="text-black opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transition-transform">
                                            <ArrowRight className="h-5 w-5" />
                                        </div>
                                    </div>
                                </div>
                            </FieldsetCard>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

import { cn } from "@/lib/utils";
