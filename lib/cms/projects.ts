import "server-only";
import { cache } from "react";
import { getDataAdapter } from "./server";
import { projects as staticProjects, type Project } from "@/lib/content";

export type StoredProject = Project & { order?: number };

/** Read a single project by its slug, falling back to static content. */
export const getProjects = cache(async (): Promise<StoredProject[]> => {
  try {
    const rows = await getDataAdapter().fetchCollection<StoredProject>("projects", {
      orderBy: [{ field: "order", direction: "asc" }],
    });
    if (rows.length) return rows;
  } catch (error) {
    console.warn(
      "[cms] project index fell back to static content:",
      (error as Error).message,
    );
  }
  return staticProjects;
});

export const getProject = cache(async (slug: string): Promise<StoredProject | null> => {
  try {
    const rows = await getDataAdapter().fetchCollection<StoredProject>("projects", {
      filters: [{ field: "slug", op: "eq", value: slug }],
      limit: 1,
    });
    if (rows[0]) return rows[0];
  } catch (error) {
    console.warn(
      "[cms] project fell back to static content:",
      (error as Error).message,
    );
  }
  return staticProjects.find((p) => p.slug === slug) ?? null;
});
