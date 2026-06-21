import type { Item, ItemMap } from "@dalgoridim/headless-cms/server";
// Relative (not "@/…") so the tsx seed script can load this without path-alias resolution.
import { hero, about, contact, stats, principles } from "../content";

/**
 * Default editable copy for the "section" collections — singletons and small
 * fixed lists whose *text* is CMS-backed. Structural data (ids, logos, links,
 * tags) stays in `lib/content.ts`; only the copy here is editable.
 *
 * One model: each collection is a list of items, each with a stable `id` (the
 * old "section key"). Shared by the server reads (`data.ts`) and the seed
 * (`scripts/seed.ts`) so there's one source of truth.
 *
 * The list collections — projects, tools, experiences — are NOT here: they are
 * DB-driven and fall back to `lib/content.ts` in their components when un-seeded.
 */
const doc = (id: string, fields: Record<string, unknown>): Item => ({ id, ...fields });

export function defaultItems(): ItemMap {
  return {
    // Singletons (one item each, addressed by a stable id).
    portfolio: [
      doc("hero", {
        headlineLead: hero.headlineLead,
        headlineAccent: hero.headlineAccent,
        headlineTail: hero.headlineTail,
        subtitle: hero.subtitle,
      }),
      doc("about", { leading: about.leading, trailing: about.trailing }),
      doc("contact", { title: contact.title, subtitle: contact.subtitle }),
    ],
    // Small fixed lists (item id = index; components map over lib/content order).
    stats: stats.map((s, i) => doc(String(i), { value: s.value, label: s.label })),
    principles: principles.map((p, i) =>
      doc(String(i), { title: p.title, description: p.description }),
    ),
  };
}

/** Collections that hold editable section docs (loaded with defaults by `data.ts`). */
export const SECTION_COLLECTIONS = Object.keys(defaultItems());
