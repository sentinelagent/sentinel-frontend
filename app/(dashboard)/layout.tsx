"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { userService, repositoryService } from "@/lib/api";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [repositories, setRepositories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const userProfile = await userService.whoami();
                setUser(userProfile);

                // Fetch user selected repositories (gracefully handle new users)
                try {
                    const repos = await repositoryService.getUserSelected();
                    setRepositories(repos.map(r => ({
                        id: r.id,
                        name: r.github_repo_name,
                        fullName: r.full_name
                    })));
                } catch (repoErr) {
                    // New users won't have repositories yet - this is expected
                    console.log("No repositories found (likely new user)");
                    setRepositories([]);
                }
            } catch (err) {
                console.error("Authentication failed", err);
                router.push("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchSession();
    }, [router]);

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-white font-mono">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-10 border-4 border-black border-t-transparent animate-spin" />
                    <div className="text-[10px] font-black uppercase tracking-[0.4em]">Calibrating Sentinel...</div>
                </div>
            </div>
        );
    }

    return (
        <SidebarProvider>
            <AppSidebar repositories={repositories} user={user} />
            <SidebarInset className="bg-white">
                <header className="flex h-14 items-center gap-2 border-b border-black px-4 bg-white sticky top-0 z-10">
                    <SidebarTrigger className="rounded-none border border-black hover:bg-black hover:text-white transition-colors h-8 w-8 flex items-center justify-center p-0" />
                    <Separator orientation="vertical" className="h-4 bg-black/20" />
                    <div className="flex-1 flex items-center justify-end">
                        <div className="h-2 w-2 rounded-full bg-success animate-pulse mr-2" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Knowledge Base: Active</span>
                    </div>
                </header>
                <main className="flex-1 p-6 md:p-10">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    );
}
