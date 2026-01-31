import { PageHeader } from "@/components/layout/page-header";
import { FieldsetCard } from "@/components/common/fieldset-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitPullRequest, GitMerge, Clock, User, Bug, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function RepositoryDetailPage({ params }: { params: { id: string } }) {
    const repoName = params.id === "1" ? "frontend-app" : "backend-api";

    const pullRequests = [
        {
            number: 421,
            title: "Add user authentication flow with Supabase",
            author: "@omkargade",
            time: "2h ago",
            status: "Reviewed",
            bugs: 3,
            nits: 2,
            priority: "HIGH"
        },
        {
            number: 418,
            title: "Refactor sidebar navigation to use shadcn/ui",
            author: "@dakshgup",
            time: "5h ago",
            status: "In Progress",
            bugs: 0,
            nits: 0,
            priority: "MEDIUM"
        },
        {
            number: 415,
            title: "Fix bug in knowledge graph persistence",
            author: "@omkargade",
            time: "Yesterday",
            status: "Reviewed",
            bugs: 0,
            nits: 5,
            priority: "LOW"
        }
    ];

    return (
        <div className="space-y-10 max-w-6xl mx-auto">
            <PageHeader
                title={repoName}
                subtitle="Repository Overview"
                breadcrumbs={[{ label: "Repositories" }, { label: repoName }]}
                actions={
                    <Button className="rounded-none bg-black text-white hover:bg-white hover:text-black border border-black transition-all font-bold uppercase tracking-widest text-[10px] gap-2">
                        <RefreshCcw className="h-3 w-3" />
                        Trigger Re-index
                    </Button>
                }
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FieldsetCard legend="Repository Stats" className="md:col-span-1">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                            <span className="text-black/40">Total PRs</span>
                            <span>142</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                            <span className="text-black/40">Open PRs</span>
                            <span>12</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                            <span className="text-black/40">Stars</span>
                            <span>★ 1,204</span>
                        </div>
                        <div className="pt-4 border-t border-black/5">
                            <div className="text-[8px] font-black uppercase text-black/40 mb-2">Last Indexed</div>
                            <div className="text-sm font-bold tracking-tight italic uppercase">Today · 12:45 PM</div>
                        </div>
                    </div>
                </FieldsetCard>

                <div className="md:col-span-2 space-y-6">
                    <div className="flex items-center justify-between border-b-2 border-black pb-2">
                        <h3 className="text-lg font-black uppercase tracking-tight italic underline decoration-black/5 underline-offset-4">Recent Pull Requests</h3>
                        <div className="flex gap-2">
                            <Badge variant="outline" className="rounded-none border-black text-[9px] font-bold">ALL</Badge>
                            <Badge variant="outline" className="rounded-none border-black/10 text-[9px] font-bold text-black/40">OPEN</Badge>
                            <Badge variant="outline" className="rounded-none border-black/10 text-[9px] font-bold text-black/40">MERGED</Badge>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {pullRequests.map((pr) => (
                            <Link key={pr.number} href={`/repos/${params.id}/pr/${pr.number}`}>
                                <div className="group border border-black p-6 bg-white hover:bg-black hover:text-white transition-all duration-200 cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-black/40 group-hover:text-white/40">#{pr.number}</span>
                                                <h4 className="text-md font-bold tracking-tight group-hover:italic transition-all uppercase leading-none">{pr.title}</h4>
                                            </div>
                                            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-black/40 group-hover:text-white/60">
                                                <span className="flex items-center gap-1.5"><User className="h-3 w-3" /> {pr.author}</span>
                                                <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {pr.time}</span>
                                            </div>
                                        </div>
                                        <div>
                                            {pr.status === "Reviewed" ? (
                                                <div className="flex gap-2">
                                                    <Badge className="rounded-none bg-black text-white border border-black group-hover:bg-white group-hover:text-black group-hover:border-white text-[9px] font-bold">COMPLETE</Badge>
                                                    <Badge variant="outline" className="rounded-none border-black group-hover:border-white text-[9px] font-bold flex gap-1 items-center">
                                                        <Bug className="h-3 w-3" /> {pr.bugs}
                                                    </Badge>
                                                </div>
                                            ) : (
                                                <Badge variant="outline" className="rounded-none border-black/20 group-hover:border-white/40 text-[9px] font-bold text-black/40 group-hover:text-white/60">PENDING</Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

import { RefreshCcw } from "lucide-react";
