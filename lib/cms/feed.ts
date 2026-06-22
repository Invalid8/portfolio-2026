import "server-only";
import { cache } from "react";
import { getDataAdapter } from "./server";
import { feedPosts, type FeedPost } from "@/lib/content";

export type StoredFeedPost = FeedPost & { order?: number };

export const getFeedPosts = cache(async (): Promise<StoredFeedPost[]> => {
  try {
    const rows = await getDataAdapter().fetchCollection<StoredFeedPost>("feeds", {
      orderBy: [{ field: "date", direction: "desc" }],
    });
    if (rows.length) return rows.filter((post) => post.published);
  } catch (error) {
    console.warn(
      "[cms] feed index fell back to static content:",
      (error as Error).message,
    );
  }
  return feedPosts.filter((post) => post.published);
});

export const getFeedPost = cache(async (slug: string): Promise<StoredFeedPost | null> => {
  try {
    const rows = await getDataAdapter().fetchCollection<StoredFeedPost>("feeds", {
      filters: [{ field: "slug", op: "eq", value: slug }],
      limit: 1,
    });
    const post = rows[0];
    // An explicit unpublished row must win over static content; otherwise an
    // older static copy would make a deliberately unpublished post public again.
    if (post) return post.published ? post : null;
  } catch (error) {
    console.warn("[cms] feed post fell back to static content:", (error as Error).message);
  }
  return feedPosts.find((post) => post.slug === slug && post.published) ?? null;
});
