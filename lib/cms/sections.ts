import type { NestedSections, Section } from "@dalgoridim/headless-cms/server";
// Relative (not "@/…") so the tsx seed script can load this without path-alias resolution.
import {
  hero,
  about,
  contact,
  stats,
  services,
  experiences,
  principles,
  projects,
} from "../content";

/**
 * The editable content model: which collections/docs/fields are CMS-backed.
 * Shared by the server reads (`data.ts`) and the seed (`scripts/seed.ts`) so
 * there's one source of truth. Structural data (ids, logos, links, tags) stays
 * in `lib/content.ts`; only the *copy* here is editable.
 */
function doc(collection: string, id: string, fields: Record<string, unknown>): Section {
  return { id, collection, ...fields };
}

export function defaultSections(): NestedSections {
  return {
    // Singletons
    portfolio: {
      hero: doc("portfolio", "hero", {
        headlineLead: hero.headlineLead,
        headlineAccent: hero.headlineAccent,
        headlineTail: hero.headlineTail,
        subtitle: hero.subtitle,
      }),
      about: doc("portfolio", "about", {
        leading: about.leading,
        trailing: about.trailing,
      }),
      contact: doc("portfolio", "contact", {
        title: contact.title,
        subtitle: contact.subtitle,
      }),
    },
    // Lists (doc id = stable per item; component maps over lib/content order)
    stats: Object.fromEntries(
      stats.map((s, i) => [
        String(i),
        doc("stats", String(i), { value: s.value, label: s.label }),
      ]),
    ),
    services: Object.fromEntries(
      services.map((s, i) => [
        String(i),
        doc("services", String(i), { title: s.title, description: s.description }),
      ]),
    ),
    experiences: Object.fromEntries(
      experiences.map((e) => [
        e.id,
        doc("experiences", e.id, {
          role: e.role,
          company: e.company,
          blurb: e.blurb,
          period: e.period,
        }),
      ]),
    ),
    principles: Object.fromEntries(
      principles.map((p, i) => [
        String(i),
        doc("principles", String(i), { title: p.title, description: p.description }),
      ]),
    ),
    // Typed collection — only the editable text/image fields live in the section
    // model; link/github/year/tags stay structural in lib/content.ts.
    projects: Object.fromEntries(
      projects.map((p) => [
        p.id,
        doc("projects", p.id, {
          title: p.title,
          description: p.description,
          thumbnail: p.thumbnail,
        }),
      ]),
    ),
  };
}

/** Collections that hold editable section docs (loaded by `fetchSections`). */
export const EDITABLE_COLLECTIONS = Object.keys(defaultSections());
