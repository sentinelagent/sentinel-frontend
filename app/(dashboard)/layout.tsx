import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Separator } from "@/components/ui/separator";

// Mock data - will be replaced with real data from API
const mockRepositories = [
    { id: "1", name: "frontend-app", fullName: "omkargade/frontend-app" },
    { id: "2", name: "backend-api", fullName: "omkargade/backend-api" },
];

const mockUser = {
    email: "user@example.com",
    plan: "Free Plan",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar repositories={mockRepositories} user={mockUser} />
            <SidebarInset className="bg-white">
                <header className="flex h-14 items-center gap-2 border-b border-black px-4 bg-white sticky top-0 z-10">
                    <SidebarTrigger className="rounded-none border border-black hover:bg-black hover:text-white transition-colors" />
                    <Separator orientation="vertical" className="h-6 bg-black/20" />
                </header>
                <main className="flex-1 p-6 md:p-10">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    );
}
