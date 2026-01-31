# Sentinel Frontend Dashboard Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a production-ready frontend dashboard for Sentinel AI code review system with Turbopuffer-inspired aesthetics.

**Architecture:** Next.js 16 App Router with React 19, Tailwind CSS v4, and shadcn/ui components. Repository-centric navigation with sidebar layout. Supabase auth with SSE for real-time workflow progress.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, shadcn/ui (new-york), JetBrains Mono font, Supabase Auth

**Design Reference:** `docs/plans/2026-01-31-frontend-dashboard-design.md`

**CRITICAL:** All UI components MUST use shadcn/ui. This includes Sidebar, Breadcrumb, Button, Card, Input, Badge, etc. No custom implementations of components that exist in shadcn/ui.

---

## Phase 1: Foundation & Design System

### Task 1.1: Install Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install required packages**

```bash
npm install @supabase/supabase-js @supabase/ssr zustand swr
npm install -D @types/node
```

**Step 2: Verify installation**

Run: `npm list @supabase/supabase-js zustand swr`
Expected: All packages listed with versions

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add supabase, zustand, swr dependencies"
```

---

### Task 1.2: Configure JetBrains Mono Font

**Files:**
- Modify: `app/layout.tsx`

**Step 1: Update layout with JetBrains Mono**

Replace the content of `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sentinel AI",
  description: "AI-powered automated code review system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

**Step 2: Verify font loads**

Run: `npm run dev`
Expected: Browser shows monospace font

**Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: configure JetBrains Mono as primary font"
```

---

### Task 1.3: Update Design System Colors

**Files:**
- Modify: `app/globals.css`

**Step 1: Replace globals.css with Turbopuffer-inspired design system**

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  /* Typography */
  --font-mono: var(--font-mono);

  /* Colors mapped to Tailwind */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  /* Sidebar */
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-ring: var(--sidebar-ring);

  /* Custom Sentinel colors */
  --color-accent-orange: var(--accent-orange);
  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-severity-critical: var(--severity-critical);
  --color-severity-high: var(--severity-high);
  --color-severity-medium: var(--severity-medium);
  --color-severity-low: var(--severity-low);
  --color-severity-nit: var(--severity-nit);

  /* Radius - minimal for Turbopuffer style */
  --radius-sm: 0px;
  --radius-md: 2px;
  --radius-lg: 2px;
  --radius-xl: 2px;
}

:root {
  /* Turbopuffer-inspired: minimal radius */
  --radius: 2px;

  /* Backgrounds */
  --background: #FFFFFF;
  --foreground: #000000;
  --card: #FFFFFF;
  --card-foreground: #000000;
  --popover: #FFFFFF;
  --popover-foreground: #000000;

  /* Primary: Black buttons */
  --primary: #000000;
  --primary-foreground: #FFFFFF;

  /* Secondary: White with black border */
  --secondary: #FFFFFF;
  --secondary-foreground: #000000;

  /* Muted */
  --muted: #F9FAFB;
  --muted-foreground: #6B7280;

  /* Accent */
  --accent: #F5F5F4;
  --accent-foreground: #000000;

  /* Destructive */
  --destructive: #EF4444;

  /* Borders - BLACK for Turbopuffer style */
  --border: #000000;
  --input: #000000;
  --ring: #000000;

  /* Sidebar - Light stone (for shadcn/ui Sidebar) */
  --sidebar: #F5F5F4;
  --sidebar-foreground: #000000;
  --sidebar-border: #E7E5E4;
  --sidebar-accent: #FFFFFF;
  --sidebar-accent-foreground: #000000;
  --sidebar-primary: #F97316;
  --sidebar-primary-foreground: #FFFFFF;
  --sidebar-ring: #000000;

  /* Sentinel accent colors */
  --accent-orange: #F97316;
  --success: #22C55E;
  --warning: #F59E0B;

  /* Severity colors */
  --severity-critical: #EF4444;
  --severity-high: #F97316;
  --severity-medium: #F59E0B;
  --severity-low: #6B7280;
  --severity-nit: #9CA3AF;
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-mono;
  }
}

/* Turbopuffer-style fieldset card */
.fieldset-card {
  @apply relative border border-black bg-white p-6;
}

.fieldset-card-legend {
  @apply absolute -top-3 left-4 bg-white px-2 text-sm font-medium;
}

/* Dashed border variant */
.fieldset-card-dashed {
  @apply relative border border-dashed border-black bg-white p-6;
}
```

**Step 2: Verify colors render correctly**

Run: `npm run dev`
Expected: Page shows white background, black text

**Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: implement Turbopuffer-inspired design system colors"
```

---

### Task 1.4: Install shadcn/ui Base Components

**Files:**
- Create: `components/ui/button.tsx`
- Create: `components/ui/card.tsx`
- Create: `components/ui/input.tsx`
- Create: `components/ui/badge.tsx`
- Create: `components/ui/separator.tsx`
- Create: `components/ui/skeleton.tsx`

**Step 1: Install shadcn/ui components**

```bash
npx shadcn@latest add button card input badge separator skeleton
```

**Step 2: Verify components installed**

Run: `ls components/ui/`
Expected: button.tsx, card.tsx, input.tsx, badge.tsx, separator.tsx, skeleton.tsx

**Step 3: Commit**

```bash
git add components/ui/
git commit -m "feat: add shadcn/ui base components"
```

---

### Task 1.5: Install Additional shadcn/ui Components

**Files:**
- Create: `components/ui/checkbox.tsx`
- Create: `components/ui/select.tsx`
- Create: `components/ui/tabs.tsx`
- Create: `components/ui/dialog.tsx`
- Create: `components/ui/progress.tsx`
- Create: `components/ui/table.tsx`
- Create: `components/ui/dropdown-menu.tsx`
- Create: `components/ui/tooltip.tsx`
- Create: `components/ui/textarea.tsx`
- Create: `components/ui/switch.tsx`
- Create: `components/ui/collapsible.tsx`
- Create: `components/ui/scroll-area.tsx`

**Step 1: Install remaining components**

```bash
npx shadcn@latest add checkbox select tabs dialog progress table dropdown-menu tooltip textarea switch collapsible scroll-area
```

**Step 2: Verify all components installed**

Run: `ls components/ui/ | wc -l`
Expected: 18 or more files

**Step 3: Commit**

```bash
git add components/ui/
git commit -m "feat: add remaining shadcn/ui components"
```

---

### Task 1.6: Install shadcn/ui Sidebar Component

**Files:**
- Create: `components/ui/sidebar.tsx`
- Modify: `app/layout.tsx` (adds SidebarProvider wrapper)

**Step 1: Install shadcn/ui sidebar**

```bash
npx shadcn@latest add sidebar
```

**Step 2: Verify sidebar component installed**

Run: `ls components/ui/sidebar.tsx`
Expected: File exists

**Step 3: Commit**

```bash
git add components/ui/sidebar.tsx lib/hooks/
git commit -m "feat: add shadcn/ui sidebar component"
```

---

### Task 1.7: Install shadcn/ui Breadcrumb Component

**Files:**
- Create: `components/ui/breadcrumb.tsx`

**Step 1: Install shadcn/ui breadcrumb**

```bash
npx shadcn@latest add breadcrumb
```

**Step 2: Verify breadcrumb component installed**

Run: `ls components/ui/breadcrumb.tsx`
Expected: File exists

**Step 3: Commit**

```bash
git add components/ui/breadcrumb.tsx
git commit -m "feat: add shadcn/ui breadcrumb component"
```

---

## Phase 2: Layout Components

### Task 2.1: Create App Sidebar Using shadcn/ui Sidebar

**Files:**
- Create: `components/layout/app-sidebar.tsx`

**Step 1: Create app sidebar using shadcn/ui Sidebar components**

```tsx
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
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-black">
            <span className="text-sm font-bold">S</span>
          </div>
          <div>
            <div className="font-semibold">Sentinel</div>
            <div className="text-xs text-muted-foreground">
              {user?.plan || "Free Plan"}
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    className={isActive(item.href) ? "text-accent-orange" : ""}
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
          <SidebarGroupLabel>Repositories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {repositories.map((repo) => (
                <Collapsible key={repo.id} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        className={isRepoActive(repo.id) ? "font-medium" : ""}
                      >
                        <GitBranch className="h-4 w-4" />
                        <span className="truncate">{repo.name}</span>
                        <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === `/repos/${repo.id}`}
                          >
                            <Link href={`/repos/${repo.id}`}>Pull Requests</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === `/repos/${repo.id}/reviews`}
                          >
                            <Link href={`/repos/${repo.id}/reviews`}>Reviews</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === `/repos/${repo.id}/findings`}
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
                <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                  No repositories yet.
                  <br />
                  <Link
                    href="/settings"
                    className="text-accent-orange hover:underline"
                  >
                    Add repositories
                  </Link>
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Code Review */}
        <SidebarGroup>
          <SidebarGroupLabel>Code Review</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {codeReviewItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    className={isActive(item.href) ? "text-accent-orange" : ""}
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
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    className={isActive(item.href) ? "text-accent-orange" : ""}
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

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-2 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <span className="text-sm font-medium">
              {user?.email?.[0]?.toUpperCase() || "U"}
            </span>
          </div>
          <div className="flex-1 truncate">
            <div className="truncate text-sm font-medium">
              {user?.email || "user@example.com"}
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
```

**Step 2: Verify file created**

Run: `cat components/layout/app-sidebar.tsx | head -20`
Expected: Shows component code with shadcn/ui imports

**Step 3: Commit**

```bash
git add components/layout/app-sidebar.tsx
git commit -m "feat: create app sidebar using shadcn/ui Sidebar component"
```

---

### Task 2.2: Create Dashboard Layout with SidebarProvider

**Files:**
- Create: `app/(dashboard)/layout.tsx`

**Step 1: Create dashboard layout with shadcn/ui SidebarProvider**

```tsx
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
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
        </header>
        <main className="flex-1 p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
```

**Step 2: Verify layout file created**

Run: `cat app/\(dashboard\)/layout.tsx`
Expected: Shows layout code with SidebarProvider

**Step 3: Commit**

```bash
git add app/\(dashboard\)/layout.tsx
git commit -m "feat: create dashboard layout with shadcn/ui SidebarProvider"
```

---

### Task 2.3: Create Page Header with shadcn/ui Breadcrumb

**Files:**
- Create: `components/layout/page-header.tsx`

**Step 1: Create page header component using shadcn/ui Breadcrumb**

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { Fragment } from "react";

interface BreadcrumbItemData {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  breadcrumbs?: BreadcrumbItemData[];
  title: string;
  subtitle?: string;
  className?: string;
  actions?: React.ReactNode;
}

export function PageHeader({
  breadcrumbs,
  title,
  subtitle,
  className,
  actions,
}: PageHeaderProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => (
              <Fragment key={index}>
                <BreadcrumbItem>
                  {item.href ? (
                    <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}
      <div className="flex items-center justify-between">
        <div>
          {subtitle && (
            <div className="text-sm text-muted-foreground">{subtitle}</div>
          )}
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/layout/page-header.tsx
git commit -m "feat: create page header with shadcn/ui Breadcrumb"
```

---

### Task 2.4: Create Fieldset Card Component (Turbopuffer Style)

**Files:**
- Create: `components/common/fieldset-card.tsx`

**Step 1: Create fieldset card component extending shadcn/ui Card**

```tsx
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface FieldsetCardProps {
  legend?: string;
  children: ReactNode;
  className?: string;
  dashed?: boolean;
}

export function FieldsetCard({
  legend,
  children,
  className,
  dashed = false,
}: FieldsetCardProps) {
  return (
    <Card
      className={cn(
        "relative border-black",
        dashed && "border-dashed",
        className
      )}
    >
      {legend && (
        <CardHeader className="pb-2">
          <CardTitle className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium">
            {legend}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={legend ? "pt-2" : "pt-6"}>
        {children}
      </CardContent>
    </Card>
  );
}
```

**Step 2: Commit**

```bash
git add components/common/fieldset-card.tsx
git commit -m "feat: create Turbopuffer-style fieldset card extending shadcn/ui Card"
```

---

## Phase 3: Dashboard Page

### Task 3.1: Create Stats Card Component

**Files:**
- Create: `components/dashboard/stats-card.tsx`

**Step 1: Create stats card using shadcn/ui Card**

```tsx
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    direction: "up" | "down" | "neutral";
  };
  icon?: ReactNode;
  className?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  className,
}: StatsCardProps) {
  return (
    <Card className={cn("border-black", className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="text-sm text-muted-foreground">{title}</div>
          {trend && (
            <span
              className={cn(
                "text-xs font-medium",
                trend.direction === "up" && "text-success",
                trend.direction === "down" && "text-destructive",
                trend.direction === "neutral" && "text-muted-foreground"
              )}
            >
              {trend.direction === "up" && "↑"}
              {trend.direction === "down" && "↓"}
              {trend.value}
            </span>
          )}
        </div>
        <div className="mt-2 text-3xl font-bold">{value}</div>
        {subtitle && (
          <div className="mt-1 text-sm text-muted-foreground">{subtitle}</div>
        )}
      </CardContent>
    </Card>
  );
}
```

**Step 2: Commit**

```bash
git add components/dashboard/stats-card.tsx
git commit -m "feat: create stats card using shadcn/ui Card"
```

---

### Task 3.2: Create Activity List Component

**Files:**
- Create: `components/dashboard/activity-list.tsx`

**Step 1: Create activity list**

```tsx
import { cn } from "@/lib/utils";
import { CheckCircle, AlertCircle, Clock, GitPullRequest } from "lucide-react";
import Link from "next/link";

interface ActivityItem {
  id: string;
  type: "review_completed" | "review_pending" | "review_failed" | "repo_indexed";
  title: string;
  subtitle: string;
  timestamp: string;
  href?: string;
}

interface ActivityListProps {
  items: ActivityItem[];
  className?: string;
}

const icons = {
  review_completed: CheckCircle,
  review_pending: Clock,
  review_failed: AlertCircle,
  repo_indexed: GitPullRequest,
};

const iconColors = {
  review_completed: "text-success",
  review_pending: "text-warning",
  review_failed: "text-destructive",
  repo_indexed: "text-success",
};

export function ActivityList({ items, className }: ActivityListProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => {
        const Icon = icons[item.type];
        const Wrapper = item.href ? Link : "div";
        const wrapperProps = item.href ? { href: item.href } : {};

        return (
          <Wrapper
            key={item.id}
            {...wrapperProps}
            className={cn(
              "flex items-start gap-3 p-2",
              item.href && "cursor-pointer hover:bg-muted"
            )}
          >
            <Icon className={cn("mt-0.5 h-4 w-4", iconColors[item.type])} />
            <div className="flex-1 min-w-0">
              <div className="truncate text-sm font-medium">{item.title}</div>
              <div className="truncate text-xs text-muted-foreground">
                {item.subtitle}
              </div>
            </div>
            <div className="text-xs text-muted-foreground whitespace-nowrap">
              {item.timestamp}
            </div>
          </Wrapper>
        );
      })}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/dashboard/activity-list.tsx
git commit -m "feat: create activity list component"
```

---

### Task 3.3: Create Top Repos Component

**Files:**
- Create: `components/dashboard/top-repos.tsx`

**Step 1: Create top repos component**

```tsx
import Link from "next/link";
import { cn } from "@/lib/utils";

interface RepoStats {
  id: string;
  name: string;
  prsReviewed: number;
  bugsFound: number;
}

interface TopReposProps {
  repos: RepoStats[];
  className?: string;
}

export function TopRepos({ repos, className }: TopReposProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {repos.map((repo, index) => (
        <Link
          key={repo.id}
          href={`/repos/${repo.id}`}
          className="flex items-center gap-3 p-2 hover:bg-muted"
        >
          <span className="flex h-6 w-6 items-center justify-center bg-muted text-sm font-medium">
            {index + 1}
          </span>
          <span className="flex-1 truncate text-sm font-medium">
            {repo.name}
          </span>
          <span className="text-sm text-muted-foreground">
            {repo.prsReviewed}
          </span>
          <span className="text-sm text-muted-foreground">{repo.bugsFound}</span>
        </Link>
      ))}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/dashboard/top-repos.tsx
git commit -m "feat: create top repositories component"
```

---

### Task 3.4: Create Dashboard Page

**Files:**
- Create: `app/(dashboard)/dashboard/page.tsx`

**Step 1: Create dashboard page**

```tsx
import { StatsCard } from "@/components/dashboard/stats-card";
import { ActivityList } from "@/components/dashboard/activity-list";
import { TopRepos } from "@/components/dashboard/top-repos";
import { FieldsetCard } from "@/components/common/fieldset-card";
import { PageHeader } from "@/components/layout/page-header";
import { Progress } from "@/components/ui/progress";

// Mock data - will be replaced with real API data
const stats = {
  prsReviewed: 1247,
  prsReviewedTrend: "+12%",
  bugsFound: 389,
  criticalBugs: 23,
  issuesCaptured: 156,
  avgReviewTime: "4.2 min",
};

const recentActivity = [
  {
    id: "1",
    type: "review_completed" as const,
    title: "Reviewed PR",
    subtitle: "frontend-app #421",
    timestamp: "10:34 AM",
    href: "/repos/1/pr/421/review/1",
  },
  {
    id: "2",
    type: "review_pending" as const,
    title: "Found potential bug",
    subtitle: "backend-api #189",
    timestamp: "09:15 AM",
    href: "/repos/2/pr/189/review/1",
  },
  {
    id: "3",
    type: "review_completed" as const,
    title: "Reviewed PR",
    subtitle: "shared-utils #67",
    timestamp: "Yesterday",
    href: "/repos/3/pr/67/review/1",
  },
];

const topRepos = [
  { id: "1", name: "frontend-app", prsReviewed: 423, bugsFound: 89 },
  { id: "2", name: "backend-api", prsReviewed: 312, bugsFound: 67 },
  { id: "3", name: "shared-utils", prsReviewed: 189, bugsFound: 34 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader subtitle="Dashboard" title="Project Overview" />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="PRs Reviewed"
          value={stats.prsReviewed.toLocaleString()}
          trend={{ value: stats.prsReviewedTrend, direction: "up" }}
          subtitle="View analytics →"
        />
        <StatsCard
          title="Bugs Found"
          value={stats.bugsFound}
          subtitle={`${stats.criticalBugs} critical`}
        />
        <StatsCard
          title="Issues Captured"
          value={stats.issuesCaptured}
          subtitle="Action required"
        />
        <StatsCard
          title="Avg Review Time"
          value={stats.avgReviewTime}
          trend={{ value: "improving", direction: "up" }}
        />
      </div>

      {/* Review Progress */}
      <FieldsetCard legend="Review Progress">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">65% Complete</span>
            <span className="text-accent-orange">8 PRs pending</span>
          </div>
          <Progress value={65} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Started: Jan 15</span>
            <span>Current: Jan 29</span>
            <span>Target: Feb 15</span>
          </div>
        </div>
      </FieldsetCard>

      {/* Activity & Top Repos */}
      <div className="grid gap-6 lg:grid-cols-2">
        <FieldsetCard legend="Recent Activity">
          <ActivityList items={recentActivity} />
        </FieldsetCard>

        <FieldsetCard legend="Top Repositories">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span></span>
            <span className="w-12 text-right">PRs</span>
            <span className="w-12 text-right">Bugs</span>
          </div>
          <TopRepos repos={topRepos} />
        </FieldsetCard>
      </div>
    </div>
  );
}
```

**Step 2: Verify page renders**

Run: `npm run dev`
Navigate to: `http://localhost:3000/dashboard`
Expected: Dashboard with stats cards, progress bar, activity list, top repos

**Step 3: Commit**

```bash
git add app/\(dashboard\)/dashboard/page.tsx
git commit -m "feat: create dashboard overview page"
```

---

## Phase 4: Authentication Pages

### Task 4.1: Create Login Page

**Files:**
- Create: `app/(auth)/login/page.tsx`
- Create: `app/(auth)/layout.tsx`

**Step 1: Create auth layout**

```tsx
// app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      {children}
    </div>
  );
}
```

**Step 2: Create login page using shadcn/ui components**

```tsx
// app/(auth)/login/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Github } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md space-y-6">
      {/* Logo */}
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-black">
          <span className="text-xl font-bold">S</span>
        </div>
        <h1 className="mt-4 text-xl font-bold">Sentinel</h1>
      </div>

      {/* Login Form */}
      <Card className="border-dashed border-black">
        <CardHeader>
          <CardTitle className="text-lg">Sign in</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <Button variant="secondary" className="w-full gap-2">
            <Github className="h-4 w-4" />
            Continue with GitHub
          </Button>
        </CardContent>
      </Card>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
```

**Step 3: Install shadcn/ui Label component if not present**

```bash
npx shadcn@latest add label
```

**Step 4: Commit**

```bash
git add app/\(auth\)/layout.tsx app/\(auth\)/login/page.tsx components/ui/label.tsx
git commit -m "feat: create login page with shadcn/ui components"
```

---

### Task 4.2: Create Signup Page

**Files:**
- Create: `app/(auth)/signup/page.tsx`

**Step 1: Create signup page using shadcn/ui components**

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Github } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="w-full max-w-md space-y-6">
      {/* Logo */}
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-black">
          <span className="text-xl font-bold">S</span>
        </div>
        <h1 className="mt-4 text-xl font-bold">Sentinel</h1>
      </div>

      {/* Signup Form */}
      <Card className="border-dashed border-black">
        <CardHeader>
          <CardTitle className="text-lg">Create account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" className="w-full">
              Create account
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <Button variant="secondary" className="w-full gap-2">
            <Github className="h-4 w-4" />
            Continue with GitHub
          </Button>
        </CardContent>
      </Card>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add app/\(auth\)/signup/page.tsx
git commit -m "feat: create signup page with shadcn/ui components"
```

---

## Phase 5: Settings & Onboarding

### Task 5.1: Create Step Indicator Component

**Files:**
- Create: `components/settings/step-indicator.tsx`

**Step 1: Create step indicator using shadcn/ui primitives**

```tsx
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  id: number;
  label: string;
  completed?: boolean;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function StepIndicator({
  steps,
  currentStep,
  className,
}: StepIndicatorProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-1 items-center">
          {/* Step Circle */}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2",
                step.completed
                  ? "border-success bg-success text-white"
                  : currentStep === step.id
                  ? "border-accent-orange bg-white text-accent-orange"
                  : "border-muted bg-white text-muted-foreground"
              )}
            >
              {step.completed ? (
                <Check className="h-5 w-5" />
              ) : (
                <span className="text-sm font-medium">{step.id}</span>
              )}
            </div>
            <span
              className={cn(
                "mt-2 text-xs",
                currentStep === step.id || step.completed
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {step.label}
            </span>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={cn(
                "mx-2 h-0.5 flex-1",
                step.completed ? "bg-success" : "bg-muted"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/settings/step-indicator.tsx
git commit -m "feat: create step indicator component for onboarding"
```

---

### Task 5.2: Create Indexing Progress Component

**Files:**
- Create: `components/settings/indexing-progress.tsx`

**Step 1: Create indexing progress with SSE support using shadcn/ui Card**

```tsx
"use client";

import { cn } from "@/lib/utils";
import { Check, X, Loader2, Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StepStatus = "pending" | "in_progress" | "completed" | "failed";

interface IndexingStep {
  id: string;
  label: string;
  status: StepStatus;
  message?: string;
}

interface IndexingProgressProps {
  repoName: string;
  steps: IndexingStep[];
  totalSteps: number;
  completedSteps: number;
  status: "idle" | "running" | "completed" | "failed";
  className?: string;
}

const statusIcons = {
  pending: Circle,
  in_progress: Loader2,
  completed: Check,
  failed: X,
};

const statusColors = {
  pending: "text-muted-foreground",
  in_progress: "text-accent-orange",
  completed: "text-success",
  failed: "text-destructive",
};

export function IndexingProgress({
  repoName,
  steps,
  totalSteps,
  completedSteps,
  status,
  className,
}: IndexingProgressProps) {
  return (
    <Card className={cn("border-black", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full border border-black" />
            <div>
              <CardTitle className="text-base">{repoName} Indexing</CardTitle>
              <div className="text-sm text-muted-foreground">
                {status === "completed"
                  ? "Indexing Completed"
                  : status === "failed"
                  ? "Indexing Failed"
                  : "Indexing in progress..."}
              </div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {completedSteps}/{totalSteps} Steps
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {steps.map((step) => {
            const Icon = statusIcons[step.status];
            return (
              <div key={step.id} className="flex items-center gap-3">
                <Icon
                  className={cn(
                    "h-4 w-4",
                    statusColors[step.status],
                    step.status === "in_progress" && "animate-spin"
                  )}
                />
                <span
                  className={cn(
                    "text-sm",
                    step.status === "completed" && "text-success",
                    step.status === "failed" && "text-destructive",
                    step.status === "in_progress" && "font-medium"
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
```

**Step 2: Commit**

```bash
git add components/settings/indexing-progress.tsx
git commit -m "feat: create indexing progress component with shadcn/ui Card"
```

---

### Task 5.3: Create General Settings Page with Wizard

**Files:**
- Create: `app/(dashboard)/settings/page.tsx`

**Step 1: Create settings page with wizard using shadcn/ui components**

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StepIndicator } from "@/components/settings/step-indicator";
import { PageHeader } from "@/components/layout/page-header";
import { Github, ChevronLeft, ChevronRight } from "lucide-react";

const STEPS = [
  { id: 1, label: "Connect GitHub" },
  { id: 2, label: "Select Repositories" },
  { id: 3, label: "Custom Context" },
  { id: 4, label: "Index Repos" },
];

// Mock repositories
const mockRepos = [
  { id: "1", name: "user/frontend-app", indexed: false },
  { id: "2", name: "user/backend-api", indexed: true },
  { id: "3", name: "user/shared-utils", indexed: false },
  { id: "4", name: "user/mobile-app", indexed: false },
  { id: "5", name: "user/docs-site", indexed: true },
];

export default function SettingsPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRepos, setSelectedRepos] = useState<string[]>([]);
  const [customContext, setCustomContext] = useState("");

  const steps = STEPS.map((step) => ({
    ...step,
    completed: step.id < currentStep,
  }));

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const toggleRepo = (repoId: string) => {
    setSelectedRepos((prev) =>
      prev.includes(repoId)
        ? prev.filter((id) => id !== repoId)
        : [...prev, repoId]
    );
  };

  return (
    <div className="space-y-8">
      <PageHeader subtitle="Settings" title="AI Code Review Agent" />

      {/* Step Indicator */}
      <StepIndicator steps={steps} currentStep={currentStep} />

      {/* Step Content */}
      <Card className="border-black">
        <CardHeader>
          <CardTitle>{STEPS[currentStep - 1].label}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Step 1: Connect GitHub */}
          {currentStep === 1 && (
            <div className="space-y-6 text-center">
              <p className="text-muted-foreground">
                Connect your GitHub account to allow Sentinel AI to access and
                review your repositories
              </p>
              <div className="flex justify-center">
                <Github className="h-16 w-16 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Click the button below to authenticate with GitHub
              </p>
              <Button className="gap-2">
                <Github className="h-4 w-4" />
                Connect GitHub
              </Button>
            </div>
          )}

          {/* Step 2: Select Repositories */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Choose which repositories you want Sentinel AI to index and review
              </p>
              <Input placeholder="Search repositories..." />
              <Card className="border-black">
                <CardContent className="p-0">
                  {mockRepos.map((repo) => (
                    <div
                      key={repo.id}
                      className="flex items-center justify-between border-b border-muted p-3 last:border-b-0"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={repo.id}
                          checked={selectedRepos.includes(repo.id)}
                          onCheckedChange={() => toggleRepo(repo.id)}
                        />
                        <Label htmlFor={repo.id} className="text-sm cursor-pointer">
                          <Github className="mr-2 inline h-4 w-4" />
                          {repo.name}
                        </Label>
                      </div>
                      {repo.indexed && (
                        <Badge variant="secondary" className="bg-success/10 text-success">
                          Indexed
                        </Badge>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
              <p className="text-sm text-muted-foreground">
                {selectedRepos.length} of {mockRepos.length} repositories selected
              </p>
            </div>
          )}

          {/* Step 3: Custom Context */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Add repository-specific details to help the AI understand your
                codebase better
              </p>
              <div className="space-y-2">
                <Label htmlFor="customContext">Custom Instructions</Label>
                <Textarea
                  id="customContext"
                  className="min-h-[120px]"
                  placeholder="Add any specific coding standards, conventions, or context about your repositories that would help the AI provide better reviews..."
                  value={customContext}
                  onChange={(e) => setCustomContext(e.target.value)}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Example: &quot;We use TypeScript strict mode. Prefer functional
                components over class components. Follow Airbnb style guide.&quot;
              </p>
              <Card className="border-black">
                <CardContent className="p-3">
                  <div className="text-sm font-medium">Selected repositories:</div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {selectedRepos.length > 0 ? (
                      mockRepos
                        .filter((r) => selectedRepos.includes(r.id))
                        .map((repo) => (
                          <Badge key={repo.id} variant="secondary">
                            {repo.name.split("/")[1]}
                          </Badge>
                        ))
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        No repositories selected
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 4: Index Repos */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Index selected repositories to enable AI code review
              </p>
              <Card className="border-black bg-success/5">
                <CardContent className="p-3">
                  <div className="text-sm font-medium">Already Indexed</div>
                  <div className="mt-1 flex gap-2">
                    {mockRepos
                      .filter((r) => r.indexed)
                      .map((repo) => (
                        <Badge key={repo.id} variant="secondary" className="bg-success/10 text-success">
                          {repo.name.split("/")[1]}
                        </Badge>
                      ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-black">
                <CardContent className="p-3">
                  <div className="text-sm font-medium">Repositories to Index</div>
                  <div className="mt-1 flex gap-2">
                    {selectedRepos.length > 0 ? (
                      mockRepos
                        .filter((r) => selectedRepos.includes(r.id) && !r.indexed)
                        .map((repo) => (
                          <Badge key={repo.id} variant="secondary">
                            {repo.name.split("/")[1]}
                          </Badge>
                        ))
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        No new repositories to index
                      </span>
                    )}
                  </div>
                  <Button className="mt-4 gap-2">
                    <Github className="h-4 w-4" />
                    Start Indexing
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between border-t border-muted pt-4">
            <Button
              variant="secondary"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <Button onClick={handleNext} disabled={currentStep === 4} className="gap-1">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

**Step 2: Verify page renders**

Run: `npm run dev`
Navigate to: `http://localhost:3000/settings`
Expected: Settings page with wizard steps

**Step 3: Commit**

```bash
git add app/\(dashboard\)/settings/page.tsx
git commit -m "feat: create general settings page with shadcn/ui components"
```

---

## Phase 6: Repository & Review Pages

### Task 6.1: Create Severity Badge Component

**Files:**
- Create: `components/review/severity-badge.tsx`

**Step 1: Create severity badge using shadcn/ui Badge**

```tsx
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "NIT";

interface SeverityBadgeProps {
  severity: Severity;
  className?: string;
}

const severityStyles: Record<Severity, string> = {
  CRITICAL: "bg-severity-critical text-white border-severity-critical",
  HIGH: "bg-transparent border-severity-high text-severity-high",
  MEDIUM: "bg-transparent border-severity-medium text-severity-medium",
  LOW: "bg-transparent border-severity-low text-severity-low",
  NIT: "bg-transparent border-severity-nit text-severity-nit",
};

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(severityStyles[severity], className)}
    >
      {severity}
    </Badge>
  );
}
```

**Step 2: Commit**

```bash
git add components/review/severity-badge.tsx
git commit -m "feat: create severity badge using shadcn/ui Badge"
```

---

### Task 6.2: Create Finding Card Component

**Files:**
- Create: `components/review/finding-card.tsx`

**Step 1: Create finding card using shadcn/ui Card**

```tsx
import { SeverityBadge } from "./severity-badge";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "NIT";
type FindingType = "bug" | "security" | "performance" | "style" | "design" | "docs";

interface FindingCardProps {
  filePath: string;
  lineNumber: number;
  severity: Severity;
  findingType: FindingType;
  message: string;
  suggestion?: string;
  className?: string;
}

export function FindingCard({
  filePath,
  lineNumber,
  severity,
  findingType,
  message,
  suggestion,
  className,
}: FindingCardProps) {
  return (
    <Card className={cn("border-black", className)}>
      {/* Header */}
      <CardHeader className="bg-muted/30 px-4 py-2">
        <code className="text-sm">
          {filePath}:{lineNumber}
        </code>
      </CardHeader>

      <CardContent className="p-4">
        {/* Badge Row */}
        <div className="flex items-center gap-2 mb-3">
          <SeverityBadge severity={severity} />
          <Badge variant="outline">{findingType}</Badge>
        </div>

        {/* Content */}
        <p className="text-sm">{message}</p>

        {suggestion && (
          <div className="mt-3">
            <pre className="overflow-x-auto bg-muted p-3 text-sm rounded">
              <code>{suggestion}</code>
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

**Step 2: Commit**

```bash
git add components/review/finding-card.tsx
git commit -m "feat: create finding card using shadcn/ui Card"
```

---

### Task 6.3: Create PR Card Component

**Files:**
- Create: `components/repository/pr-card.tsx`

**Step 1: Create PR card using shadcn/ui Card and Badge**

```tsx
import Link from "next/link";
import { SeverityBadge } from "@/components/review/severity-badge";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ReviewStatus = "completed" | "pending" | "failed";

interface PRCardProps {
  repoId: string;
  prNumber: number;
  title: string;
  author: string;
  createdAt: string;
  baseBranch: string;
  headBranch: string;
  reviewStatus?: ReviewStatus;
  bugCount?: number;
  highestSeverity?: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "NIT";
  nitCount?: number;
  className?: string;
}

const statusStyles: Record<ReviewStatus, string> = {
  completed: "bg-success text-white border-success",
  pending: "bg-warning text-white border-warning",
  failed: "bg-destructive text-white border-destructive",
};

const statusLabels: Record<ReviewStatus, string> = {
  completed: "Review Complete",
  pending: "Review Pending",
  failed: "Review Failed",
};

export function PRCard({
  repoId,
  prNumber,
  title,
  author,
  createdAt,
  baseBranch,
  headBranch,
  reviewStatus,
  bugCount,
  highestSeverity,
  nitCount,
  className,
}: PRCardProps) {
  return (
    <Link href={`/repos/${repoId}/pr/${prNumber}`}>
      <Card
        className={cn(
          "border-black hover:bg-muted/30 transition-colors cursor-pointer",
          className
        )}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-muted-foreground">#{prNumber}</span>
                <span className="font-medium">{title}</span>
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                opened {createdAt} by @{author}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                base: {baseBranch} ← head: {headBranch}
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="mt-3 flex flex-wrap gap-2">
            {reviewStatus && (
              <Badge className={statusStyles[reviewStatus]}>
                {statusLabels[reviewStatus]}
              </Badge>
            )}
            {bugCount !== undefined && bugCount > 0 && highestSeverity && (
              <Badge variant="outline" className="border-black gap-1">
                {bugCount} bugs
                <SeverityBadge severity={highestSeverity} />
              </Badge>
            )}
            {nitCount !== undefined && nitCount > 0 && (
              <Badge variant="outline" className="border-muted text-muted-foreground">
                {nitCount} nits
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
```

**Step 2: Commit**

```bash
git add components/repository/pr-card.tsx
git commit -m "feat: create PR card using shadcn/ui Card and Badge"
```

---

### Task 6.4: Create Repository Detail Page

**Files:**
- Create: `app/(dashboard)/repos/[id]/page.tsx`

**Step 1: Create repository detail page using shadcn/ui components**

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";
import { PRCard } from "@/components/repository/pr-card";
import { RefreshCw, Search, Star, GitFork } from "lucide-react";

// Mock data
const mockRepo = {
  id: "1",
  name: "frontend-app",
  fullName: "omkargade/frontend-app",
  stars: 142,
  forks: 23,
  lastIndexedAt: "2 hours ago",
};

const mockPRs = [
  {
    prNumber: 421,
    title: "Add user authentication flow",
    author: "dakshgup",
    createdAt: "2 hours ago",
    baseBranch: "main",
    headBranch: "feature/auth",
    reviewStatus: "completed" as const,
    bugCount: 3,
    highestSeverity: "HIGH" as const,
    nitCount: 2,
  },
  {
    prNumber: 420,
    title: "Fix pagination in dashboard",
    author: "omkar",
    createdAt: "1 day ago",
    baseBranch: "main",
    headBranch: "fix/pagination",
    reviewStatus: "pending" as const,
    bugCount: 1,
    highestSeverity: "LOW" as const,
    nitCount: 0,
  },
];

export default function RepositoryDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const breadcrumbs = [
    { label: "Repositories", href: "/dashboard" },
    { label: mockRepo.name },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumbs={breadcrumbs}
        title={mockRepo.name}
        subtitle={mockRepo.fullName}
      />

      {/* Repo Header Card */}
      <Card className="border-black">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black">
                <span className="font-bold">
                  {mockRepo.name[0].toUpperCase()}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    {mockRepo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="h-4 w-4" />
                    {mockRepo.forks}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">
                Last indexed: {mockRepo.lastIndexedAt}
              </div>
              <Button variant="secondary" size="sm" className="mt-2 gap-1">
                <RefreshCw className="h-4 w-4" />
                Re-index
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PR List Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Pull Requests</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search PRs..." className="pl-8 w-64" />
          </div>
          <Button variant="secondary">Filter</Button>
        </div>
      </div>

      {/* PR List */}
      <div className="space-y-4">
        {mockPRs.map((pr) => (
          <PRCard
            key={pr.prNumber}
            repoId={params.id}
            {...pr}
          />
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add app/\(dashboard\)/repos/\[id\]/page.tsx
git commit -m "feat: create repository detail page with shadcn/ui components"
```

---

### Task 6.5: Create Review Detail Page

**Files:**
- Create: `app/(dashboard)/repos/[id]/pr/[number]/review/[reviewId]/page.tsx`

**Step 1: Create review detail page using shadcn/ui components**

```tsx
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FindingCard } from "@/components/review/finding-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ExternalLink } from "lucide-react";

// Mock data
const mockReview = {
  id: "1",
  status: "completed",
  published: true,
  duration: "2m 34s",
  findingsCount: 5,
  model: "claude-3-opus",
  headSha: "a1b2c3d",
  githubReviewId: 123456,
  pr: {
    number: 421,
    title: "Add user authentication flow",
    repoName: "frontend-app",
  },
};

const mockFindings = [
  {
    id: "1",
    filePath: "src/auth/login.ts",
    lineNumber: 42,
    severity: "HIGH" as const,
    findingType: "bug" as const,
    message: "Missing null check before accessing user object",
    suggestion: `// Suggested
const name = user?.name ?? 'Anonymous';`,
  },
  {
    id: "2",
    filePath: "src/auth/session.ts",
    lineNumber: 87,
    severity: "CRITICAL" as const,
    findingType: "security" as const,
    message:
      "JWT token stored in localStorage is vulnerable to XSS attacks. Use httpOnly cookies instead.",
  },
  {
    id: "3",
    filePath: "src/auth/utils.ts",
    lineNumber: 12,
    severity: "NIT" as const,
    findingType: "style" as const,
    message: "Consider using const instead of let for variables that are never reassigned.",
  },
];

export default function ReviewDetailPage({
  params,
}: {
  params: { id: string; number: string; reviewId: string };
}) {
  const breadcrumbs = [
    { label: "Repositories", href: "/dashboard" },
    { label: mockReview.pr.repoName, href: `/repos/${params.id}` },
    { label: `PR #${mockReview.pr.number}`, href: `/repos/${params.id}/pr/${params.number}` },
    { label: "Review" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumbs={breadcrumbs}
        title={mockReview.pr.title}
      />

      {/* Review Summary */}
      <Card className="border-black">
        <CardHeader>
          <CardTitle>Review Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <div className="text-sm text-muted-foreground">Status</div>
              <div className="mt-1 flex items-center gap-2">
                <Badge className="bg-success text-white">
                  <Check className="mr-1 h-3 w-3" />
                  {mockReview.status}
                </Badge>
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Published</div>
              <div className="mt-1 font-medium">
                {mockReview.published ? "Yes" : "No"}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Duration</div>
              <div className="mt-1 font-medium">{mockReview.duration}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Findings</div>
              <div className="mt-1 font-medium">{mockReview.findingsCount} total</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Model</div>
              <div className="mt-1 font-medium font-mono text-sm">
                {mockReview.model}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Head SHA</div>
              <div className="mt-1 font-medium font-mono text-sm">
                {mockReview.headSha}
              </div>
            </div>
          </div>
          {mockReview.githubReviewId && (
            <Button variant="secondary" size="sm" className="mt-4 gap-1">
              <ExternalLink className="h-4 w-4" />
              View on GitHub
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Findings Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Findings</h2>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            All
          </Button>
          <Button variant="secondary" size="sm">
            Severity
          </Button>
          <Button variant="secondary" size="sm">
            Type
          </Button>
        </div>
      </div>

      {/* Findings List */}
      <div className="space-y-4">
        {mockFindings.map((finding) => (
          <FindingCard key={finding.id} {...finding} />
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add "app/(dashboard)/repos/[id]/pr/[number]/review/[reviewId]/page.tsx"
git commit -m "feat: create review detail page with shadcn/ui components"
```

---

## Phase 7: Redirect & Final Setup

### Task 7.1: Create Root Redirect

**Files:**
- Modify: `app/page.tsx`

**Step 1: Update root page to redirect to dashboard**

```tsx
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard");
}
```

**Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: redirect root to dashboard"
```

---

### Task 7.2: Create Component Index Files

**Files:**
- Create: `components/layout/index.ts`
- Create: `components/dashboard/index.ts`
- Create: `components/common/index.ts`
- Create: `components/review/index.ts`
- Create: `components/repository/index.ts`
- Create: `components/settings/index.ts`

**Step 1: Create index files for clean imports**

```typescript
// components/layout/index.ts
export * from "./app-sidebar";
export * from "./page-header";

// components/dashboard/index.ts
export * from "./stats-card";
export * from "./activity-list";
export * from "./top-repos";

// components/common/index.ts
export * from "./fieldset-card";

// components/review/index.ts
export * from "./severity-badge";
export * from "./finding-card";

// components/repository/index.ts
export * from "./pr-card";

// components/settings/index.ts
export * from "./step-indicator";
export * from "./indexing-progress";
```

**Step 2: Commit**

```bash
git add components/*/index.ts
git commit -m "feat: add component index files for clean imports"
```

---

### Task 7.3: Final Verification

**Step 1: Run development server**

```bash
npm run dev
```

**Step 2: Verify all pages render**

Test these URLs:
- `http://localhost:3000/` → Should redirect to `/dashboard`
- `http://localhost:3000/dashboard` → Dashboard with stats
- `http://localhost:3000/login` → Login page
- `http://localhost:3000/signup` → Signup page
- `http://localhost:3000/settings` → Settings wizard
- `http://localhost:3000/repos/1` → Repository detail

**Step 3: Run build to check for errors**

```bash
npm run build
```

Expected: Build succeeds with no errors

**Step 4: Final commit**

```bash
git add -A
git commit -m "chore: final verification and cleanup"
```

---

## Summary

### shadcn/ui Components Used

All UI components strictly use shadcn/ui:
- **Sidebar**: `@/components/ui/sidebar` with SidebarProvider, SidebarMenu, SidebarMenuItem, etc.
- **Breadcrumb**: `@/components/ui/breadcrumb` with BreadcrumbList, BreadcrumbItem, etc.
- **Card**: `@/components/ui/card` for all card layouts
- **Badge**: `@/components/ui/badge` for all badges including severity
- **Button**: `@/components/ui/button` for all buttons
- **Input**: `@/components/ui/input` for all inputs
- **Label**: `@/components/ui/label` for form labels
- **Checkbox**: `@/components/ui/checkbox` for checkboxes
- **Textarea**: `@/components/ui/textarea` for text areas
- **Progress**: `@/components/ui/progress` for progress bars
- **Separator**: `@/components/ui/separator` for dividers
- **Collapsible**: `@/components/ui/collapsible` for expandable sections

### Completed Components

**Layout:**
- `components/layout/app-sidebar.tsx` - Main navigation using shadcn/ui Sidebar
- `components/layout/page-header.tsx` - Page header with shadcn/ui Breadcrumb

**Dashboard:**
- `components/dashboard/stats-card.tsx` - Statistics using shadcn/ui Card
- `components/dashboard/activity-list.tsx` - Recent activity
- `components/dashboard/top-repos.tsx` - Repository rankings

**Common:**
- `components/common/fieldset-card.tsx` - Turbopuffer-style card extending shadcn/ui Card

**Review:**
- `components/review/severity-badge.tsx` - Severity using shadcn/ui Badge
- `components/review/finding-card.tsx` - Code review findings using shadcn/ui Card

**Repository:**
- `components/repository/pr-card.tsx` - PR list items using shadcn/ui Card

**Settings:**
- `components/settings/step-indicator.tsx` - Wizard progress
- `components/settings/indexing-progress.tsx` - SSE progress using shadcn/ui Card

### Completed Pages

- `/dashboard` - Overview with stats
- `/login` - Authentication
- `/signup` - Registration
- `/settings` - Onboarding wizard
- `/repos/[id]` - Repository detail with PR list
- `/repos/[id]/pr/[number]/review/[reviewId]` - Review with findings

### Next Phase (Not in this plan)

1. Supabase authentication integration
2. API client setup with SWR
3. SSE hook implementation for real-time updates
4. Activity feed page
5. Analytics page with charts
6. Findings explorer page
7. Review settings page
8. Custom context management page

---

**Plan complete and saved to `docs/plans/2026-01-31-sentinel-dashboard-implementation.md`**

Two execution options:

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

Which approach?
