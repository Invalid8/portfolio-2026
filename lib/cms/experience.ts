import "server-only";
import { cache } from "react";
import { getDataAdapter } from "./server";
import { experiences as staticExperiences, type Experience } from "@/lib/content";

export type StoredExperience = Experience & { order?: number };

export const getExperiences = cache(async (): Promise<StoredExperience[]> => {
  try {
    const rows = await getDataAdapter().fetchCollection<StoredExperience>(
      "experiences",
      {
        orderBy: [{ field: "start", direction: "desc" }],
      },
    );
    if (rows.length) return rows;
  } catch (error) {
    console.warn(
      "[cms] experience index fell back to static content:",
      (error as Error).message,
    );
  }
  return staticExperiences;
});
