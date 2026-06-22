import "server-only";
import type { ItemMap } from "@dalgoridim/headless-cms";
import { loadItemMap, type ItemMapLoadConfig } from "@dalgoridim/headless-cms/server";
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
  const defaults = defaultItems();
  const collections: ItemMapLoadConfig = Object.fromEntries([
    ...Object.entries(defaults).map(([collection, items]) => [
      collection,
      { defaults: items, merge: "byId" as const, fallback: items },
    ]),
    ...Object.entries(LIST_COLLECTIONS).map(([collection, orderBy]) => [
      collection,
      { query: { orderBy: [orderBy] }, fallback: [] },
    ]),
  ]);

  return loadItemMap(getDataAdapter(), collections);
}
