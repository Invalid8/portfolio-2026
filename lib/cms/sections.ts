import type { Item, ItemMap } from "@dalgoridim/headless-cms";
// Relative (not "@/…") so the tsx seed script can load this without path-alias resolution.
import { owner, hero, about, contact, stats, principles } from "../content";

/**
 * Default editable copy for the "section" collections — singleton docs and small
 * fixed lists whose text is CMS-backed (each an `Item` with a stable `id`).
 * Shared by the server reads (`data.ts`) and the seed (`scripts/seed.ts`). The
 * list collections (projects/tools/experiences) are DB-driven and live in
 * `lib/content.ts` instead.
 */
const doc = (id: string, fields: Record<string, unknown>): Item => ({ id, ...fields });

export function defaultItems(): ItemMap {
  return {
    identity: [
      doc("identity", {
        name: owner.name,
        handle: owner.handle,
        role: owner.role,
        email: owner.email,
        phone: owner.phone,
        calendar: owner.calendar,
        resume: owner.resume,
        available: owner.available,
      }),
    ],
    // Singletons (one item each, addressed by a stable id).
    portfolio: [
      doc("hero", {
        headline: hero.headline,
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
