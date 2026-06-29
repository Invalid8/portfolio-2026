"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, GripVertical, Pencil, Plus, X } from "lucide-react";
import { useCmsAuth, usePageContext } from "@dalgoridim/headless-cms/client";
import { Button } from "@/components/ui/button";
import type { FeedItem } from "./feed";

export function FeedList({
  initialPosts,
  limit,
  enableAdminControls,
}: {
  initialPosts: FeedItem[];
  limit?: number;
  enableAdminControls: boolean;
}) {
  const { isAdmin, isEditing } = useCmsAuth();
  const { items: cmsItems, deleteItem, reorderItems } = usePageContext();
  const live = (cmsItems.feeds as FeedItem[] | undefined) ?? [];
  const canEdit = enableAdminControls && isAdmin && isEditing && live.length > 0;
  const posts = live.length ? live : initialPosts;
  const visiblePosts =
    typeof limit === "number" && !canEdit ? posts.slice(0, limit) : posts;
  const [dragId, setDragId] = useState<string | null>(null);

  function handleDrop(targetId: string) {
    if (!dragId || dragId === targetId) return;
    const ids = posts.map((post) => post.id);
    const from = ids.indexOf(dragId);
    const to = ids.indexOf(targetId);
    if (from === -1 || to === -1) return;
    const [moved] = ids.splice(from, 1);
    if (moved === undefined) return;
    ids.splice(to, 0, moved);
    reorderItems("feeds", ids);
    setDragId(null);
  }

  return (
    <>
      {canEdit && (
        <div className="mt-10 flex justify-end">
          <Button asChild size="lg">
            <Link href="/feed/new">
              <Plus className="size-4" /> Add post
            </Link>
          </Button>
        </div>
      )}

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {visiblePosts.map((post) => (
          <article
            key={post.id}
            draggable={canEdit}
            onDragStart={() => setDragId(post.id)}
            onDragOver={(event) => canEdit && event.preventDefault()}
            onDrop={() => handleDrop(post.id)}
            className={`surface-card group relative flex min-h-80 min-w-0 flex-col overflow-hidden p-5 transition-colors hover:border-lime/50 sm:p-7 ${
              dragId === post.id ? "opacity-50" : ""
            }`}
          >
            {!canEdit && (
              <Link
                href={`/f/${post.slug}`}
                aria-label={`Open ${post.title}`}
                className="absolute inset-0 z-10 rounded-[inherit]"
              />
            )}
            <div className="flex min-w-0 items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <div className="flex min-w-0 items-center gap-2">
                {canEdit && <GripVertical className="size-4 shrink-0" />}
                <span>{post.date}</span>
              </div>
              {canEdit && (
                <div className="relative z-20 flex shrink-0 items-center gap-2">
                  <Link
                    href={`/feed/${post.slug}/edit`}
                    aria-label={`Edit ${post.title}`}
                    className="inline-flex size-9 items-center justify-center rounded-lg border border-hairline text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Pencil className="size-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => deleteItem("feeds", post.id)}
                    aria-label={`Remove ${post.title}`}
                    className="inline-flex size-9 items-center justify-center rounded-lg border border-hairline text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              )}
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
              <Link
                href={`/f/${post.slug}`}
                className="relative z-20 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors group-hover:text-lime"
              >
                Open post <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {enableAdminControls && isAdmin && isEditing && live.length === 0 && (
        <p className="mt-6 font-mono text-xs text-muted-foreground">
          Run <code className="text-foreground">npm run seed </code> to enable
          editing, adding &amp; reordering feed posts.
        </p>
      )}
    </>
  );
}
