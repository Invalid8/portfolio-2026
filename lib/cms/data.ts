import "server-only";
import type { NestedSections, Section } from "@dalgoridim/headless-cms/server";
import type { CollectionItem } from "@dalgoridim/headless-cms";
import { getDataAdapter } from "./server";
import { defaultSections } from "./sections";

/**
 * Editable item lists and how each sorts: projects/tools by manual `order`,
 * experiences by `start` date descending (most recent first).
 */
const LIST_COLLECTIONS: Record<string, { field: string; direction: "asc" | "desc" }> = {
  projects: { field: "order", direction: "asc" },
  tools: { field: "order", direction: "asc" },
  experiences: { field: "start", direction: "desc" },
};

/**
 * Read the ordered item lists for the editable collections, for hydrating
 * `PageProvider`'s `initialCollections`. A collection with no rows (un-seeded
 * DB) comes back empty so the component can fall back to its static content.
 */
export async function fetchCollections(): Promise<
  Record<string, CollectionItem[]>
> {
  const adapter = getDataAdapter();
  const result: Record<string, CollectionItem[]> = {};

  await Promise.all(
    Object.entries(LIST_COLLECTIONS).map(async ([name, orderBy]) => {
      try {
        const rows = await adapter.fetchCollection<Record<string, unknown>>(
          name,
          { orderBy: [orderBy] },
        );
        result[name] = rows as CollectionItem[];
      } catch {
        result[name] = [];
      }
    }),
  );

  return result;
}

/**
 * Read every editable collection from Postgres and merge over the defaults, so
 * the page always has a complete set of fields to render and hydrate from. If a
 * collection's table doesn't exist yet (un-seeded) or the DB is unreachable, we
 * silently fall back to that collection's defaults.
 */
export async function fetchSections(): Promise<NestedSections> {
  const defaults = defaultSections();
  const adapter = getDataAdapter();
  const result: NestedSections = {};

  await Promise.all(
    Object.keys(defaults).map(async (collection) => {
      const base = { ...defaults[collection] };
      try {
        const rows = await adapter.fetchCollection<Record<string, unknown>>(collection);
        for (const row of rows) {
          const key = String(row.id);
          base[key] = { ...(base[key] ?? {}), ...row, collection } as Section;
        }
      } catch (err) {
        console.warn(
          `[cms] ${collection} fell back to defaults:`,
          (err as Error).message,
        );
      }
      result[collection] = base;
    }),
  );

  return result;
}
