"use client";

import { useState, useEffect, useRef } from "react";
import { Check, Loader2, X, ChevronDown, ChevronUp, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { indexingService } from "@/lib/api";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

type StepStatus = 'pending' | 'in_progress' | 'completed' | 'failed';

interface Props {
    repoName: string;
    repoId: string;
    workflowId: string;
    runId: string;
    onComplete?: () => void;
}

export function IndexingStatusCard({ repoName, repoId, workflowId, runId, onComplete }: Props) {
    const [isOpen, setIsOpen] = useState(true);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("Initializing...");
    const [steps, setSteps] = useState({
        cloning: 'pending' as StepStatus,
        parsing: 'pending' as StepStatus,
        kg_storage: 'pending' as StepStatus,
        metadata: 'pending' as StepStatus,
        done: 'pending' as StepStatus,
    });
    const [logs, setLogs] = useState<string[]>([]);
    const endOfLogsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (endOfLogsRef.current) {
            endOfLogsRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [logs]);

    // Use a ref for onComplete to avoid effect restarts if the parent re-renders with a new function
    const onCompleteRef = useRef(onComplete);
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        const eventSource = indexingService.getEventSource(workflowId, runId);
        let isTerminated = false;

        const terminate = () => {
            if (!isTerminated) {
                isTerminated = true;
                eventSource.close();
                if (onCompleteRef.current) onCompleteRef.current();
            }
        };

        eventSource.addEventListener('activity', (event) => {
            const data = JSON.parse(event.data);

            if (data.progress !== undefined && data.progress !== null) {
                setProgress(data.progress);
            }
            if (data.message) {
                setStatus(data.message);
                setLogs(prev => [...prev.slice(-49), data.message]);
            }

            // Map activity to steps
            const activity = data.activity_name;
            const eventType = data.event_type;

            setSteps(prev => {
                const next = { ...prev };

                if (activity === 'clone_repo_activity') {
                    next.cloning = eventType === 'started' ? 'in_progress' : eventType === 'completed' ? 'completed' : eventType === 'failed' ? 'failed' : next.cloning;
                } else if (activity === 'parse_repo_activity') {
                    next.parsing = eventType === 'started' ? 'in_progress' : eventType === 'completed' ? 'completed' : eventType === 'failed' ? 'failed' : next.parsing;
                } else if (activity === 'persist_kg_activity') {
                    next.kg_storage = eventType === 'started' ? 'in_progress' : eventType === 'completed' ? 'completed' : eventType === 'failed' ? 'failed' : next.kg_storage;
                } else if (activity === 'persist_metadata_activity') {
                    next.metadata = eventType === 'started' ? 'in_progress' : eventType === 'completed' ? 'completed' : eventType === 'failed' ? 'failed' : next.metadata;
                }

                const terminalEventType = data.event_type;
                if (terminalEventType === 'workflow_completed') {
                    next.done = 'completed';
                    next.cloning = 'completed';
                    next.parsing = 'completed';
                    next.kg_storage = 'completed';
                    next.metadata = 'completed';
                    terminate();
                } else if (terminalEventType === 'workflow_failed' || data.status === 'failed') {
                    next.done = 'failed';
                    terminate();
                } else if (data.status === 'skipped') {
                    next.done = 'completed';
                    next.cloning = 'completed';
                    next.parsing = 'completed';
                    next.kg_storage = 'completed';
                    next.metadata = 'completed';
                    terminate();
                }

                return next;
            });
        });

        eventSource.onerror = (err) => {
            // Usually, onerror fires when server finishes stream if not handled gracefully
            // But we already handle terminal events above.
            // If it errors before terminal event, we let browser retry unless we want to fail.
        };

        return () => {
            eventSource.close();
        };
    }, [workflowId, runId]);

    const stepItems = [
        { label: "Cloning Repository", status: steps.cloning, key: 'cloning' },
        { label: "Parsing Repository", status: steps.parsing, key: 'parsing' },
        { label: "Storing in Knowledge Graph", status: steps.kg_storage, key: 'kg_storage' },
        { label: "Storing Metadata", status: steps.metadata, key: 'metadata' },
        { label: "Indexing Completed", status: steps.done, key: 'done' },
    ];

    const getStatusIcon = (status: StepStatus) => {
        switch (status) {
            case 'completed': return <Check className="h-3 w-3 text-success" />;
            case 'failed': return <X className="h-3 w-3 text-destructive" />;
            case 'in_progress': return <Loader2 className="h-3 w-3 animate-spin text-orange-500" />;
            default: return <div className="h-1.5 w-1.5 rounded-full bg-black/10" />;
        }
    };

    const completedStepsCount = stepItems.filter(s => s.status === 'completed').length;

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden"
        >
            <CollapsibleTrigger className="w-full p-6 flex items-center justify-between group hover:bg-black/[0.02] transition-all">
                <div className="flex items-center gap-6 text-left">
                    <div className="relative h-12 w-12 flex items-center justify-center shrink-0">
                        {/* Progress Circle SVG */}
                        <svg className="absolute h-full w-full -rotate-90 transform" viewBox="0 0 48 48">
                            {/* Background Track */}
                            <circle
                                cx="24"
                                cy="24"
                                r="20"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="transparent"
                                className="text-black/[0.05]"
                            />
                            {/* Animated Progress Track */}
                            <circle
                                cx="24"
                                cy="24"
                                r="20"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="transparent"
                                strokeDasharray={125.66}
                                strokeDashoffset={125.66 - (progress / 100) * 125.66}
                                strokeLinecap="round"
                                className={cn(
                                    "text-black transition-all duration-700 ease-out",
                                    progress > 0 && progress < 100 && "animate-pulse"
                                )}
                            />
                        </svg>

                        <div className="relative z-10 flex items-center justify-center">
                            {progress === 100 ? (
                                <Check className="h-5 w-5 text-success transition-all animate-in zoom-in-50" />
                            ) : (
                                <span className="text-[10px] font-black italic tabular-nums">{progress}%</span>
                            )}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-black uppercase italic tracking-tight text-sm">{repoName}</h3>
                        <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest truncate max-w-[300px]">{status}</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex flex-col items-end gap-1">
                        <div className="text-[9px] font-black uppercase tracking-widest text-black/30">
                            {completedStepsCount} / {stepItems.length} Steps
                        </div>
                        <div className="h-1 w-24 bg-black/5 overflow-hidden">
                            <div className="h-full bg-black transition-all duration-500" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                    {isOpen ? <ChevronUp className="h-4 w-4 opacity-20" /> : <ChevronDown className="h-4 w-4 opacity-20" />}
                </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
                <div className="px-10 pb-8 pt-2 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-black/5">
                    <div className="relative py-4">
                        <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-black/5" />

                        <div className="space-y-6">
                            {stepItems.map((item, i) => (
                                <div key={i} className="flex items-start gap-6 relative">
                                    <div className="h-8 w-8 relative flex items-center justify-center shrink-0">
                                        <div className={cn(
                                            "absolute inset-0 rounded-full border-2 transition-all",
                                            item.status === 'completed' ? "border-success bg-white" :
                                                item.status === 'failed' ? "border-destructive bg-white" :
                                                    item.status === 'in_progress' ? "border-orange-500 bg-white border-dashed animate-[spin_3s_linear_infinite]" :
                                                        "border-black/5 bg-white"
                                        )} />
                                        <div className="relative z-10 flex items-center justify-center">
                                            {getStatusIcon(item.status)}
                                        </div>
                                    </div>
                                    <div className="flex flex-col pt-1.5">
                                        <span className={cn(
                                            "text-[11px] font-black uppercase tracking-widest transition-all",
                                            item.status === 'completed' ? "text-success" :
                                                item.status === 'in_progress' ? "text-orange-500" :
                                                    item.status === 'failed' ? "text-destructive" :
                                                        "text-black/20"
                                        )}>
                                            {item.label}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-black/[0.02] border border-black/5 p-4 flex flex-col gap-3 h-[240px] my-4 relative">
                        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-black/20 border-b border-black/5 pb-2 sticky top-0 bg-transparent backdrop-blur-sm z-10">
                            <Terminal className="h-3 w-3" />
                            Activity Log
                        </div>
                        <div className="space-y-2 overflow-y-auto custom-scrollbar flex-1 pr-2">
                            {logs.length > 0 ? logs.map((log, i) => (
                                <div key={i} className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-500">
                                    <span className="text-[8px] font-black text-black/10 mt-0.5 uppercase">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                                    <span className="text-[10px] font-medium text-black/60 leading-tight tracking-tight">{log}</span>
                                </div>
                            )) : (
                                <div className="text-[10px] font-medium text-black/20 italic">Waiting for activity cycles...</div>
                            )}
                            <div ref={endOfLogsRef} />
                        </div>
                    </div>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}
