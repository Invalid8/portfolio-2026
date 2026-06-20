@AGENTS.md

# portfolio-2026

The full build brief lives in @PLAN.md — read it before working. Key locked decisions:

- **Data backend:** Postgres only (headless-cms hybrid adapter). No `DATA_BACKEND` switch, no Firebase-for-data.
- **Backend:** Next.js App Router API routes (`app/api/admin/...`) via `createCmsHandlers`. No separate server.
- **Auth:** **Google Identity Services** only — no Firebase. The `auth/google` adapter verifies the Google ID token locally (against Google's public keys, no service account); the server gate grants admin to a verified email in `ADMIN_EMAILS`. Client uses `GoogleAuthProvider` / `useGoogleAuth()` (`auth/google/client`). Total auth env = **one** `NEXT_PUBLIC_GOOGLE_CLIENT_ID` (+ optional `NEXT_PUBLIC_ADMIN_EMAILS` for optimistic client UI). The sign-in dialog (`components/admin-login.tsx`) has **no visible trigger** — summon/dismiss it with **⌘/Ctrl + Shift + .** (period); reopen it while signed in to sign out.
- **CMS package:** `@dalgoridim/headless-cms@^0.5.0` from npm. `auth/google` adapter (client built on `@react-oauth/google` — render `<GoogleSignInButton />`). **0.5.0** adds editable-collection ops on `usePageContext`: `collections`, `createItem`, `deleteItem`, `reorderItems` (+ `initialCollections` on `PageProvider`) — for add/remove/drag-sort of list items. No tarball/symlink.
- This is **Next.js 16** — APIs differ from older versions; consult `node_modules/next/dist/docs/` before writing app code (see @AGENTS.md).

## Local dev

- **Postgres** runs in Docker (`docker-compose.yml`, `postgres:16-alpine`). Host port **5441** (5440 belongs to the existing `hcms-pg` container, 5434 to `fillyr-db`).
  - `npm run db:up` / `db:down` / `db:reset` (wipes volume) / `db:logs`.
  - `DATABASE_URL=postgresql://portfolio:portfolio@localhost:5441/portfolio2026` (in `.env`, gitignored; template in `.env.example`).
- Real site content (owner = **Daniel Fadamitan / dalgoridim**) is mined from `~/Projects/Web/portfolio-2025`; never ship the reference template's "Kartik Bansal" copy. Testimonials + FAQ have no source data yet — placeholder + confirm.
