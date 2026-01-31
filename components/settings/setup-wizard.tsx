"use client";

import { useState } from "react";
import { FieldsetCard } from "@/components/common/fieldset-card";
import { StepIndicator } from "@/components/settings/step-indicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Github, Search, RefreshCcw, ArrowRight, ArrowLeft } from "lucide-react";
import { PageHeader } from "../layout/page-header";

const STEPS = [
    { id: 1, label: "Connect Github" },
    { id: 2, label: "Select Repos" },
    { id: 3, label: "Context" },
    { id: 4, label: "Indexing" },
];

export function SetupWizard() {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedRepos, setSelectedRepos] = useState<string[]>([]);

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <StepIndicator steps={STEPS.map(s => ({ ...s, completed: s.id < currentStep }))} currentStep={currentStep} />

            <div className="min-h-[400px]">
                {currentStep === 1 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-black uppercase italic tracking-tight">Connect your sources</h2>
                            <p className="text-xs font-bold text-black/40 uppercase tracking-widest">Connect your Github account to start importing repositories</p>
                        </div>

                        <FieldsetCard legend="Github Connection" dashed className="py-12">
                            <div className="flex flex-col items-center gap-6">
                                <div className="h-20 w-20 border-2 border-black flex items-center justify-center bg-[#F5F5F4] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                                    <Github className="h-10 w-10" />
                                </div>
                                <Button className="rounded-none px-8 h-12 bg-black text-white hover:bg-white hover:text-black border border-black transition-all font-bold uppercase tracking-widest text-xs gap-3">
                                    Connect Github Account
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                                <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Sentinal requires read-only access to select repositories</p>
                            </div>
                        </FieldsetCard>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-between items-end">
                            <div>
                                <h2 className="text-2xl font-black uppercase italic tracking-tight">Select Repositories</h2>
                                <p className="text-xs font-bold text-black/40 uppercase tracking-widest">Choose the projects you want Sentinel to analyze</p>
                            </div>
                            <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-widest gap-2 hover:bg-black hover:text-white rounded-none border border-transparent hover:border-black">
                                <RefreshCcw className="h-3 w-3" />
                                Refresh List
                            </Button>
                        </div>

                        <FieldsetCard legend="Repository List">
                            <div className="space-y-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/20" />
                                    <Input placeholder="Search repositories..." className="pl-10 rounded-none border-black h-11 focus-visible:ring-0" />
                                </div>

                                <div className="border border-black divide-y divide-black">
                                    {["frontend-app", "backend-api", "shared-logic", "documentation", "infra-scripts"].map((repo) => (
                                        <div key={repo} className="flex items-center gap-4 p-4 hover:bg-black/5 transition-colors group">
                                            <Checkbox
                                                id={repo}
                                                className="rounded-none border-black data-[state=checked]:bg-black"
                                                onCheckedChange={(checked) => {
                                                    if (checked) setSelectedRepos([...selectedRepos, repo]);
                                                    else setSelectedRepos(selectedRepos.filter(r => r !== repo));
                                                }}
                                            />
                                            <label htmlFor={repo} className="flex-1 flex items-center justify-between cursor-pointer">
                                                <span className="font-bold text-sm tracking-tight">{repo}</span>
                                                <span className="text-[10px] font-bold uppercase text-black/20 group-hover:text-black/40 transition-colors">last update: 2h ago</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FieldsetCard>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div>
                            <h2 className="text-2xl font-black uppercase italic tracking-tight">Project Context</h2>
                            <p className="text-xs font-bold text-black/40 uppercase tracking-widest">Help the AI understand your coding standards and architecture</p>
                        </div>

                        <FieldsetCard legend="Coding Guidelines">
                            <div className="space-y-4">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-black/60">Upload or link your technical documentation (Recommended)</p>
                                <div className="border-2 border-dashed border-black/10 py-10 flex flex-col items-center justify-center bg-black/[0.02] cursor-pointer hover:bg-black/[0.04] transition-colors group">
                                    <FileText className="h-8 w-8 text-black/20 group-hover:text-black/40 mb-3" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Drop READMEs or Style Guides here</span>
                                </div>
                                <div className="space-y-2 pt-4">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">Custom Instructions</span>
                                    <textarea
                                        className="w-full min-h-[150px] border border-black p-4 rounded-none text-sm font-mono focus:outline-none focus:bg-black/5 transition-colors"
                                        placeholder="E.g. Always use functional components for React, Prefer early returns, No external UI libraries..."
                                    />
                                </div>
                            </div>
                        </FieldsetCard>
                    </div>
                )}

                {currentStep === 4 && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center space-y-4">
                            <div className="inline-flex h-20 w-20 border-2 border-black items-center justify-center bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-bounce">
                                <RefreshCcw className="h-10 w-10 animate-spin" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black uppercase italic tracking-tight underline decoration-black/10 underline-offset-8">Indexing Knowledge Base</h2>
                                <p className="text-xs font-bold text-black/40 uppercase tracking-widest mt-4">Sentinel is mapping your code symbols and relationships</p>
                            </div>
                        </div>

                        <FieldsetCard legend="Progress Tracker" dashed>
                            <div className="space-y-6">
                                {[
                                    { label: "Cloning Repositories", status: "completed" },
                                    { label: "Parsing Symbols", status: "in-progress" },
                                    { label: "Building Knowledge Graph", status: "pending" },
                                    { label: "Finalizing Metadata", status: "pending" },
                                ].map((step, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        {step.status === "completed" ? (
                                            <div className="h-4 w-4 border border-black bg-black flex items-center justify-center">
                                                <Check className="h-3 w-3 text-white stroke-[4px]" />
                                            </div>
                                        ) : step.status === "in-progress" ? (
                                            <div className="h-4 w-4 border border-black bg-white flex items-center justify-center">
                                                <div className="h-2 w-2 bg-black animate-pulse" />
                                            </div>
                                        ) : (
                                            <div className="h-4 w-4 border border-black bg-white opacity-20" />
                                        )}
                                        <span className={cn(
                                            "text-[11px] font-bold uppercase tracking-widest",
                                            step.status === "pending" ? "text-black/20" : "text-black"
                                        )}>
                                            {step.label}
                                        </span>
                                        {step.status === "in-progress" && (
                                            <span className="text-[9px] font-black text-black ml-auto animate-pulse italic">PROCESSING...</span>
                                        )}
                                    </div>
                                ))}

                                <div className="mt-8 space-y-2">
                                    <div className="flex justify-between text-[8px] font-black uppercase tracking-[0.2em] text-black/40">
                                        <span>Sync Efficiency: 100%</span>
                                        <span>Total Symbols: 12,432</span>
                                    </div>
                                    <div className="h-2 w-full border border-black bg-black/5">
                                        <div className="h-full bg-black transition-all duration-500" style={{ width: '42%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </FieldsetCard>
                    </div>
                )}
            </div>

            <div className="flex justify-between pt-8 border-t border-black/10">
                <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="rounded-none h-11 border-black hover:bg-black hover:text-white transition-all font-bold uppercase tracking-widest text-[10px] gap-2 disabled:opacity-20"
                >
                    <ArrowLeft className="h-3 w-3" />
                    Back
                </Button>
                <Button
                    onClick={nextStep}
                    disabled={currentStep === 4}
                    className="rounded-none h-11 bg-black text-white hover:bg-white hover:text-black border border-black transition-all font-bold uppercase tracking-widest text-[10px] gap-2 disabled:opacity-20"
                >
                    {currentStep === 4 ? "Complete Setup" : "Continue"}
                    <ArrowRight className="h-3 w-3" />
                </Button>
            </div>
        </div>
    );
}

import { FileText } from "lucide-react";
