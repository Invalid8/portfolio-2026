@AGENTS.md

# portfolio-2026

The full build brief lives in @PLAN.md — read it before working. Key locked decisions:

- **Data backend:** Postgres only (headless-cms hybrid adapter). No `DATA_BACKEND` switch, no Firebase-for-data.
- **Backend:** Next.js App Router API routes (`app/api/admin/...`) via `createCmsHandlers`. No separate server.
- **Auth:** Firebase admin gate with **both** Google sign-in and Email/Password (credential). `useFirebaseAuth()` exposes `loginWithGoogle()` + `loginWithEmail()`. Server gate requires the Firebase `admin` custom claim **and** membership in `ADMIN_EMAILS`.
- **CMS package:** `@dalgoridim/headless-cms@^0.2.1` from npm (no tarball/symlink).
- This is **Next.js 16** — APIs differ from older versions; consult `node_modules/next/dist/docs/` before writing app code (see @AGENTS.md).

## Local dev

- **Postgres** runs in Docker (`docker-compose.yml`, `postgres:16-alpine`). Host port **5441** (5440 belongs to the existing `hcms-pg` container, 5434 to `fillyr-db`).
  - `npm run db:up` / `db:down` / `db:reset` (wipes volume) / `db:logs`.
  - `DATABASE_URL=postgresql://portfolio:portfolio@localhost:5441/portfolio2026` (in `.env`, gitignored; template in `.env.example`).
- Real site content (owner = **Daniel Fadamitan / dalgoridim**) is mined from `~/Projects/Web/portfolio-2025`; never ship the reference template's "Kartik Bansal" copy. Testimonials + FAQ have no source data yet — placeholder + confirm.
