import "server-only";
import { cache } from "react";
import { getDataAdapter } from "./server";
import { tools as staticTools } from "@/lib/content";

export type StoredTool = {
  id: string;
  name: string;
  category: string;
  img: string;
  color: string;
  order?: number;
};

export const getTools = cache(async (): Promise<StoredTool[]> => {
  try {
    const rows = await getDataAdapter().fetchCollection<StoredTool>("tools", {
      orderBy: [{ field: "order", direction: "asc" }],
    });
    if (rows.length) return rows;
  } catch (error) {
    console.warn(
      "[cms] tools index fell back to static content:",
      (error as Error).message,
    );
  }
  return staticTools.map((tool) => ({ id: tool.key, ...tool }));
});
