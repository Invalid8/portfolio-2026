import "server-only";
import { getDataAdapter } from "./server";
import { feedPosts, type FeedPost } from "@/lib/content";

export type StoredFeedPost = FeedPost & { order?: number };

export async function getFeedPost(slug: string): Promise<StoredFeedPost | null> {
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
}
