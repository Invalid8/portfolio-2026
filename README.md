# portfolio-2026

A dark, editorial personal portfolio for **Daniel Fadamitan ([dalgoridim](https://github.com/Invalid8))** — long-scroll landing page, a Markdown-driven **Feed**, and per-project **case studies**, all editable **inline on the live site**.

It's also the first real external consumer of [`@dalgoridim/headless-cms`](https://www.npmjs.com/package/@dalgoridim/headless-cms) — the CMS isn't bolted on, it shapes how every piece of content on the site is read, rendered, and edited.

- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Postgres (Drizzle)
- **CMS:** `@dalgoridim/headless-cms@^0.9.0` — Postgres adapter, Google auth, Cloudinary storage

---

## How the headless CMS shapes content management

The guiding principle of this rebuild was **subtraction**: one data backend, one CMS layer, one editable-component folder — no dual-backend branching, no shim sprawl. `@dalgoridim/headless-cms` is what makes that possible. Here's how it threads through the app.

### 1. "Anyone edits, only an admin saves"

The editing model comes straight from the library. The edit-mode toggle (`components/edit-toggle.tsx`) is available to **every visitor** — they can flip into edit mode and change any field, getting optimistic local updates. But persistence is gated server-side: `createCmsHandlers` → `createAdminGate` rejects a non-admin's save with `401 {logout:true}`, so the change simply reverts with a toast. A signed-in admin's save writes through to Postgres. The whole demo story is true on the live site, with **no separate admin panel** to build or secure.

### 2. One unified item model

Every kind of content — a hero headline, a stat tile, a project card, a feed post — is just an **`Item`** (`{ id, ...fields }`) inside a named **collection**. The client `usePageContext()` exposes one consistent surface for all of them:

- `items` — an `ItemMap` (`{ [collection]: Item[] }`) hydrated once on the server
- `editField` → `saveItem` / `saveAll` — deferred, inline field edits
- `createItem` / `updateItem` / `deleteItem` / `reorderItems` — immediate list operations

A "section" (hero, about, contact) is just a singleton `Item` with a stable id. A project is an `Item` in the `projects` collection. The feed editor and the project case-study editor are the **same** Markdown editing flow pointed at different collections — that reuse is what let the case-study feature ship as a thin addition rather than a new subsystem.

### 3. Typed Postgres, one source of DDL

There is no schemaless JSONB bucket. Every collection is a **typed `pgTable`** declared in `lib/db/schema.ts`. Drizzle Kit owns migrations (DDL); the library's `PostgresDataAdapter` is handed that same `schema` map and does runtime reads/writes (DML) against the exact same tables. Column keys match the field names the app reads — so adding an editable field is: add a column → `db:generate` → `db:migrate`, and it's instantly part of the item model. (That's exactly how project **case studies** were added: a `content` + `slug` column on `projects`.)

Because typed columns sort and filter correctly, ordering (`projects.order`, `experiences.start`) and uniqueness (`feeds.slug`) live in the database, not in app code.

### 4. Resilient server reads with static fallback

`lib/cms/data.ts` reads every collection into one `ItemMap` for hydration. Section collections **merge DB rows over typed defaults** (`lib/cms/sections.ts`), so the page always renders a complete set of fields — even before the DB is seeded, or if it's unreachable. List collections come back sorted, or `[]` so the component falls back to the static content in `lib/content.ts`. The site is never blank because of the CMS.

### 5. Auth & storage as adapters — minimal env

- **Auth:** the `auth/google` adapter verifies a Google ID token locally against Google's public keys (no service account, no Firebase). Total auth config is **one** `NEXT_PUBLIC_GOOGLE_CLIENT_ID` (+ `ADMIN_EMAILS`). The sign-in dialog has no visible trigger — summon/dismiss it with **⌘/Ctrl + Shift + .**
- **Storage:** the `storage/cloudinary` adapter splits a client `upload` from a server `sign` route, so image replacement works inline from the live site.

### Where it lives in the repo

```
lib/cms/
  server.ts    getDataAdapter() (Postgres), cmsAuth (Google gate), cmsStorage (Cloudinary)
  data.ts      server reads → one ItemMap for hydration
  sections.ts  typed default copy for the singleton/section collections
  feed.ts      single feed-post read (by slug, with static fallback)
  projects.ts  single project read (by slug, with static fallback)
lib/db/schema.ts          typed pgTables = the single source of DDL
app/providers.tsx         GoogleAuthProvider → PageProvider (apiBasePath, storage, notify)
app/api/admin/[collection]/[id]/route.ts   GET/PATCH/PUT/DELETE = createCmsHandlers(...)
app/api/admin/sign/route.ts                POST = createCmsHandlers(...).sign
components/editable/       thin, styled skins over the headless edit primitives
```

---

## Local development

**Prerequisites:** Node 20+, Docker (for local Postgres).

```bash
# 1. Install
npm install

# 2. Configure env
cp .env.example .env        # fill in Google client id / Cloudinary as needed

# 3. Start the local Postgres (docker-compose, host port 5441)
npm run db:up

# 4. Apply migrations + seed the owner's content
npm run db:setup            # = db:migrate + seed

# 5. Run
npm run dev                 # http://localhost:3000
```

### Database workflow

Schema changes are **migration-driven** (Drizzle Kit owns DDL):

```bash
# edit lib/db/schema.ts, then:
npm run db:generate         # write a migration to lib/db/migrations/
npm run db:migrate          # apply it
npm run seed                # re-seed data (idempotent upserts)
```

Other scripts: `db:up` / `db:down` / `db:reset` (wipes the volume) / `db:logs` / `db:studio`.

### Environment

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Postgres connection (local docker by default; hosted Postgres in prod) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth web client id — the only thing needed for sign-in |
| `ADMIN_EMAILS` | Comma-separated emails allowed to save (server-authoritative) |
| `NEXT_PUBLIC_ADMIN_EMAILS` | Optional mirror for optimistic client admin UI |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Image storage (optional — image editing is disabled until set) |

---

## Project structure

```
app/
  page.tsx                  long-scroll landing page (composed sections)
  feed/                     Markdown feed: list + [slug] detail
  projects/                 project list + [slug] case study
  (editor)/                 full-screen Markdown editors (feed + project content)
  api/admin/                CMS CRUD + Cloudinary sign route
components/
  sections/                 one file per landing section
  editable/                 styled wrappers over headless edit primitives
  markdown.tsx              shared server-side MDX renderer (feed + case studies)
lib/
  cms/                      the CMS layer (see above)
  db/                       Drizzle schema + migrations
  content.ts                typed site content (seed + static fallback)
scripts/seed.ts             writes content.ts into Postgres (data only, no DDL)
```

## Deployment

Deploy on **Vercel**; point `DATABASE_URL` at a hosted Postgres (e.g. **Neon**). Run `db:migrate` against the production database before the first deploy, then `seed` once if you want the starter content. Set the Google and Cloudinary env vars in the Vercel project.

---

Built with [`@dalgoridim/headless-cms`](https://www.npmjs.com/package/@dalgoridim/headless-cms) · live demo of the editing UX: [dalgoridim.com](https://dalgoridim.com)
