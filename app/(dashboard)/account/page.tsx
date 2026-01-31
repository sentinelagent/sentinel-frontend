"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { FieldsetCard } from "@/components/common/fieldset-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Key, User, Shield, Terminal, LogOut } from "lucide-react";
import { userService } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function AccountPage() {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        userService.whoami().then((profile) => {
            setUser(profile);
        }).catch(() => {
            router.push("/login");
        });
    }, [router]);

    const handleSignOut = async () => {
        try {
            await userService.logout();
            router.push("/login");
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12 pb-20">
            <div className="animate-spectacular">
                <PageHeader
                    title="Account Settings"
                    subtitle="Manage your identity and access control"
                    breadcrumbs={[{ label: "Sentinel" }, { label: "Settings" }]}
                />
            </div>

            <div className="grid grid-cols-1 gap-12">
                {/* Profile Section */}
                <div className="animate-spectacular opacity-0 stagger-1">
                    <FieldsetCard legend="01. User Identity">
                        <div className="flex flex-col md:flex-row gap-10 items-start">
                            <div className="h-24 w-24 border-2 border-black flex items-center justify-center bg-[#F5F5F4] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-black">
                                <User className="h-10 w-10" />
                            </div>
                            <div className="flex-1 space-y-6 w-full">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-black/40">Email Address</Label>
                                        <Input readOnly value={user?.email || "..."} className="rounded-none border-black h-11 font-bold focus-visible:ring-0 bg-black/5" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-black/40">Infrastructure Tier</Label>
                                        <div className="h-11 flex items-center px-4 border border-black/10 bg-black/[0.02]">
                                            <Badge className="rounded-none bg-black text-white text-[8px] font-black tracking-widest">ADVANCED ACCESS</Badge>
                                        </div>
                                    </div>
                                </div>
                                <Button className="rounded-none h-11 px-8 bg-black text-white hover:bg-white hover:text-black border border-black transition-all font-bold uppercase tracking-widest text-[10px]">Update Profile</Button>
                            </div>
                        </div>
                    </FieldsetCard>
                </div>

                {/* Security Section */}
                <div className="animate-spectacular stagger-2 opacity-0">
                    <FieldsetCard legend="02. Security & Credentials" dashed>
                        <div className="space-y-8">
                            <div className="flex items-center justify-between group cursor-pointer border border-black/5 p-6 hover:border-black transition-colors">
                                <div className="flex items-center gap-4">
                                    <Shield className="h-5 w-5 text-black/20 group-hover:text-black" />
                                    <div>
                                        <div className="text-xs font-black uppercase">Two-Factor Authentication</div>
                                        <div className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Enhanced biometric infrastructure</div>
                                    </div>
                                </div>
                                <Button variant="ghost" className="text-[10px] font-black uppercase underline underline-offset-4">Configure</Button>
                            </div>

                            <div className="flex items-center justify-between group cursor-pointer border border-black/5 p-6 hover:border-black transition-colors">
                                <div className="flex items-center gap-4">
                                    <Terminal className="h-5 w-5 text-black/20 group-hover:text-black" />
                                    <div>
                                        <div className="text-xs font-black uppercase">Active Sessions</div>
                                        <div className="text-[10px] font-bold text-black/40 uppercase tracking-widest">3 active endpoints captured</div>
                                    </div>
                                </div>
                                <Button variant="ghost" className="text-[10px] font-black uppercase underline underline-offset-4">Audit Trace</Button>
                            </div>
                        </div>
                    </FieldsetCard>
                </div>

                {/* API Tokens */}
                <div className="animate-spectacular stagger-3 opacity-0">
                    <FieldsetCard legend="03. API Keys">
                        <div className="space-y-6">
                            <div className="bg-black/5 p-6 space-y-4">
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-black/40 tracking-[0.2em]">
                                    <Key className="h-3 w-3" />
                                    Access token for cli integration
                                </div>
                                <div className="flex gap-2">
                                    <Input readOnly value="sk_sentinel_••••••••••••••••••••" className="rounded-none border-black/10 h-11 font-mono text-xs focus-visible:ring-0" />
                                    <Button variant="outline" className="rounded-none h-11 border-black px-6 font-black text-[10px] uppercase">Roll Key</Button>
                                </div>
                            </div>
                        </div>
                    </FieldsetCard>
                </div>

                {/* Danger Zone */}
                <div className="animate-spectacular stagger-4 opacity-0 pt-8 border-t border-black/5 flex flex-col items-center gap-8">
                    <Button
                        onClick={handleSignOut}
                        variant="outline"
                        className="rounded-none h-12 px-12 border-black hover:bg-black hover:text-white transition-all font-black uppercase tracking-[0.2em] text-[10px] gap-2"
                    >
                        <LogOut className="h-4 w-4" />
                        Terminate Session
                    </Button>
                    <span className="text-[9px] font-black text-black/20 uppercase tracking-widest hover:text-destructive cursor-pointer transition-colors">Decommission Account Infrastructure</span>
                </div>
            </div>
        </div>
    );
}
