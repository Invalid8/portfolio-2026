# portfolio-2026 — build brief

Greenfield personal portfolio. Dark, editorial, lime-accented. Built clean from
scratch and used as the **first real external consumer** of
[`@dalgoridim/headless-cms`](https://www.npmjs.com/package/@dalgoridim/headless-cms)
(now published — consume it from npm like any other dependency, **no tarball/symlink
hacks**).

Design reference: **`./design/reference.png`** — open it first. Sample exact colors
from it; the hexes below are close approximations.

> This file is the handoff brief for a fresh Claude Code session started in this
> directory. Read it, confirm the few open choices in **§9**, then build in the
> phases in **§8**. Consider renaming it to `CLAUDE.md` so it auto-loads.

---

## 1. Goal & guiding principle

A single-page (long-scroll) portfolio with **inline editing on the live site**.
The whole point of the rebuild: a **cleaner, smoother system than portfolio-2025**.
2025 worked but accreted cruft — dual data backends behind `DATA_BACKEND`
branching, ~20 thin shim components re-exporting the package, a tarball
re-pack/reinstall loop, slate + @uiw/react-md-editor + react-markdown all at once,
styling shuttled in and out of the package. **2026 fixes that by subtraction:**

- **One** data backend. No `DATA_BACKEND` switch, no parallel firebase+pg code paths.
- Consume the **published** package from npm. No tarball, no shims-for-shims.
- A small, central `lib/cms/` layer + one `components/editable/` folder. That's it.
- Pull in a dependency only when a section actually needs it.

Bias toward fewer files, clearer names, less indirection.

## 2. Editing model (important — carries over from the live site behavior)

**Anyone can toggle edit mode and change content inline; only an authenticated
admin's saves persist.** Visitors can freely play with the page (local, optimistic
edits) — the server gate (`createCmsHandlers` → `createAdminGate`) rejects
non-admin saves with `401 {logout:true}`. So: edit-mode toggle is available to
**everyone**, a save attempt by a non-admin should fail gracefully (toast "sign in
to save" and revert), and a signed-in admin's save writes through.

This is the demo story advertised in the package README — keep it true.

## 3. Tech stack (recommended defaults — confirm in §9)

| Concern | Choice | Notes |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript + React 19** | latest stable |
| Styling | **Tailwind CSS v4** (CSS-first `@theme`, no JS config) | |
| Components | **shadcn/ui** | Button, Accordion (FAQ), Card, Dialog, Tooltip, Sonner |
| CMS / inline edit | **`@dalgoridim/headless-cms@^0.2.1`** | from npm; subpath exports `/client`, `/server`, `/adapters/postgres`, `/storage/cloudinary`(+`/server`), `/auth/firebase`(+`/client`) |
| Data backend | **Postgres** (hybrid adapter) | one backend only — see §5 |
| Auth | **Firebase** Google sign-in (admin gate) | proven; `auth/firebase` server + `auth/firebase/client` |
| Image storage | **Cloudinary** | client `upload` + server `sign` split |
| Icons | **lucide-react** | |
| Toasts | **sonner** | wired into `PageProvider`'s `notify` |
| Fonts | display + script + body (see §4) | |

Deliberately **NOT** carried over from 2025 unless a section demands it: gsap, slate,
@uiw/react-md-editor, react-markdown/remark-gfm, html2canvas, modern-screenshot,
axios, next-themes (site is dark-only). Add back only on need.

## 4. Visual system (extract exact values from `design/reference.png`)

**Mood:** premium dark, editorial, calm. Near-black canvas with a subtle film
grain, hairline-bordered cards, one loud lime accent, generous vertical rhythm,
a narrow centered content column.

**Color (approx — sample to confirm):**
- Background `#0B0B0B` with a faint noise/grain overlay across the whole page
- Surface / cards `#151515`–`#1A1A1A`, hairline border `~#242424`
- Accent (lime / chartreuse) `~#C6F03C` — buttons, highlights, active states
- Text primary `~#F4F4F4`, muted `~#8C8C8C`
- On-accent text is the dark background color (lime pills have near-black labels)

**Type:**
- **Headings:** a grotesque/display sans (e.g. Geist, General Sans, Clash Display).
  Headings are often two-tone — one word white, one word muted or accent
  ("My Featured *Projects*").
- **Script wordmark:** the calligraphic name watermark in the footer ("Let's Work
  Together" + huge signature) — a handwriting/script face (e.g. a Google "Caveat"/
  "Allura"-type). Used sparingly, as a brand flourish.
- **Body:** clean sans, muted gray, comfortable line-height.

**Shape & motion:** cards/inputs rounded ~12–16px; buttons are **full pills**.
Keep motion subtle — fades / small rises on scroll-in. (Plain CSS or a tiny lib;
don't reach for gsap unless a section truly needs it.)

> Replace all template copy ("Kartik Bansal", client logos, etc.) with the owner's
> real content. The name/wordmark is the site owner's, not the template's.

## 5. Data model & CMS wiring

Use the hybrid Postgres adapter. **Register typed tables** for collections that
need real ordering/filtering (e.g. `projects` with an int `order`/`year`), and let
everything else fall into the schemaless JSONB `documents` table.

> ⚠️ Caveat from the package: fields in the schemaless `documents` table sort as
> **text** (`data->>` is text → `"10" < "5"`). Anything you order/compare
> numerically must live in a **registered typed column**.

Central CMS layer (the *good* part of 2025, kept minimal):

```
lib/cms/
  server.ts   # getDataAdapter() (Postgres), cmsAuth, requireAdmin (createAdminGate)
  data.ts     # server reads: fetchSection / fetchCollection / etc.
  content.ts  # typed content models + default/seed content
```

Routes:
```
app/api/admin/[collection]/[id]/route.ts   # export { GET, PATCH, PUT, DELETE } = createCmsHandlers(...)
app/api/admin/sign/route.ts                # export POST = createCmsHandlers({...storage}).sign
```

Client providers (one place, `app/providers.tsx`): `FirebaseAuthProvider` →
`PageProvider` (inject `apiBasePath`, the Cloudinary client `storage`, and a sonner
`notify`). Edit-mode toggle exposed to all visitors (see §2).

Editable primitives live in **`components/editable/`** — thin skins over the
headless primitives that apply this design system:
- `EditableText` → `ContentEditSpan` (styled, `data-cms-*` driven outlines)
- `EditableImage` → `EditableImage` render-prop (overlay "replace" affordance)
- `EditableRichText` → only if a section needs markdown; pick **one** renderer.

## 6. Page sections (top → bottom, from the reference)

1. **Nav** — floating pill: logo left, centered links (Home / About / Work /
   Contact), lime "Let's Talk" CTA right. Sticky, subtle blur.
2. **Hero** — large two-tone headline ("… is an experienced designer who creates
   high-performing & beautiful websites."), sub-line, two CTAs (lime pill +
   outline), small availability badge + avatar.
3. **Intro / about blurb** — short paragraph + signature flourish.
4. **Stats** — 3 metrics row (e.g. 35+ projects, 10+ yrs, 100% satisfaction).
5. **Skills & Services** — two-column list of services with short descriptions.
6. **Tools I Use** — grid of tool cards w/ logos (Figma, Webflow, etc.).
7. **Featured Projects** — 2-col project cards (thumbnail, title, tags) + "View
   All" lime button. Backed by the registered `projects` collection.
8. **Testimonials** — client cards: star rating, quote, name/role.
9. **FAQ** — accordion (shadcn `Accordion`), two columns.
10. **CTA / footer** — "Let's Work Together", contact, big script wordmark
    watermark, footer nav + socials.

Every text/image in these sections that the owner should be able to change inline
must be an `Editable*` primitive bound to a `collection` + `sectionKey` + `fieldKey`.

## 7. Architecture rules (the "cleaner" contract)

- **No backend branching.** One adapter, chosen once in `lib/cms/server.ts`.
- **Server reads in `lib/cms/data.ts`; never import an adapter into a component.**
- **One providers file**, one `components/editable/` folder, one `lib/cms/`.
- **Co-locate** each section as `components/sections/<Name>.tsx`; the page composes
  them. No mega-components.
- **Typed content.** Define content models in `lib/cms/content.ts`; pages consume
  typed shapes, not `any`.
- **Env** documented in `.env.example` (DATABASE_URL, Cloudinary keys, Firebase
  client + admin, ADMIN_EMAILS).
- Keep prod data safe: develop against a **local/ephemeral Postgres**, never a prod
  DB. Seed via a `scripts/seed.ts` (`npm run seed`).

## 8. Build phases (suggested order)

1. **Scaffold** — `create-next-app` (TS, App Router, Tailwind v4), `shadcn init`,
   add base components. `git init`. Strict tsconfig.
2. **Design tokens** — `@theme` colors/fonts/radii from §4; grain overlay; fonts
   wired (next/font). Build a tiny `/styleguide` page to lock the look.
3. **Static page** — build all 10 sections (§6) with hardcoded content + the real
   look. No CMS yet. This is where the design gets nailed.
4. **CMS layer** — install the package; stand up `lib/cms/*`, the admin routes,
   providers, Postgres (local), `seed.ts`. Prove a round-trip with one field.
5. **Make it editable** — wrap content in `components/editable/*`; bind every
   section to collections/fields; wire the "anyone edits, only admin saves" flow.
6. **Polish** — scroll-in motion, responsive passes, a11y, metadata/OG, deploy
   (Vercel + hosted Postgres). Then swap real content for the template copy.

## 9. Decide before building (open choices for the owner)

- **Postgres host for prod** — Neon vs other. (Local ephemeral for dev regardless.)
- **Fonts** — exact display + script + body families (the reference is a template;
  pick faces that match the owner's brand).
- **Real content** — name, bio, projects, testimonials, socials, resume link.
- **Confirm stack defaults in §3** — especially Firebase-auth vs NextAuth, and
  Cloudinary vs S3 for storage.

## 10. Reference

- Package on npm: `@dalgoridim/headless-cms@^0.2.1` — README covers subpath
  exports, the `Query` language, relations, the hybrid Postgres model, and the
  headless primitives. Live demo of the editing UX: https://dalgoridim.com
- Prior art: `~/Projects/Web/portfolio-2025` — works, but is the thing we're
  simplifying. Borrow the central `lib/cms/{server,data}.ts` idea; **leave behind**
  the `DATA_BACKEND` branching, the shim sprawl, and the tarball loop.
