import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, Eyebrow, SectionHeading } from "@/components/section";
import { Button } from "@/components/ui/button";
import { getFeedPosts } from "@/lib/cms/feed";
import { FeedList } from "./feed-list";

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

      <FeedList
        initialPosts={visibleItems}
        limit={limit}
        enableAdminControls={!showViewAll}
      />
    </Section>
  );
}
