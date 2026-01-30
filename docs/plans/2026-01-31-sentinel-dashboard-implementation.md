# Sentinel Frontend Dashboard Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a production-ready frontend dashboard for Sentinel AI code review system with Turbopuffer-inspired aesthetics.

**Architecture:** Next.js 16 App Router with React 19, Tailwind CSS v4, and shadcn/ui components. Repository-centric navigation with sidebar layout. Supabase auth with SSE for real-time workflow progress.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, shadcn/ui (new-york), JetBrains Mono font, Supabase Auth

**Design Reference:** `docs/plans/2026-01-31-frontend-dashboard-design.md`

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

  /* Sidebar - Light stone */
  --sidebar: #F5F5F4;
  --sidebar-foreground: #000000;
  --sidebar-border: #E7E5E4;
  --sidebar-accent: #FFFFFF;
  --sidebar-accent-foreground: #000000;

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

## Phase 2: Layout Components

### Task 2.1: Create Sidebar Component

**Files:**
- Create: `components/layout/sidebar.tsx`

**Step 1: Create sidebar component**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Activity,
  Settings,
  BarChart3,
  FileText,
  ChevronDown,
  ChevronRight,
  GitBranch,
} from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Repository {
  id: string;
  name: string;
  fullName: string;
}

interface SidebarProps {
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

export function Sidebar({ repositories = [], user }: SidebarProps) {
  const pathname = usePathname();
  const [expandedRepos, setExpandedRepos] = useState<string[]>([]);

  const toggleRepo = (repoId: string) => {
    setExpandedRepos((prev) =>
      prev.includes(repoId)
        ? prev.filter((id) => id !== repoId)
        : [...prev, repoId]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isRepoActive = (repoId: string) => pathname.startsWith(`/repos/${repoId}`);

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-60 border-r border-sidebar-border bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="border-b border-sidebar-border p-4">
          <div className="flex items-center gap-2">
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
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          {/* Main Menu */}
          <div className="mb-6">
            <div className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Main Menu
            </div>
            <nav className="space-y-1">
              {mainMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors",
                    isActive(item.href)
                      ? "bg-white font-medium text-accent-orange"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Repositories */}
          <div className="mb-6">
            <div className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Repositories
            </div>
            <nav className="space-y-1">
              {repositories.map((repo) => (
                <Collapsible
                  key={repo.id}
                  open={expandedRepos.includes(repo.id)}
                  onOpenChange={() => toggleRepo(repo.id)}
                >
                  <CollapsibleTrigger
                    className={cn(
                      "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors",
                      isRepoActive(repo.id)
                        ? "bg-white font-medium"
                        : "text-sidebar-foreground hover:bg-sidebar-accent"
                    )}
                  >
                    {expandedRepos.includes(repo.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    <GitBranch className="h-4 w-4" />
                    <span className="truncate">{repo.name}</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-6 space-y-1 pt-1">
                    <Link
                      href={`/repos/${repo.id}`}
                      className={cn(
                        "block rounded-sm px-2 py-1 text-sm",
                        pathname === `/repos/${repo.id}`
                          ? "bg-white font-medium text-accent-orange"
                          : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      )}
                    >
                      Pull Requests
                    </Link>
                    <Link
                      href={`/repos/${repo.id}/reviews`}
                      className={cn(
                        "block rounded-sm px-2 py-1 text-sm",
                        pathname === `/repos/${repo.id}/reviews`
                          ? "bg-white font-medium text-accent-orange"
                          : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      )}
                    >
                      Reviews
                    </Link>
                    <Link
                      href={`/repos/${repo.id}/findings`}
                      className={cn(
                        "block rounded-sm px-2 py-1 text-sm",
                        pathname === `/repos/${repo.id}/findings`
                          ? "bg-white font-medium text-accent-orange"
                          : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      )}
                    >
                      Findings
                    </Link>
                  </CollapsibleContent>
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
            </nav>
          </div>

          {/* Code Review */}
          <div className="mb-6">
            <div className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Code Review
            </div>
            <nav className="space-y-1">
              {codeReviewItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors",
                    isActive(item.href)
                      ? "bg-white font-medium text-accent-orange"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Account */}
          <div className="mb-6">
            <div className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Account
            </div>
            <nav className="space-y-1">
              {accountItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors",
                    isActive(item.href)
                      ? "bg-white font-medium text-accent-orange"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </ScrollArea>

        {/* User Profile */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-2">
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
        </div>
      </div>
    </aside>
  );
}
```

**Step 2: Verify file created**

Run: `cat components/layout/sidebar.tsx | head -20`
Expected: Shows component code

**Step 3: Commit**

```bash
git add components/layout/sidebar.tsx
git commit -m "feat: create sidebar navigation component"
```

---

### Task 2.2: Create Dashboard Layout

**Files:**
- Create: `app/(dashboard)/layout.tsx`

**Step 1: Create dashboard layout with sidebar**

```tsx
import { Sidebar } from "@/components/layout/sidebar";

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
    <div className="min-h-screen bg-background">
      <Sidebar repositories={mockRepositories} user={mockUser} />
      <main className="ml-60 min-h-screen p-8">{children}</main>
    </div>
  );
}
```

**Step 2: Verify layout file created**

Run: `cat app/\(dashboard\)/layout.tsx`
Expected: Shows layout code

**Step 3: Commit**

```bash
git add app/\(dashboard\)/layout.tsx
git commit -m "feat: create dashboard layout with sidebar"
```

---

### Task 2.3: Create Breadcrumb Component

**Files:**
- Create: `components/layout/breadcrumb.tsx`

**Step 1: Create breadcrumb component**

```tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center gap-1 text-sm", className)}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          {index > 0 && (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-foreground">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
```

**Step 2: Commit**

```bash
git add components/layout/breadcrumb.tsx
git commit -m "feat: create breadcrumb navigation component"
```

---

### Task 2.4: Create Fieldset Card Component (Turbopuffer Style)

**Files:**
- Create: `components/common/fieldset-card.tsx`

**Step 1: Create fieldset card component**

```tsx
import { cn } from "@/lib/utils";
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
    <div
      className={cn(
        "relative border bg-white p-6",
        dashed ? "border-dashed" : "border-solid",
        "border-black",
        className
      )}
    >
      {legend && (
        <div className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium">
          {legend}
        </div>
      )}
      {children}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/common/fieldset-card.tsx
git commit -m "feat: create Turbopuffer-style fieldset card component"
```

---

## Phase 3: Dashboard Page

### Task 3.1: Create Stats Card Component

**Files:**
- Create: `components/dashboard/stats-card.tsx`

**Step 1: Create stats card**

```tsx
import { cn } from "@/lib/utils";
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
    <div className={cn("border border-black bg-white p-4", className)}>
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
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/dashboard/stats-card.tsx
git commit -m "feat: create stats card component"
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
      {/* Header */}
      <div>
        <div className="text-sm text-muted-foreground">Dashboard</div>
        <h1 className="text-2xl font-bold">Project Overview</h1>
      </div>

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

**Step 2: Create login page**

```tsx
// app/(auth)/login/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldsetCard } from "@/components/common/fieldset-card";
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
      <FieldsetCard legend="Sign in" dashed>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="mt-1"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="mt-1"
            />
          </div>

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-black" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-muted-foreground">or</span>
          </div>
        </div>

        <Button variant="secondary" className="w-full gap-2">
          <Github className="h-4 w-4" />
          Continue with GitHub
        </Button>
      </FieldsetCard>

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

**Step 3: Commit**

```bash
git add app/\(auth\)/layout.tsx app/\(auth\)/login/page.tsx
git commit -m "feat: create login page with Turbopuffer-style form"
```

---

### Task 4.2: Create Signup Page

**Files:**
- Create: `app/(auth)/signup/page.tsx`

**Step 1: Create signup page**

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldsetCard } from "@/components/common/fieldset-card";
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
      <FieldsetCard legend="Create account" dashed>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="mt-1"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="mt-1"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="mt-1"
            />
          </div>

          <Button type="submit" className="w-full">
            Create account
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-black" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-muted-foreground">or</span>
          </div>
        </div>

        <Button variant="secondary" className="w-full gap-2">
          <Github className="h-4 w-4" />
          Continue with GitHub
        </Button>
      </FieldsetCard>

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
git commit -m "feat: create signup page"
```

---

## Phase 5: Settings & Onboarding

### Task 5.1: Create Step Indicator Component

**Files:**
- Create: `components/settings/step-indicator.tsx`

**Step 1: Create step indicator**

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

**Step 1: Create indexing progress with SSE support**

```tsx
"use client";

import { cn } from "@/lib/utils";
import { Check, X, Loader2, Circle } from "lucide-react";

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
    <div className={cn("border border-black bg-white p-4", className)}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full border border-black" />
          <div>
            <div className="font-medium">{repoName} Indexing</div>
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
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/settings/indexing-progress.tsx
git commit -m "feat: create indexing progress component with step status"
```

---

### Task 5.3: Create General Settings Page with Wizard

**Files:**
- Create: `app/(dashboard)/settings/page.tsx`

**Step 1: Create settings page with wizard**

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { FieldsetCard } from "@/components/common/fieldset-card";
import { StepIndicator } from "@/components/settings/step-indicator";
import { IndexingProgress } from "@/components/settings/indexing-progress";
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
      <div>
        <div className="text-sm text-muted-foreground">Settings</div>
        <h1 className="text-2xl font-bold">AI Code Review Agent</h1>
      </div>

      {/* Step Indicator */}
      <StepIndicator steps={steps} currentStep={currentStep} />

      {/* Step Content */}
      <FieldsetCard legend={STEPS[currentStep - 1].label}>
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
            <div className="space-y-2 border border-black">
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
                    <label htmlFor={repo.id} className="text-sm">
                      <Github className="mr-2 inline h-4 w-4" />
                      {repo.name}
                    </label>
                  </div>
                  {repo.indexed && (
                    <span className="text-xs bg-success/10 text-success px-2 py-0.5">
                      Indexed
                    </span>
                  )}
                </div>
              ))}
            </div>
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
            <div>
              <label className="text-sm font-medium">Custom Instructions</label>
              <Textarea
                className="mt-1 min-h-[120px]"
                placeholder="Add any specific coding standards, conventions, or context about your repositories that would help the AI provide better reviews..."
                value={customContext}
                onChange={(e) => setCustomContext(e.target.value)}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Example: &quot;We use TypeScript strict mode. Prefer functional
              components over class components. Follow Airbnb style guide.&quot;
            </p>
            <div className="border border-black p-3">
              <div className="text-sm font-medium">Selected repositories:</div>
              <div className="mt-1 flex flex-wrap gap-2">
                {selectedRepos.length > 0 ? (
                  mockRepos
                    .filter((r) => selectedRepos.includes(r.id))
                    .map((repo) => (
                      <span
                        key={repo.id}
                        className="bg-muted px-2 py-0.5 text-sm"
                      >
                        {repo.name.split("/")[1]}
                      </span>
                    ))
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No repositories selected
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Index Repos */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Index selected repositories to enable AI code review
            </p>
            <div className="border border-black bg-success/5 p-3">
              <div className="text-sm font-medium">Already Indexed</div>
              <div className="mt-1 flex gap-2">
                {mockRepos
                  .filter((r) => r.indexed)
                  .map((repo) => (
                    <span
                      key={repo.id}
                      className="bg-success/10 text-success px-2 py-0.5 text-sm"
                    >
                      {repo.name.split("/")[1]}
                    </span>
                  ))}
              </div>
            </div>
            <div className="border border-black p-3">
              <div className="text-sm font-medium">Repositories to Index</div>
              <div className="mt-1 flex gap-2">
                {selectedRepos.length > 0 ? (
                  mockRepos
                    .filter((r) => selectedRepos.includes(r.id) && !r.indexed)
                    .map((repo) => (
                      <span key={repo.id} className="bg-muted px-2 py-0.5 text-sm">
                        {repo.name.split("/")[1]}
                      </span>
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
            </div>
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
      </FieldsetCard>
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
git commit -m "feat: create general settings page with onboarding wizard"
```

---

## Phase 6: Repository & Review Pages

### Task 6.1: Create Severity Badge Component

**Files:**
- Create: `components/review/severity-badge.tsx`

**Step 1: Create severity badge**

```tsx
import { cn } from "@/lib/utils";

type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "NIT";

interface SeverityBadgeProps {
  severity: Severity;
  className?: string;
}

const severityStyles: Record<Severity, string> = {
  CRITICAL: "bg-severity-critical text-white",
  HIGH: "border border-severity-high text-severity-high bg-transparent",
  MEDIUM: "border border-severity-medium text-severity-medium bg-transparent",
  LOW: "border border-severity-low text-severity-low bg-transparent",
  NIT: "text-severity-nit bg-transparent",
};

const severityLabels: Record<Severity, string> = {
  CRITICAL: "CRITICAL",
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  LOW: "LOW",
  NIT: "NIT",
};

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-medium",
        severityStyles[severity],
        className
      )}
    >
      {severityLabels[severity]}
    </span>
  );
}
```

**Step 2: Commit**

```bash
git add components/review/severity-badge.tsx
git commit -m "feat: create severity badge component"
```

---

### Task 6.2: Create Finding Card Component

**Files:**
- Create: `components/review/finding-card.tsx`

**Step 1: Create finding card**

```tsx
import { SeverityBadge } from "./severity-badge";
import { cn } from "@/lib/utils";

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
    <div className={cn("border border-black bg-white", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-muted bg-muted/30 px-4 py-2">
        <code className="text-sm">
          {filePath}:{lineNumber}
        </code>
      </div>

      {/* Badge Row */}
      <div className="flex items-center gap-2 px-4 py-2">
        <SeverityBadge severity={severity} />
        <span className="text-sm text-muted-foreground">{findingType}</span>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        <p className="text-sm">{message}</p>

        {suggestion && (
          <div className="mt-3">
            <pre className="overflow-x-auto bg-muted p-3 text-sm">
              <code>{suggestion}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/review/finding-card.tsx
git commit -m "feat: create finding card component"
```

---

### Task 6.3: Create PR Card Component

**Files:**
- Create: `components/repository/pr-card.tsx`

**Step 1: Create PR card**

```tsx
import Link from "next/link";
import { SeverityBadge } from "@/components/review/severity-badge";
import { cn } from "@/lib/utils";

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
  completed: "bg-success text-white",
  pending: "bg-warning text-white",
  failed: "bg-destructive text-white",
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
    <Link
      href={`/repos/${repoId}/pr/${prNumber}`}
      className={cn(
        "block border border-black bg-white p-4 hover:bg-muted/30 transition-colors",
        className
      )}
    >
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
          <span
            className={cn(
              "px-2 py-0.5 text-xs font-medium",
              statusStyles[reviewStatus]
            )}
          >
            {statusLabels[reviewStatus]}
          </span>
        )}
        {bugCount !== undefined && bugCount > 0 && highestSeverity && (
          <span className="flex items-center gap-1 border border-black px-2 py-0.5 text-xs">
            {bugCount} bugs
            <SeverityBadge severity={highestSeverity} />
          </span>
        )}
        {nitCount !== undefined && nitCount > 0 && (
          <span className="border border-muted px-2 py-0.5 text-xs text-muted-foreground">
            {nitCount} nits
          </span>
        )}
      </div>
    </Link>
  );
}
```

**Step 2: Commit**

```bash
git add components/repository/pr-card.tsx
git commit -m "feat: create PR card component"
```

---

### Task 6.4: Create Repository Detail Page

**Files:**
- Create: `app/(dashboard)/repos/[id]/page.tsx`

**Step 1: Create repository detail page**

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PRCard } from "@/components/repository/pr-card";
import { FieldsetCard } from "@/components/common/fieldset-card";
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
  const breadcrumbItems = [
    { label: "Repositories", href: "/dashboard" },
    { label: mockRepo.name },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbItems} />

      {/* Repo Header */}
      <FieldsetCard>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black">
              <span className="font-bold">
                {mockRepo.name[0].toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold">{mockRepo.name}</h1>
              <div className="text-sm text-muted-foreground">
                {mockRepo.fullName}
              </div>
              <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
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
      </FieldsetCard>

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
git commit -m "feat: create repository detail page with PR list"
```

---

### Task 6.5: Create Review Detail Page

**Files:**
- Create: `app/(dashboard)/repos/[id]/pr/[number]/review/[reviewId]/page.tsx`

**Step 1: Create review detail page**

```tsx
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { FieldsetCard } from "@/components/common/fieldset-card";
import { FindingCard } from "@/components/review/finding-card";
import { Button } from "@/components/ui/button";
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
  const breadcrumbItems = [
    { label: "Repositories", href: "/dashboard" },
    { label: mockReview.pr.repoName, href: `/repos/${params.id}` },
    { label: `PR #${mockReview.pr.number}`, href: `/repos/${params.id}/pr/${params.number}` },
    { label: "Review" },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbItems} />

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">{mockReview.pr.title}</h1>
      </div>

      {/* Review Summary */}
      <FieldsetCard legend="Review Summary">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="text-sm text-muted-foreground">Status</div>
            <div className="mt-1 flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-white">
                <Check className="h-3 w-3" />
              </span>
              <span className="font-medium capitalize">{mockReview.status}</span>
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
      </FieldsetCard>

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
git commit -m "feat: create review detail page with findings"
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
export * from "./sidebar";
export * from "./breadcrumb";

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

### Completed Components

**Layout:**
- `components/layout/sidebar.tsx` - Main navigation
- `components/layout/breadcrumb.tsx` - Breadcrumb navigation

**Dashboard:**
- `components/dashboard/stats-card.tsx` - Statistics display
- `components/dashboard/activity-list.tsx` - Recent activity
- `components/dashboard/top-repos.tsx` - Repository rankings

**Common:**
- `components/common/fieldset-card.tsx` - Turbopuffer-style card

**Review:**
- `components/review/severity-badge.tsx` - Severity indicators
- `components/review/finding-card.tsx` - Code review findings

**Repository:**
- `components/repository/pr-card.tsx` - PR list items

**Settings:**
- `components/settings/step-indicator.tsx` - Wizard progress
- `components/settings/indexing-progress.tsx` - SSE progress display

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

**Plan complete and saved to `.claude/plans/2026-01-31-sentinel-dashboard-implementation.md`**

Two execution options:

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

Which approach?