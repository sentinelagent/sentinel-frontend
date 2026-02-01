"use client";

import { useState, useEffect, useCallback } from "react";
import { FieldsetCard } from "@/components/common/fieldset-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Search, Check, Loader2, ArrowRight, Server, Database, Brain, Sparkles, Terminal, Shield, FileText, Plus } from "lucide-react";
import { StepIndicator } from "./step-indicator";
import { cn } from "@/lib/utils";
import { repositoryService, indexingService, githubService, userService, contextTemplateService, Repository } from "@/lib/api";
import { IndexingStatusCard } from "./indexing-status-card";
import { TemplateSelector } from "@/components/templates/template-selector";

type Step = 1 | 2 | 3 | 4;

const STEPS = [
    { id: 1, label: "Connect Source" },
    { id: 2, label: "Select Repos" },
    { id: 3, label: "Context" },
    { id: 4, label: "Indexing" },
];

export function SetupWizard() {
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [loading, setLoading] = useState(false);
    const [githubConnected, setGithubConnected] = useState(false);
    const [repos, setRepos] = useState<Repository[]>([]);
    const [selectedRepos, setSelectedRepos] = useState<Repository[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [context, setContext] = useState("");
    const [repoTemplates, setRepoTemplates] = useState<Record<string, string[]>>({});
    const [indexingRuns, setIndexingRuns] = useState<{
        repoId: string;
        repoName: string;
        workflowId: string;
        runId: string;
        isComplete?: boolean;
    }[]>([]);

    const handleComplete = useCallback((repoId: string) => {
        setIndexingRuns(prev => prev.map(run =>
            run.repoId === repoId ? { ...run, isComplete: true } : run
        ));
    }, []);

    const isAllComplete = indexingRuns.length > 0 && indexingRuns.every(run => run.isComplete);
    const [user, setUser] = useState<any>(null);

    // Fetch user on mount and check if GitHub is already connected
    useEffect(() => {
        userService.whoami().then((userData) => {
            setUser(userData);
            // If user already has a GitHub installation, skip to step 2
            if ((userData?.github_installations?.length ?? 0) > 0) {
                setGithubConnected(true);
                setCurrentStep(2);
                fetchRepos();
            }
        }).catch(console.error);
    }, []);

    // Check if coming back from GitHub OAuth callback
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const installationId = params.get("installation_id");

        if (params.get("connected") === "true" && installationId) {
            setGithubConnected(true);
            setCurrentStep(2);

            // Save installation_id to backend, then refresh user data
            userService.setInstallationId(parseInt(installationId))
                .then(() => {
                    console.log("Installation ID saved successfully");
                    // Refresh user to get updated github_installations
                    return userService.whoami();
                })
                .then((userData) => {
                    setUser(userData);
                    fetchRepos();
                })
                .catch((err) => {
                    console.error("Failed to save installation ID", err);
                    // Still fetch repos even if this fails
                    fetchRepos();
                });

            // Clean up URL params
            window.history.replaceState({}, '', '/settings');
        }
    }, []);

    const fetchRepos = async () => {
        setLoading(true);
        try {
            const data = await repositoryService.getAll();
            setRepos(data);
        } catch (err) {
            console.error("Failed to fetch repos", err);
        } finally {
            setLoading(false);
        }
    };

    const handleConnectGithub = () => {
        window.location.href = githubService.getAuthUrl();
    };

    const toggleRepoSelection = (repo: Repository) => {
        setSelectedRepos(prev => {
            const isSelected = prev.some(r => r.id === repo.id);
            if (isSelected) {
                return prev.filter(r => r.id !== repo.id);
            }
            return [...prev, repo];
        });
    };

    const handleStartIndexing = async () => {
        if (selectedRepos.length === 0) return;

        setLoading(true);
        setCurrentStep(4);

        try {
            const installationId = user?.github_installations?.[0]?.installation_id;
            if (!installationId) {
                throw new Error("No GitHub installation found");
            }

            // Map template IDs into the repository objects for the indexing request
            const repositoriesWithTemplates = selectedRepos.map(repo => ({
                ...repo,
                template_ids: repoTemplates[repo.id] || []
            }));

            const response = await indexingService.startIndexing(installationId, repositoriesWithTemplates);

            if (response.repositories) {
                setIndexingRuns(response.repositories.map((r: any) => {
                    // Find the matching repo from selectedRepos to get its display name
                    const matchedRepo = selectedRepos.find(sel =>
                        String(sel.id) === String(r.repo_id) ||
                        sel.full_name === r.repo_name
                    );

                    return {
                        repoId: r.repo_id,
                        repoName: matchedRepo?.full_name || r.repo_name || 'Repository',
                        workflowId: r.workflow_id,
                        runId: r.run_id
                    };
                }));
            }
        } catch (err) {
            console.error("Failed to start indexing", err);
        } finally {
            setLoading(false);
        }
    };

    const filteredRepos = repos.filter(repo =>
        repo.full_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-12">
            <StepIndicator
                steps={STEPS.map(s => ({ ...s, completed: s.id < (currentStep as number) }))}
                currentStep={currentStep as number}
            />

            <div className="max-w-4xl mx-auto">
                {currentStep === 1 && (
                    <div className="animate-spectacular space-y-8">
                        <FieldsetCard legend="01. Connect Source" dashed>
                            <div className="py-10 flex flex-col items-center gap-8 text-center">
                                <div className="h-20 w-20 border-2 border-black flex items-center justify-center bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-3 group-hover:rotate-0 transition-transform">
                                    <Github className="h-10 w-10" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-black uppercase italic tracking-tight">GitHub Infrastructure</h3>
                                    <p className="text-xs font-medium text-black/40 uppercase tracking-widest max-w-sm">
                                        Connect your GitHub organization to allow Sentinel to monitor pull requests and build its internal knowledge graph.
                                    </p>
                                </div>
                                {!githubConnected ? (
                                    <Button
                                        className="rounded-none h-14 px-10 bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-all font-bold uppercase tracking-[0.2em] text-xs gap-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none"
                                        onClick={handleConnectGithub}
                                    >
                                        Connect GitHub Account
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                ) : (
                                    <div className="flex items-center gap-2 text-success uppercase text-xs font-black italic">
                                        <Check className="h-4 w-4" />
                                        Infrastructure Linked
                                    </div>
                                )}
                            </div>
                        </FieldsetCard>
                        {githubConnected && (
                            <div className="flex justify-end">
                                <Button onClick={() => setCurrentStep(2)} className="h-12 px-8 bg-black text-white rounded-none uppercase font-black text-[10px] tracking-widest">
                                    Continue to Repository Selection →
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="animate-spectacular space-y-8">
                        <FieldsetCard legend="02. Mapping Repositories">
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black/20" />
                                        <Input
                                            placeholder="Search connected repositories..."
                                            className="pl-12 rounded-none border-2 border-black h-14 font-bold text-lg focus-visible:ring-0"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <Button
                                        onClick={() => window.open("https://github.com/apps/demo-sen-1/installations/select_target", "_blank")}
                                        className="h-14 px-6 rounded-none border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all font-black uppercase tracking-tight text-[10px] gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Add Repository
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar border border-black/5 p-2">
                                    {loading ? (
                                        <div className="py-20 flex justify-center">
                                            <Loader2 className="h-8 w-8 animate-spin text-black/20" />
                                        </div>
                                    ) : filteredRepos.length > 0 ? (
                                        filteredRepos.map((repo) => {
                                            const isSelected = selectedRepos.some(r => r.id === repo.id);
                                            return (
                                                <div
                                                    key={repo.id}
                                                    onClick={() => toggleRepoSelection(repo)}
                                                    className={cn(
                                                        "p-5 border-2 cursor-pointer transition-all flex items-center justify-between group",
                                                        isSelected
                                                            ? "border-black bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
                                                            : "border-black/5 hover:border-black/20 bg-white"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={cn("h-4 w-4 border-2 flex items-center justify-center", isSelected ? "border-white bg-white" : "border-black")}>
                                                            {isSelected && <Check className="h-3 w-3 text-black" />}
                                                        </div>
                                                        <div>
                                                            <div className="font-black text-sm uppercase tracking-tight">{repo.full_name}</div>
                                                            <div className={cn("text-[9px] font-bold uppercase tracking-widest", isSelected ? "text-white/60" : "text-black/40")}>
                                                                Default Branch: {repo.default_branch}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Badge className={cn("rounded-none text-[8px] font-black", isSelected ? "bg-white text-black" : "bg-black text-white")}>
                                                        {repo.private ? "PRIVATE" : "PUBLIC"}
                                                    </Badge>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="py-20 text-center space-y-4">
                                            <div className="text-[10px] font-black uppercase text-black/20 tracking-widest">No Repositories Found</div>
                                            <Button variant="outline" onClick={fetchRepos} className="rounded-none border-black uppercase text-[10px] font-black">Refresh List</Button>
                                        </div>
                                    )}
                                </div>
                                {selectedRepos.length > 0 && (
                                    <div className="text-[10px] font-black uppercase text-black/60 tracking-widest">
                                        {selectedRepos.length} repositor{selectedRepos.length === 1 ? 'y' : 'ies'} selected
                                    </div>
                                )}
                            </div>
                        </FieldsetCard>
                        <div className="flex justify-between items-center">
                            <Button onClick={() => setCurrentStep(1)} variant="ghost" className="text-[10px] font-black uppercase tracking-widest">Back</Button>
                            <Button
                                disabled={selectedRepos.length === 0}
                                onClick={() => setCurrentStep(3)}
                                className="h-12 px-8 bg-black text-white rounded-none uppercase font-black text-[10px] tracking-widest disabled:opacity-20"
                            >
                                Configure Environment →
                            </Button>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="animate-spectacular space-y-8">
                        <FieldsetCard legend="03. Environmental Context">
                            <div className="space-y-8">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <h3 className="text-sm font-black uppercase tracking-tight italic">Repository Knowledge Assets</h3>
                                            <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">
                                                Assign templates to provide standard guidelines and architectural context.
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="rounded-none border-black h-8 text-[9px] font-black uppercase tracking-widest"
                                            onClick={() => window.open('/settings/context', '_blank')}
                                        >
                                            Manage Templates
                                        </Button>
                                    </div>

                                    <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar border-y border-black/5 py-6">
                                        {selectedRepos.map((repo) => (
                                            <div key={repo.id} className="space-y-3 p-4 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-2 w-2 bg-black" />
                                                    <span className="text-xs font-black uppercase tracking-tight">{repo.full_name}</span>
                                                </div>
                                                <TemplateSelector
                                                    repositoryId={repo.id}
                                                    selectedTemplateIds={repoTemplates[repo.id] || []}
                                                    onChange={(ids) => setRepoTemplates(prev => ({
                                                        ...prev,
                                                        [repo.id]: ids
                                                    }))}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40">Additional Custom Instructions (Optional)</label>
                                    <Textarea
                                        placeholder="Any one-off architectural context or specific rules for this indexing session..."
                                        className="min-h-[100px] rounded-none border-2 border-black font-mono text-xs focus-visible:ring-0 leading-relaxed p-4"
                                        value={context}
                                        onChange={(e) => setContext(e.target.value)}
                                    />
                                </div>
                            </div>
                        </FieldsetCard>
                        <div className="flex justify-between items-center">
                            <Button onClick={() => setCurrentStep(2)} variant="ghost" className="text-[10px] font-black uppercase tracking-widest">Back</Button>
                            <Button
                                onClick={handleStartIndexing}
                                className="h-12 px-10 bg-black text-white rounded-none uppercase font-black text-[10px] tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none"
                            >
                                Initiate Knowledge Mapping
                                <Sparkles className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}

                {currentStep === 4 && (
                    <div className="animate-spectacular space-y-10 py-10">
                        <div className="space-y-6">
                            {indexingRuns.length > 0 ? (
                                indexingRuns.map((run) => (
                                    <IndexingStatusCard
                                        key={run.repoId}
                                        repoId={run.repoId}
                                        repoName={run.repoName}
                                        workflowId={run.workflowId}
                                        runId={run.runId}
                                        onComplete={() => handleComplete(run.repoId)}
                                    />
                                ))
                            ) : (
                                <div className="py-20 flex flex-col items-center gap-6 text-center border-2 border-black border-dashed">
                                    <Loader2 className="h-10 w-10 animate-spin text-black/20" />
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-black uppercase italic tracking-tight">Initializing Engines</h3>
                                        <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Warming up knowledge mapping infrastructure...</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {isAllComplete && (
                            <div className="flex justify-center pt-8">
                                <Button
                                    onClick={() => window.location.href = "/dashboard"}
                                    className="h-14 px-12 bg-black text-white rounded-none uppercase font-black text-xs tracking-[0.3em] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none"
                                >
                                    Go to Dashboard
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
