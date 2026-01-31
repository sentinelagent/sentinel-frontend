
# Sentinel Frontend Dashboard Design

**Date:** 2026-01-31
**Status:** Approved
**Stack:** Next.js 16, React 19, Tailwind CSS v4, shadcn/ui (new-york)

---

## Table of Contents

1. [Overview](#overview)
2. [Design System](#design-system)
3. [Layout & Navigation](#layout--navigation)
4. [Pages](#pages)
5. [Components](#components)
6. [API Integration](#api-integration)
7. [SSE Real-time Updates](#sse-real-time-updates)

---

## Overview

### Purpose
Frontend dashboard for Sentinel Agent - an AI-powered automated code review system that analyzes GitHub Pull Requests, detects bugs, and provides intelligent inline feedback.

### Target Users
- **Individual developers** - View their own PRs and reviews
- **Team leads / Engineering managers** - Oversight of team's code review activity

### Primary Workflows
1. **Repository onboarding** - Connect GitHub, select repos, trigger initial indexing
2. **Review history & analytics** - Browse past reviews, filter by repo/severity, track trends

### Navigation Pattern
- **Repository-centric** - Select a repo first, then see all PRs and reviews for it
- **Sidebar-only navigation** - Like Linear/VS Code

### Style Reference
- **Turbopuffer** - Light theme, monospace font, code-editor aesthetic
- **User mockups** - Dark sidebar (revised to light), stats cards, progress indicators

---

## Design System

### Typography

```css
--font-mono: 'JetBrains Mono', 'IBM Plex Mono', monospace;
```

- **Primary font:** Monospace throughout for code-editor feel
- **Headings:** Bold weight, tight letter-spacing
- **Body:** Regular weight, generous line-height

### Color Palette

```css
/* Backgrounds */
--background: #FFFFFF;           /* Main content */
--background-sidebar: #F5F5F4;   /* Sidebar (stone-100) */
--background-surface: #F9FAFB;   /* Cards (gray-50) */

/* Borders */
--border: #000000;               /* Primary borders (black) */
--border-sidebar: #E7E5E4;       /* Sidebar border (stone-200) */

/* Text */
--text-primary: #000000;
--text-secondary: #6B7280;       /* gray-500 */
--text-muted: #9CA3AF;           /* gray-400 */

/* Accent Colors */
--accent-orange: #F97316;        /* Primary CTAs, active nav */
--success-green: #22C55E;        /* Success badges, completed states */
--warning-amber: #F59E0B;        /* Warnings */
--error-red: #EF4444;            /* Errors, critical severity */

/* Severity Colors */
--severity-critical: #EF4444;    /* Red */
--severity-high: #F97316;        /* Orange */
--severity-medium: #F59E0B;      /* Amber */
--severity-low: #6B7280;         /* Gray */
--severity-nit: #9CA3AF;         /* Light gray */
```

### Card Style (Turbopuffer-inspired)

- White background with **solid black 1px border**
- Dashed border for emphasis (sign-in forms, special containers)
- No rounded corners or minimal (2px max)
- Fieldset-style headers with legend text breaking the border

### Buttons

| Type | Background | Text | Border |
|------|------------|------|--------|
| Primary | Black | White | Black |
| Secondary | White | Black | Black |
| CTA/Accent | Orange | White | None |
| Ghost | Transparent | Black | None |

### Spacing

- **Base unit:** 8px
- **Card padding:** 16px - 24px
- **Section gaps:** 24px - 32px

---

## Layout & Navigation

### Overall Structure

```
┌─────────────────────────────────────────────────────────┐
│ ┌──────────┐ ┌────────────────────────────────────────┐ │
│ │          │ │                                        │ │
│ │ Sidebar  │ │           Main Content                 │ │
│ │  240px   │ │         (flex, scrollable)             │ │
│ │  fixed   │ │                                        │ │
│ │  #F5F5F4 │ │            #FFFFFF                     │ │
│ └──────────┘ └────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Sidebar Structure

```
┌─────────────────────┐
│  ○ Sentinel         │  ← Logo + name (black)
│    Free Plan        │  ← Plan badge (muted)
├─────────────────────┤
│  MAIN MENU          │  ← Section label
│  ⊞ Overview         │
│  ⟳ Activity         │
├─────────────────────┤
│  REPOSITORIES       │
│  ▸ frontend-app     │  ← Expandable items
│  ▸ backend-api      │
├─────────────────────┤
│  CODE REVIEW        │
│  ⚙ Review Settings  │
│  📊 Analytics       │
│  📋 Custom Context  │
├─────────────────────┤
│  ACCOUNT            │
│  ⚙ General Settings │
├─────────────────────┤
│  ┌─────────────────┐│
│  │ 👤 User         ││  ← User profile
│  │ user@example.com││
│  └─────────────────┘│
└─────────────────────┘
```

### Repository Sub-navigation

When expanded:
```
▾ frontend-app
    Pull Requests
    Reviews
    Findings
```

### Breadcrumb Pattern

```
Repositories / frontend-app / PR #421 / Review
```

---

## Pages

### Route Structure

| Page | Route | Purpose |
|------|-------|---------|
| Login | `/login` | Auth via Supabase |
| Signup | `/signup` | Registration |
| Overview | `/dashboard` | Stats, progress, recent activity |
| Activity | `/activity` | Chronological feed |
| Repository Detail | `/repos/[id]` | PR list for selected repo |
| PR Detail | `/repos/[id]/pr/[number]` | Reviews for a PR |
| Review Detail | `/repos/[id]/pr/[number]/review/[id]` | Findings |
| Findings Explorer | `/findings` | Search/filter all findings |
| Review Settings | `/settings/review` | PR summary, review behavior |
| Analytics | `/analytics` | Trends, charts |
| Custom Context | `/settings/context` | Rules & documentation |
| General Settings | `/settings` | Profile, GitHub, repo management |

---

### Page: Overview (`/dashboard`)

```
┌─────────────────────────────────────────────────────────┐
│ Dashboard                                               │
│ Project Overview                                        │
├─────────────────────────────────────────────────────────┤
│ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐│
│ │ PRs       │ │ Bugs      │ │ Issues    │ │ Avg Time  ││
│ │ Reviewed  │ │ Found     │ │ Captured  │ │           ││
│ │   1,247   │ │    389    │ │    156    │ │  4.2 min  ││
│ │   ↑12%    │ │ 23 crit   │ │ action req│ │ improving ││
│ └───────────┘ └───────────┘ └───────────┘ └───────────┘│
├─────────────────────────────────────────────────────────┤
│ ┌─ Review Progress ───────────────────────────────────┐ │
│ │ ████████████████████████░░░░░░░░  65% Complete     │ │
│ └─────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│ ┌─ Recent Activity ─────┐ ┌─ Top Repositories ───────┐ │
│ │ ⚡ Reviewed PR        │ │  1. frontend-app  423 89 │ │
│ │   frontend-app #421   │ │  2. backend-api   312 67 │ │
│ │   Completed           │ │  3. shared-utils  189 34 │ │
│ └───────────────────────┘ └─────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

### Page: Repository Detail (`/repos/[id]`)

```
┌─────────────────────────────────────────────────────────┐
│ Repositories / frontend-app                             │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ ○ frontend-app                      Last indexed:   │ │
│ │   omkargade/frontend-app            2 hours ago     │ │
│ │   ★ 142  ⑂ 23                      [Re-index]      │ │
│ └─────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│ Pull Requests                        [Filter ▾] [Search]│
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────┐ │
│ │ #421  Add user authentication flow                  │ │
│ │ opened 2 hours ago by @dakshgup                     │ │
│ │ ┌────────┐ ┌────────┐ ┌────────┐                   │ │
│ │ │●Review │ │ 3 bugs │ │ 2 nits │                   │ │
│ │ │Complete│ │  HIGH  │ │        │                   │ │
│ │ └────────┘ └────────┘ └────────┘                   │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

**API:** `GET /repository/{id}/pull-requests`

---

### Page: Review Detail (`/repos/[id]/pr/[number]/review/[id]`)

```
┌─────────────────────────────────────────────────────────┐
│ frontend-app / PR #421 / Review                         │
├─────────────────────────────────────────────────────────┤
│ ┌─ Review Summary ──────────────────────────────────┐   │
│ │ Status: ● Completed    Published: ✓ Yes           │   │
│ │ Duration: 2m 34s       Findings: 5 total          │   │
│ │ Model: claude-3-opus   Head SHA: a1b2c3d          │   │
│ └───────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│ Findings                    [All ▾] [Severity ▾] [Type]│
├─────────────────────────────────────────────────────────┤
│ ┌─ src/auth/login.ts:42 ────────────────────────────┐   │
│ │ ⚠ HIGH  bug                                       │   │
│ ├───────────────────────────────────────────────────┤   │
│ │ Missing null check before accessing user object   │   │
│ │                                                   │   │
│ │ ```ts                                             │   │
│ │ // Suggested                                      │   │
│ │ const name = user?.name ?? 'Anonymous';           │   │
│ │ ```                                               │   │
│ └───────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**API:** `GET /review/{id}`

### Severity Badges

| Severity | Style |
|----------|-------|
| CRITICAL | Red filled badge |
| HIGH | Orange outlined badge |
| MEDIUM | Amber outlined badge |
| LOW | Gray outlined badge |
| NIT | Gray text only |

---

### Page: Findings Explorer (`/findings`)

```
┌─────────────────────────────────────────────────────────────┐
│ Findings Explorer                                           │
├─────────────────────────────────────────────────────────────┤
│ 🔍 Search findings...                                       │
│                                                             │
│ [Repo: All ▾] [Severity ▾] [Type: All ▾] [Status ▾]        │
│                                                             │
│ Showing 156 findings                          [ Export CSV ]│
├─────────────────────────────────────────────────────────────┤
│ FILE              SEVERITY  TYPE      REPO          PR      │
├─────────────────────────────────────────────────────────────┤
│ src/auth/login.ts                                           │
│ :42               ● CRIT    security  frontend-app  #421    │
│ JWT token stored in localStorage is vulnerable to XSS...    │
└─────────────────────────────────────────────────────────────┘
```

**API:** `GET /review/{id}/findings` with filters

---

### Page: Activity Feed (`/activity`)

```
┌─────────────────────────────────────────────────────────────┐
│ Activity                                                    │
├─────────────────────────────────────────────────────────────┤
│ ┌─ Today ───────────────────────────────────────────────┐   │
│ │  10:34 AM  ● Review completed                         │   │
│ │            frontend-app #421 · 5 findings             │   │
│ │                                                       │   │
│ │  09:15 AM  ✓ Repository indexed                       │   │
│ │            mobile-app · 2,340 symbols                 │   │
│ └───────────────────────────────────────────────────────┘   │
│ ┌─ Yesterday ───────────────────────────────────────────┐   │
│ │  4:22 PM   ● Review completed                         │   │
│ │            backend-api #189 · 3 findings              │   │
│ └───────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

### Page: Analytics (`/analytics`)

- Reviews over time (line chart)
- Findings by severity (bar chart)
- Findings by type (bar chart)
- Top repositories by findings

---

### Page: General Settings (`/settings`)

4-step onboarding wizard:

1. **Connect GitHub** - OAuth flow
2. **Select Repositories** - Checkbox list with "Indexed" badges
3. **Custom Context** - Optional instructions textarea
4. **Index Repos** - SSE progress tracking

---

### Page: Review Settings (`/settings/review`)

- PR Summary Settings (toggles)
- Review Behavior (auto-review triggers, severity threshold)
- File Filtering (ignore patterns)

---

### Page: Custom Context (`/settings/context`)

- Rules table with CRUD
- Tabs: Rules Setup / Documentation Setup
- Modal for adding rules (What/Why/Good/Bad format)
- Scope: Repository + File Pattern

---

### Page: Login/Signup

Turbopuffer-inspired dashed border fieldset style.

- Email + Password fields
- "Continue with GitHub" button
- Link to signup/login

---

## Components

### Core UI Components (shadcn/ui)

```
components/ui/
├── button.tsx
├── card.tsx
├── input.tsx
├── select.tsx
├── checkbox.tsx
├── badge.tsx
├── table.tsx
├── tabs.tsx
├── dialog.tsx (modal)
├── progress.tsx
├── separator.tsx
└── skeleton.tsx
```

### Custom Components

```
components/
├── layout/
│   ├── sidebar.tsx
│   ├── sidebar-nav.tsx
│   └── breadcrumb.tsx
├── dashboard/
│   ├── stats-card.tsx
│   ├── progress-bar.tsx
│   ├── activity-list.tsx
│   └── top-repos.tsx
├── repository/
│   ├── repo-header.tsx
│   ├── pr-list.tsx
│   └── pr-card.tsx
├── review/
│   ├── review-summary.tsx
│   ├── findings-list.tsx
│   ├── finding-card.tsx
│   └── severity-badge.tsx
├── settings/
│   ├── setup-wizard.tsx
│   ├── step-indicator.tsx
│   ├── repo-selector.tsx
│   └── indexing-progress.tsx
└── common/
    ├── fieldset-card.tsx (Turbopuffer style)
    ├── data-table.tsx
    └── empty-state.tsx
```

---

## API Integration

### Required Endpoints

| Frontend Page | API Endpoint | Status |
|--------------|--------------|--------|
| Repository Detail | `GET /repository/{id}` | To build |
| PR List | `GET /repository/{id}/pull-requests` | To build |
| Review Detail | `GET /review/{id}` | To build |
| Findings (filtered) | `GET /review/{id}/findings` | To build |
| Review History | `GET /repository/{id}/pr/{number}/reviews` | To build |

### Existing Endpoints

| Endpoint | Purpose |
|----------|---------|
| `GET /repository/all` | Fetch repos from GitHub |
| `GET /repository/user-selected` | Fetch indexed repos |
| `POST /indexing/index-repo` | Trigger indexing |
| `GET /api/workflows/{id}/events` | SSE progress stream |

See: `/sentinel-agent/ui-needs/FRONTEND_API_REQUIREMENTS.md`

---

## SSE Real-time Updates

### Indexing Progress

Connect to: `GET /api/workflows/{workflow_id}/events?token={jwt}`

### Event to UI Mapping

| SSE Event | UI Step | Icon |
|-----------|---------|------|
| `clone_repo_activity` started | Cloning Repository | ◐ spinner |
| `clone_repo_activity` completed | Cloning Repository | ✓ green |
| `parse_repo_activity` completed | Parsing Repository | ✓ |
| `persist_kg_activity` completed | Storing in Knowledge Graph | ✓ |
| `persist_metadata_activity` completed | Storing Metadata | ✓ |
| `workflow_completed` | Indexing Completed | ✓ |
| `workflow_failed` | (current step) | ✗ red |

### Icon States

```
○  Pending (gray)
◐  In Progress (orange spinner)
✓  Completed (green)
✗  Failed (red)
```

### React Hook Pattern

```typescript
function useWorkflowProgress(workflowId: string, token: string) {
  const [steps, setSteps] = useState<Step[]>(INITIAL_STEPS);
  const [status, setStatus] = useState<'idle' | 'running' | 'completed' | 'failed'>('idle');

  useEffect(() => {
    const eventSource = new EventSource(
      `/api/workflows/${workflowId}/events?token=${token}`
    );

    eventSource.addEventListener('activity', (e) => {
      const event = JSON.parse(e.data);
      updateStepFromEvent(event);
    });

    eventSource.addEventListener('close', () => {
      eventSource.close();
    });

    return () => eventSource.close();
  }, [workflowId]);

  return { steps, status };
}
```

---

## Implementation Notes

### Font Setup

Install JetBrains Mono:
```bash
npm install @fontsource/jetbrains-mono
```

Or use Next.js font optimization:
```typescript
import { JetBrains_Mono } from 'next/font/google';

const mono = JetBrains_Mono({ subsets: ['latin'] });
```

### Tailwind Configuration

The project uses Tailwind v4 with CSS variables. Update `globals.css` with the design system colors.

### State Management

- **Server state:** React Query or SWR for API data
- **Client state:** React Context for auth, Zustand for complex UI state
- **SSE state:** Custom hook with EventSource

### Authentication

- Supabase Auth with JWT tokens
- Tokens stored in httpOnly cookies
- SSE endpoint receives token as query param (EventSource limitation)

---

## Next Steps

1. Set up font and color system in Tailwind
2. Create base layout with sidebar
3. Build core UI components (shadcn/ui + custom)
4. Implement auth flow (login/signup)
5. Build settings/onboarding wizard
6. Build repository and review pages
7. Add SSE integration for progress tracking
8. Build analytics page with charts
