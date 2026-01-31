import { PageHeader } from "@/components/layout/page-header";
import { FieldsetCard } from "@/components/common/fieldset-card";
import { Badge } from "@/components/ui/badge";
import { Bug, AlertCircle, CheckCircle2, FileCode, ArrowRight, MessageSquare } from "lucide-react";

export default function PRDetailPage({ params }: { params: { id: string, number: string } }) {
    const repoName = params.id === "1" ? "frontend-app" : "backend-api";

    const findings = [
        {
            id: 1,
            severity: "CRITICAL",
            type: "SecurityBug",
            file: "src/auth/login.ts",
            line: 42,
            description: "JWT token stored in localStorage is vulnerable to XSS. This allows attackers to steal user sessions if an injection point exists.",
            suggestion: "Store tokens in httpOnly, Secure cookies instead.",
            code: "localStorage.setItem('token', token);\n// vs\ncookies().set('token', token, { httpOnly: true, secure: true });"
        },
        {
            id: 2,
            severity: "HIGH",
            type: "Bug",
            file: "app/dashboard/layout.tsx",
            line: 12,
            description: "Missing null check before accessing user object. This will cause a crash when the session is not yet loaded.",
            suggestion: "Add optional chaining or verify session existence.",
            code: "return <div>{user.name}</div>;\n// vs\nreturn <div>{user?.name ?? 'Guest'}</div>;"
        }
    ];

    return (
        <div className="space-y-10 max-w-6xl mx-auto pb-20">
            <PageHeader
                title={`Review #${params.number}`}
                subtitle={repoName}
                breadcrumbs={[
                    { label: "Repositories", href: "/dashboard" },
                    { label: repoName, href: `/repos/${params.id}` },
                    { label: `PR #${params.number}` }
                ]}
                actions={
                    <div className="flex gap-3">
                        <Badge className="rounded-none bg-black text-white h-10 px-4 text-[10px] font-bold uppercase tracking-widest border border-black">Published</Badge>
                        <Badge variant="outline" className="rounded-none border-black h-10 px-4 text-[10px] font-bold uppercase tracking-widest flex gap-2">
                            <Bug className="h-4 w-4" /> 5 Findings
                        </Badge>
                    </div>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <FieldsetCard legend="Summary">
                        <div className="space-y-6">
                            <div className="space-y-1">
                                <div className="text-[10px] font-bold uppercase text-black/40">Status</div>
                                <div className="flex items-center gap-2 font-bold text-sm italic">
                                    <div className="h-2 w-2 bg-success rounded-full" />
                                    COMPLETED
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-[10px] font-bold uppercase text-black/40">Reviewer</div>
                                <div className="font-bold text-sm uppercase tracking-tight italic underline decoration-black/10">Claude 3.5 Sonnet</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-[10px] font-bold uppercase text-black/40">Duration</div>
                                <div className="font-bold text-sm tabular-nums">1m 24s</div>
                            </div>
                            <div className="pt-6 border-t border-black/10">
                                <div className="text-[9px] font-black uppercase text-black/40 mb-3 tracking-widest">SEVERITY MIX</div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold uppercase">Critical</span>
                                        <Badge className="rounded-none bg-destructive text-white border-0 text-[10px] font-black px-1.5 h-4">1</Badge>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold uppercase">High</span>
                                        <Badge className="rounded-none bg-orange-500 text-white border-0 text-[10px] font-black px-1.5 h-4">1</Badge>
                                    </div>
                                    <div className="flex justify-between items-center opacity-20">
                                        <span className="text-[10px] font-bold uppercase">Medium</span>
                                        <span className="text-[10px] font-bold">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FieldsetCard>
                </div>

                <div className="lg:col-span-3 space-y-10">
                    <div className="space-y-8">
                        {findings.map((finding) => (
                            <div key={finding.id} className="relative group">
                                <div className="absolute -left-4 top-0 bottom-0 w-[4px] bg-black opacity-0 group-hover:opacity-100 transition-opacity" />
                                <FieldsetCard legend={finding.file} className="overflow-hidden">
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-start">
                                            <div className="flex gap-3">
                                                <Badge className={cn(
                                                    "rounded-none border-0 text-[10px] font-black px-2 h-5 flex items-center gap-1.5",
                                                    finding.severity === "CRITICAL" ? "bg-destructive text-white" : "bg-orange-500 text-white"
                                                )}>
                                                    {finding.severity === "CRITICAL" ? <AlertCircle className="h-3 w-3" /> : <Bug className="h-3 w-3" />}
                                                    {finding.severity}
                                                </Badge>
                                                <Badge variant="outline" className="rounded-none border-black text-[10px] font-bold h-5 px-2">
                                                    {finding.type}
                                                </Badge>
                                            </div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-black/40 italic">Line: {finding.line}</div>
                                        </div>

                                        <div className="space-y-4">
                                            <p className="text-sm font-bold tracking-tight leading-relaxed">{finding.description}</p>

                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/60">
                                                    <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                                                    Suggestion
                                                </div>
                                                <p className="text-xs text-black/60 font-medium bg-[#F5F5F4] p-4 border border-black/5 italic border-l-2 border-l-black">{finding.suggestion}</p>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/60">
                                                    <FileCode className="h-3.5 w-3.5" />
                                                    Code Reference
                                                </div>
                                                <div className="bg-black text-white p-6 font-mono text-[11px] leading-relaxed shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)] border-l-4 border-l-white/20 overflow-x-auto">
                                                    <pre>{finding.code}</pre>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-3 pt-4 border-t border-black/5">
                                            <Button variant="ghost" className="h-8 rounded-none text-[10px] font-bold uppercase tracking-widest gap-2 hover:bg-black hover:text-white border border-transparent hover:border-black">
                                                <MessageSquare className="h-3.5 w-3.5" />
                                                Comment
                                            </Button>
                                            <Button variant="ghost" className="h-8 rounded-none text-[10px] font-bold uppercase tracking-widest gap-2 hover:bg-black hover:text-white border border-transparent hover:border-black">
                                                Mark Fixed
                                                <ArrowRight className="h-3.5 w-3.5" />
                                            </Button>
                                        </div>
                                    </div>
                                </FieldsetCard>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
