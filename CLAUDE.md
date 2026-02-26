# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture

**ProTime** is an exclusive benefits platform for physicians with a points-based economy. Doctors browse and book experiences (wellness, travel, gastronomic, health) using a points wallet — points are only debited on booking *confirmation*, not creation.

### Routing (Next.js App Router)

- `app/(auth)/` — Public auth pages: login, signup, invite acceptance
- `app/(platform)/` — Protected pages behind Supabase session: dashboard, experiences catalog, bookings, profile, concierge
- `app/api/` — API routes: bookings CRUD + admin points adjustment
- `app/page.tsx` — Public landing page

### Data & Auth

**Supabase** handles everything: Postgres database, Auth (sessions/JWTs), and Row Level Security (RLS) for multi-tenant data isolation. Two Supabase clients exist:

- [lib/supabase/client.ts](lib/supabase/client.ts) — Browser client (for client components)
- [lib/supabase/server.ts](lib/supabase/server.ts) — Server client using cookies (for server components and API routes)

Always use the server client in API routes and Server Components to respect RLS and avoid exposing the service role key.

### Database Schema (run migrations in order)

1. `supabase/migrations/001_initial_schema.sql` — Core tables
2. `supabase/migrations/002_rls_policies.sql` — RLS policies
3. `supabase/migrations/003_seed_data.sql` — Seed data
4. `supabase/migrations/004_points_and_access.sql` — Points ledger + access control

Key tables: `profiles` (doctor data + `points_balance`, `membership_tier`, `access_status`), `experiences` (`points_cost`), `bookings` (status flow: `pending → confirmed → completed/cancelled`), `points_ledger` (immutable audit trail).

### Points System

- Points debit only happens at booking confirmation (`POST /api/bookings/[id]/confirm`) via a Supabase RPC call
- `POST /api/bookings` creates a `pending` booking with no debit
- `POST /api/admin/points/adjust` allows admin-side point adjustments
- Admin access is validated with [lib/auth/index.ts](lib/auth/index.ts) `isAdminUser()` helper

### UI Components

Uses **shadcn/ui** (new-york style, Radix UI primitives, Lucide icons). Component aliases: `@/*` maps to project root. New shadcn components should be added to `components/ui/`.

### Environment Variables

Copy `.env.local.example` to `.env.local`. Required:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_CONCIERGE_WHATSAPP
NEXT_PUBLIC_CONCIERGE_EMAIL
```

Optional AWS hybrid integration (Cognito + Lambda + EventBridge + CloudWatch) — see `docs/aws-hybrid-integration.md`.

### Deployment

Deployed on **Vercel**. The `vercel.json` at the root just sets `framework: nextjs`. Recent history has several fixes around Vercel middleware invocation failures — avoid adding Edge Middleware unless required.
