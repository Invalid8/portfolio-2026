@AGENTS.md

# portfolio-2026

The full build brief lives in @PLAN.md — read it before working. Key locked decisions:

- **Data backend:** Postgres only (headless-cms `PostgresDataAdapter`, Drizzle-backed, typed tables). No `DATA_BACKEND` switch, no Firebase-for-data.
- **Backend:** Next.js App Router API routes (`app/api/admin/...`) via `createCmsHandlers`. No separate server.
- **Auth:** **Google Identity Services** only — no Firebase. The `auth/google` adapter verifies the Google ID token locally (against Google's public keys, no service account); the server gate grants admin to a verified email in `ADMIN_EMAILS`. Client uses `GoogleAuthProvider` / `useGoogleAuth()` (`auth/google/client`). Total auth env = **one** `NEXT_PUBLIC_GOOGLE_CLIENT_ID` (+ optional `NEXT_PUBLIC_ADMIN_EMAILS` for optimistic client UI). The sign-in dialog (`components/admin-login.tsx`) has **no visible trigger** — summon/dismiss it with **⌘/Ctrl + Shift + .** (period); reopen it while signed in to sign out.
- **CMS package:** `@dalgoridim/headless-cms@^0.9.0` from npm. `auth/google` adapter (client built on `@react-oauth/google` — render `<GoogleSignInButton />`). **One unified item model:** `usePageContext` exposes `items` (an `ItemMap` = `{ [collection]: Item[] }`), `getItem`, deferred field edits (`editField` → `saveItem`/`saveAll`), and immediate list ops `createItem`/`updateItem`/`deleteItem`/`reorderItems`. Hydrate via `initialItems` on `PageProvider`. A "section" singleton is just an `Item` with a stable id (the old section key). **Schema/migrations:** you declare typed `pgTable`s directly in `lib/db/schema.ts` and hand the `schema` map to `PostgresDataAdapter`; Drizzle Kit owns DDL, the adapter does runtime DML. No `documents`/`extra`, no `toDrizzleSchema`. No tarball/symlink.
- This is **Next.js 16** — APIs differ from older versions; consult `node_modules/next/dist/docs/` before writing app code (see @AGENTS.md).

## Local dev

- **Postgres** runs in Docker (`docker-compose.yml`, `postgres:16-alpine`). Host port **5441** (5440 belongs to the existing `hcms-pg` container, 5434 to `fillyr-db`).
  - `npm run db:up` / `db:down` / `db:reset` (wipes volume) / `db:logs`.
  - `DATABASE_URL=postgresql://portfolio:portfolio@localhost:5441/portfolio2026` (in `.env`, gitignored; template in `.env.example`).
- **Schema = Drizzle Kit migrations.** Tables are declared directly as typed `pgTable`s in `lib/db/schema.ts` (the `schema` map is also handed to `PostgresDataAdapter`). Change a column → `npm run db:generate` (writes a migration to `lib/db/migrations/`) → `npm run db:migrate` (applies it). `npm run db:setup` = migrate + seed. `seed.ts` only writes data (no DDL). After `db:reset`, wait for the container to be **healthy** before migrating.
- Real site content (owner = **Daniel Fadamitan / dalgoridim**) is mined from `~/Projects/Web/portfolio-2025`; never ship the reference template's "Kartik Bansal" copy. Testimonials + FAQ have no source data yet — placeholder + confirm.
