"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, GripVertical, Pencil, Plus, X } from "lucide-react";
import { useCmsAuth, usePageContext } from "@dalgoridim/headless-cms/client";
import { Section, Eyebrow, SectionHeading } from "@/components/section";
import { Button } from "@/components/ui/button";
import { feedPosts as staticPosts } from "@/lib/content";

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

const fallback: FeedItem[] = staticPosts.map((post, order) => ({ ...post, order }));

export function Feed() {
  const { isAdmin, isEditing } = useCmsAuth();
  const { items: cmsItems, deleteItem, reorderItems } = usePageContext();
  const live = (cmsItems.feeds as FeedItem[] | undefined) ?? [];
  const items = live.length ? live : fallback;
  const canEdit = isAdmin && isEditing;
  const canManage = canEdit && live.length > 0;
  const visibleItems = canEdit ? items : items.filter((item) => item.published);
  const [dragId, setDragId] = useState<string | null>(null);

  function handleDrop(targetId: string) {
    if (!dragId || dragId === targetId) return;
    const ids = items.map((item) => item.id);
    const from = ids.indexOf(dragId);
    const to = ids.indexOf(targetId);
    if (from < 0 || to < 0) return;
    const [moved] = ids.splice(from, 1);
    if (!moved) return;
    ids.splice(to, 0, moved);
    reorderItems("feeds", ids);
    setDragId(null);
  }

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
        {canEdit && (
          <Button asChild size="lg">
            <Link href="/feed/new"><Plus className="size-4" /> New post</Link>
          </Button>
        )}
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {visibleItems.map((post) => (
          <article
            key={post.id}
            draggable={canManage}
            onDragStart={() => setDragId(post.id)}
            onDragOver={(event) => canManage && event.preventDefault()}
            onDrop={() => handleDrop(post.id)}
            className={`surface-card group relative flex min-h-80 flex-col p-7 transition-colors hover:border-lime/50 ${canManage ? "cursor-grab active:cursor-grabbing" : ""} ${dragId === post.id ? "opacity-50" : ""}`}
          >
            <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <div className="flex items-center gap-2">
                {canManage && <GripVertical className="size-4 text-lime" />}
                <span>{post.date}</span>
              </div>
              {!post.published && <span className="text-lime">Draft</span>}
            </div>
            <h2 className="mt-8 max-w-md font-display text-3xl font-medium leading-tight tracking-tight">{post.title}</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-hairline px-2.5 py-1 font-mono text-[10px] text-muted-foreground">{tag}</span>
              ))}
            </div>
            <div className="mt-auto flex items-end justify-between gap-4 pt-8">
              <Link href={`/feed/${post.slug}`} className="inline-flex items-center gap-2 text-sm transition-colors hover:text-lime">
                Open post <ArrowUpRight className="size-4" />
              </Link>
              {canManage && (
                <div className="flex gap-2">
                  <Link href={`/feed/${post.slug}/edit`} aria-label={`Edit ${post.title}`} className="grid size-9 place-items-center rounded-lg border border-hairline bg-surface-2 text-muted-foreground hover:text-foreground">
                    <Pencil className="size-4" />
                  </Link>
                  <button type="button" onClick={() => deleteItem("feeds", post.id)} aria-label={`Delete ${post.title}`} className="grid size-9 place-items-center rounded-lg border border-hairline bg-surface-2 text-muted-foreground hover:text-destructive">
                    <X className="size-4" />
                  </button>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {canEdit && live.length === 0 && (
        <p className="mt-6 font-mono text-xs text-muted-foreground">
          The example post is static. Create your first post to start the live, sortable feed.
        </p>
      )}
    </Section>
  );
}
