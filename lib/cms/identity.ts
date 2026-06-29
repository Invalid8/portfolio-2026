import "server-only";
import { cache } from "react";
import { getDataAdapter } from "./server";
import { owner } from "@/lib/content";

export type Identity = typeof owner;

export const getIdentity = cache(async (): Promise<Identity> => {
  try {
    const row = await getDataAdapter().fetchById("identity", "identity");
    if (row) return { ...owner, ...row } as Identity;
  } catch (error) {
    console.warn(
      "[cms] identity fell back to static content:",
      (error as Error).message,
    );
  }
  return owner;
});
