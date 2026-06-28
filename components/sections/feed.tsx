import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, Eyebrow, SectionHeading } from "@/components/section";
import { Button } from "@/components/ui/button";
import { getFeedPosts } from "@/lib/cms/feed";

export type FeedItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  date: string;
  tags: string[];
  published: boolean;
  order?: number;
};

export async function Feed({
  showViewAll = false,
  limit,
}: {
  /** Render a "View all" link to /feed instead of the admin Create menu. */
  showViewAll?: boolean;
  /** Cap the number of cards shown (e.g. the landing-page teaser). */
  limit?: number;
} = {}) {
  const posts = await getFeedPosts();
  const visibleItems =
    typeof limit === "number" ? posts.slice(0, limit) : posts;

  return (
    <Section className="min-h-[70svh]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>personal broadcast</Eyebrow>
          <SectionHeading lead="The" highlight="feed" className="mt-4" />
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Serious engineering notes, unserious observations, and everything I
            learn between shipping one thing and breaking another.
          </p>
        </div>
        {showViewAll && (
          <Button asChild size="lg" className="rounded-full px-5">
            <Link href="/feed">
              View all <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        )}
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {visibleItems.map((post) => (
          <article
            key={post.id}
            className="surface-card group relative flex min-h-80 min-w-0 flex-col overflow-hidden p-5 transition-colors hover:border-lime/50 sm:p-7"
          >
            <Link
              href={`/f/${post.slug}`}
              aria-label={`Open ${post.title}`}
              className="absolute inset-0 z-10 rounded-[inherit]"
            />
            <div className="flex min-w-0 items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <div className="flex min-w-0 items-center gap-2">
                <span>{post.date}</span>
              </div>
            </div>
            <h2 className="mt-8 max-w-md text-balance break-words font-display text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
              {post.title}
            </h2>
            <p className="mt-4 max-w-xl break-words leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="max-w-full break-words rounded-full border border-hairline px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-auto flex items-end justify-between gap-4 pt-8">
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors group-hover:text-lime">
                Open post <ArrowUpRight className="size-4" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
