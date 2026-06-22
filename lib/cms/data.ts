import "server-only";
import type { Item, ItemMap } from "@dalgoridim/headless-cms/server";
import { getDataAdapter } from "./server";
import { defaultItems } from "./sections";

/**
 * Editable list collections and how each sorts: projects/tools by manual
 * `order`, experiences by `start` date descending (most recent first).
 */
const LIST_COLLECTIONS: Record<string, { field: string; direction: "asc" | "desc" }> = {
  projects: { field: "order", direction: "asc" },
  tools: { field: "order", direction: "asc" },
  experiences: { field: "start", direction: "desc" },
  feeds: { field: "order", direction: "asc" },
};

/**
 * Read every editable collection from Postgres into one `ItemMap` for hydrating
 * `PageProvider`'s `initialItems`. Section collections merge DB rows over the
 * defaults (so the page always renders, even un-seeded or if the DB is down);
 * list collections come back sorted, or `[]` so components use static fallbacks.
 */
export async function fetchItems(): Promise<ItemMap> {
  const adapter = getDataAdapter();
  const defaults = defaultItems();
  const result: ItemMap = {};

  await Promise.all([
    ...Object.entries(defaults).map(async ([collection, items]) => {
      const byId = new Map<string, Item>(items.map((it) => [it.id, { ...it }]));
      try {
        const rows = await adapter.fetchCollection<Record<string, unknown>>(collection);
        for (const row of rows) {
          const id = String(row.id);
          byId.set(id, { ...(byId.get(id) ?? { id }), ...row, id });
        }
      } catch (err) {
        console.warn(
          `[cms] ${collection} fell back to defaults:`,
          (err as Error).message,
        );
      }
      result[collection] = [...byId.values()];
    }),
    ...Object.entries(LIST_COLLECTIONS).map(async ([collection, orderBy]) => {
      try {
        result[collection] = (await adapter.fetchCollection<Record<string, unknown>>(
          collection,
          { orderBy: [orderBy] },
        )) as Item[];
      } catch {
        result[collection] = [];
      }
    }),
  ]);

  return result;
}
