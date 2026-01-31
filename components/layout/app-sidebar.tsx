"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Activity,
    Settings,
    BarChart3,
    FileText,
    ChevronDown,
    GitBranch,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Repository {
    id: string;
    name: string;
    fullName: string;
}

interface AppSidebarProps {
    repositories?: Repository[];
    user?: {
        email: string;
        plan?: string;
    };
}

const mainMenuItems = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/activity", label: "Activity", icon: Activity },
];

const codeReviewItems = [
    { href: "/settings/review", label: "Review Settings", icon: Settings },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/settings/context", label: "Custom Context", icon: FileText },
];

const accountItems = [
    { href: "/settings", label: "General Settings", icon: Settings },
];

export function AppSidebar({ repositories = [], user }: AppSidebarProps) {
    const pathname = usePathname();

    const isActive = (href: string) => pathname === href;
    const isRepoActive = (repoId: string) => pathname.startsWith(`/repos/${repoId}`);

    return (
        <Sidebar className="border-r border-black bg-[#F5F5F4]">
            <SidebarHeader className="border-b border-black">
                <div className="flex items-center gap-2 p-4">
                    <div className="flex h-10 w-10 items-center justify-center border border-black bg-white">
                        <span className="text-xl font-bold">S</span>
                    </div>
                    <div>
                        <div className="text-lg font-bold leading-none">Sentinel</div>
                        <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-black/50">
                            {user?.plan || "Free Plan"}
                        </div>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="p-2 space-y-4">
                {/* Main Menu */}
                <SidebarGroup>
                    <SidebarGroupLabel className="px-2 text-[10px] font-bold uppercase tracking-widest text-black/40">Main Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainMenuItems.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive(item.href)}
                                        className={`rounded-none border border-transparent transition-all duration-75 hover:border-black hover:bg-black hover:text-white data-[active=true]:border-black data-[active=true]:bg-white data-[active=true]:text-black data-[active=true]:font-bold`}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Repositories */}
                <SidebarGroup>
                    <SidebarGroupLabel className="px-2 text-[10px] font-bold uppercase tracking-widest text-black/40">Repositories</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {repositories.map((repo) => (
                                <Collapsible key={repo.id} className="group/collapsible">
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                className={`rounded-none border border-transparent hover:border-black transition-all duration-75 ${isRepoActive(repo.id) ? "font-bold" : ""}`}
                                            >
                                                <GitBranch className="h-4 w-4" />
                                                <span className="truncate">{repo.name}</span>
                                                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub className="ml-4 border-l border-black/20 pl-2 mt-1 space-y-1">
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        isActive={pathname === `/repos/${repo.id}`}
                                                        className="rounded-none h-8 text-xs hover:bg-black hover:text-white hover:border-black data-[active=true]:bg-black data-[active=true]:text-white"
                                                    >
                                                        <Link href={`/repos/${repo.id}`}>Pull Requests</Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        isActive={pathname === `/repos/${repo.id}/reviews`}
                                                        className="rounded-none h-8 text-xs hover:bg-black hover:text-white hover:border-black data-[active=true]:bg-black data-[active=true]:text-white"
                                                    >
                                                        <Link href={`/repos/${repo.id}/reviews`}>Reviews</Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        isActive={pathname === `/repos/${repo.id}/findings`}
                                                        className="rounded-none h-8 text-xs hover:bg-black hover:text-white hover:border-black data-[active=true]:bg-black data-[active=true]:text-white"
                                                    >
                                                        <Link href={`/repos/${repo.id}/findings`}>Findings</Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}
                            {repositories.length === 0 && (
                                <div className="px-4 py-6 text-center border border-dashed border-black/20">
                                    <div className="text-[10px] font-medium text-black/40 uppercase mb-2">No Repos Found</div>
                                    <Link
                                        href="/settings"
                                        className="text-[10px] font-bold border-b border-black hover:bg-black hover:text-white px-1 transition-colors"
                                    >
                                        ADD REPOSITORIES
                                    </Link>
                                </div>
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Code Review */}
                <SidebarGroup>
                    <SidebarGroupLabel className="px-2 text-[10px] font-bold uppercase tracking-widest text-black/40">Code Review</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {codeReviewItems.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive(item.href)}
                                        className="rounded-none border border-transparent hover:border-black hover:bg-black hover:text-white data-[active=true]:border-black data-[active=true]:bg-white data-[active=true]:text-black data-[active=true]:font-bold"
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Account */}
                <SidebarGroup>
                    <SidebarGroupLabel className="px-2 text-[10px] font-bold uppercase tracking-widest text-black/40">Account</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {accountItems.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive(item.href)}
                                        className="rounded-none border border-transparent hover:border-black hover:bg-black hover:text-white data-[active=true]:border-black data-[active=true]:bg-white data-[active=true]:text-black data-[active=true]:font-bold"
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-black bg-white">
                <div className="flex items-center gap-3 p-4">
                    <div className="flex h-8 w-8 items-center justify-center border border-black bg-[#F5F5F4]">
                        <span className="text-sm font-bold">
                            {user?.email?.[0]?.toUpperCase() || "U"}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="truncate text-xs font-bold leading-none">
                            {user?.email || "user@example.com"}
                        </div>
                        <div className="mt-1 text-[8px] font-bold uppercase text-black/40">
                            LOGGED IN
                        </div>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
