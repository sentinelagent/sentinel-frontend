import { PageHeader } from "@/components/layout/page-header";
import { FieldsetCard } from "@/components/common/fieldset-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { User, Key, Bell, Shield, LogOut, Copy } from "lucide-react";

export default function AccountPage() {
    return (
        <div className="space-y-12 max-w-4xl mx-auto pb-20">
            <div className="animate-spectacular">
                <PageHeader
                    title="Account Settings"
                    subtitle="User Profile & Security"
                    breadcrumbs={[{ label: "Sentinel" }, { label: "Account" }]}
                />
            </div>

            <div className="grid grid-cols-1 gap-12">
                {/* Profile Section */}
                <div className="animate-spectacular opacity-0 stagger-1">
                    <FieldsetCard legend="Developer Profile">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="h-24 w-24 border-2 border-black flex items-center justify-center bg-black text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)]">
                                <User className="h-12 w-12" />
                            </div>
                            <div className="flex-1 space-y-4 w-full">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-black/40">Display Name</label>
                                        <Input defaultValue="Omkar Gade" className="rounded-none border-black h-11 focus-visible:ring-0" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-black/40">Email Address</label>
                                        <Input defaultValue="omkar@sentinel.ai" disabled className="rounded-none border-black h-11 bg-black/5 opacity-50 cursor-not-allowed" />
                                    </div>
                                </div>
                                <Button className="rounded-none h-11 px-8 bg-black text-white hover:bg-white hover:text-black border border-black transition-all font-bold uppercase tracking-widest text-[10px]">
                                    Update Profile
                                </Button>
                            </div>
                        </div>
                    </FieldsetCard>
                </div>

                {/* API Access Section */}
                <div className="animate-spectacular opacity-0 stagger-2">
                    <FieldsetCard legend="API & Access" dashed>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40">Personal Access Token</label>
                                    <span className="text-[9px] font-bold text-success uppercase italic">Active</span>
                                </div>
                                <div className="flex gap-2">
                                    <Input value="sk_live_51Pz..." readOnly className="rounded-none border-black h-11 font-mono text-sm focus-visible:ring-0" />
                                    <Button variant="outline" className="rounded-none h-11 w-11 border-black p-0 hover:bg-black hover:text-white transition-all">
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                                <p className="text-[9px] font-bold text-black/40 uppercase tracking-widest">Never share your API key with others or expose it in client-side code.</p>
                            </div>

                            <div className="pt-4 border-t border-black/5 flex justify-between items-center">
                                <div className="flex gap-4">
                                    <Badge variant="outline" className="rounded-none border-black text-[9px] font-black">SDK: ENABLED</Badge>
                                    <Badge variant="outline" className="rounded-none border-black text-[9px] font-black">WEBHOOKS: 2 ACTIVE</Badge>
                                </div>
                                <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest hover:underline px-0">Rotate Secret →</Button>
                            </div>
                        </div>
                    </FieldsetCard>
                </div>

                {/* Danger Zone */}
                <div className="animate-spectacular opacity-0 stagger-3">
                    <FieldsetCard legend="Danger Zone" className="border-destructive/20">
                        <div className="flex justify-between items-center">
                            <div className="space-y-1">
                                <div className="font-bold text-sm uppercase tracking-tight">Sign out of all sessions</div>
                                <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Terminate all active connections to this account.</p>
                            </div>
                            <Button variant="outline" className="rounded-none border-black hover:bg-black hover:text-white h-10 px-6 text-[10px] font-black uppercase tracking-widest gap-2">
                                <LogOut className="h-3.5 w-3.5" />
                                Logout
                            </Button>
                        </div>
                    </FieldsetCard>
                </div>
            </div>
        </div>
    );
}
