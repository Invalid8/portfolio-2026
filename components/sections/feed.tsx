"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronDown,
  Eye,
  GripVertical,
  MessageCircle,
  Pencil,
  Plus,
  X,
} from "lucide-react";
import { useCmsAuth, usePageContext } from "@dalgoridim/headless-cms/client";
import { Section, Eyebrow, SectionHeading } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TagInput } from "@/components/ui/tag-input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { feedPosts as staticPosts } from "@/lib/content";

const MarkdownEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

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

const fallback: FeedItem[] = staticPosts.map((post, order) => ({
  ...post,
  order,
}));

export function Feed({
  showViewAll = false,
  limit,
}: {
  /** Render a "View all" link to /feed instead of the admin Create menu. */
  showViewAll?: boolean;
  /** Cap the number of cards shown (e.g. the landing-page teaser). */
  limit?: number;
} = {}) {
  const { isAdmin, isEditing } = useCmsAuth();
  const {
    items: cmsItems,
    createItem,
    deleteItem,
    reorderItems,
  } = usePageContext();
  const live = (cmsItems.feeds as FeedItem[] | undefined) ?? [];
  const items = live.length ? live : fallback;
  const canEdit = isAdmin && isEditing;
  const canCreate = isAdmin && !showViewAll;
  const canManage = canEdit && live.length > 0;
  const published = canEdit ? items : items.filter((item) => item.published);
  // Don't truncate while editing, so admins can still reorder/delete the full set.
  const visibleItems =
    typeof limit === "number" && !canEdit ? published.slice(0, limit) : published;
  const [dragId, setDragId] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [rantOpen, setRantOpen] = useState(false);
  const [rantPreview, setRantPreview] = useState(false);
  const [rantTitle, setRantTitle] = useState("");
  const [rantBody, setRantBody] = useState("");
  const [rantTags, setRantTags] = useState<string[]>([]);
  const existingTags = [...new Set(items.flatMap((item) => item.tags))].sort();

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

  async function createRant(published: boolean) {
    if ((published && !rantTitle.trim()) || !rantBody.trim()) return;
    const title = rantTitle.trim() || "Untitled draft";
    const slug = `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}-${Date.now().toString(36)}`;
    const excerpt = rantBody
      .replace(/[#*_>`\[\]()~-]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 180);
    try {
      await createItem("feeds", {
        title,
        slug,
        excerpt,
        body: rantBody,
        date: new Date().toISOString().slice(0, 10),
        tags: [...new Set(["Rant", ...rantTags])],
        published,
        order: items.reduce((max, item) => Math.max(max, (item.order ?? -1) + 1), 0),
      });
    } catch {
      return;
    }
    setRantTitle("");
    setRantBody("");
    setRantTags([]);
    setRantPreview(false);
    setRantOpen(false);
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
        {showViewAll && (
          <Button asChild size="lg" className="rounded-full px-5">
            <Link href="/feed">
              View all <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        )}
        {canCreate && (
          <div className="relative">
            <Button
              type="button"
              size="lg"
              onClick={() => setCreateOpen((open) => !open)}
              aria-expanded={createOpen}
              className="px-3.5 py-4.5"
            >
              <Plus className="size-4" /> Create{" "}
              <ChevronDown className="size-4" />
            </Button>
            {createOpen && (
              <div className="absolute top-full right-0 z-20 mt-2 w-64 overflow-hidden rounded-xl border border-hairline bg-surface p-2 shadow-2xl shadow-black/50">
                <button
                  type="button"
                  onClick={() => {
                    setCreateOpen(false);
                    setRantOpen(true);
                  }}
                  className="flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors hover:bg-surface-2"
                >
                  {/* <MessageCircle className="mt-0.5 size-5 text-lime" /> */}
                  <span>
                    <span className="block font-medium">Rant</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      A quick thought without the ceremony.
                    </span>
                  </span>
                </button>
                <Link
                  href="/feed/new"
                  className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-surface-2"
                  onClick={() => setCreateOpen(false)}
                >
                  {/* <FileText className="mt-0.5 size-5 text-lime" /> */}
                  <span>
                    <span className="block font-medium">Post</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      Open the full writing workspace.
                    </span>
                  </span>
                </Link>
              </div>
            )}
          </div>
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
            {!canManage && (
              <Link
                href={`/f/${post.slug}`}
                aria-label={`Open ${post.title}`}
                className="absolute inset-0 z-10 rounded-[inherit]"
              />
            )}
            <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <div className="flex items-center gap-2">
                {canManage && <GripVertical className="size-4 text-lime" />}
                <span>{post.date}</span>
              </div>
              {!post.published && <span className="text-lime">Draft</span>}
            </div>
            <h2 className="mt-8 max-w-md font-display text-3xl font-medium leading-tight tracking-tight">
              {post.title}
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-hairline px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-auto flex items-end justify-between gap-4 pt-8">
              {canManage ? (
                <Link
                  href={`/f/${post.slug}`}
                  className="relative z-10 inline-flex items-center gap-2 text-sm transition-colors hover:text-lime"
                >
                  Open post <ArrowUpRight className="size-4" />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors group-hover:text-lime">
                  Open post <ArrowUpRight className="size-4" />
                </span>
              )}
              {canManage && (
                <div className="flex gap-2">
                  <Link
                    href={`/feed/${post.slug}/edit`}
                    aria-label={`Edit ${post.title}`}
                    className="grid size-9 place-items-center rounded-lg border border-hairline bg-surface-2 text-muted-foreground hover:text-foreground"
                  >
                    <Pencil className="size-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => deleteItem("feeds", post.id)}
                    aria-label={`Delete ${post.title}`}
                    className="grid size-9 place-items-center rounded-lg border border-hairline bg-surface-2 text-muted-foreground hover:text-destructive"
                  >
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
          The example post is static. Create your first post to start the live,
          sortable feed.
        </p>
      )}

      <Dialog open={rantOpen} onOpenChange={setRantOpen}>
        <DialogContent
          className="feed-editor-shell max-h-[92svh] gap-5 overflow-y-auto bg-black p-6 sm:max-w-3xl sm:p-8"
          data-color-mode="dark"
        >
          <DialogHeader>
            <div className="flex items-center justify-between gap-4 pr-8">
              <div>
                <DialogTitle className="font-display text-2xl">
                  New rant
                </DialogTitle>
                <DialogDescription className="mt-2">
                  Quick does not have to mean badly formatted.
                </DialogDescription>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setRantPreview((preview) => !preview)}
              >
                <Eye className="size-4" />{" "}
                {rantPreview ? "Keep writing" : "Show preview"}
              </Button>
            </div>
          </DialogHeader>
          <Input
            value={rantTitle}
            onChange={(event) => setRantTitle(event.target.value)}
            placeholder="Give the rant a name"
          />
          <div className="h-[50svh] max-h-[440px] min-h-72 overflow-hidden rounded-xl border border-hairline">
            <MarkdownEditor
              value={rantBody}
              onChange={(value) => setRantBody(value ?? "")}
              height="100%"
              preview={rantPreview ? "preview" : "edit"}
            />
          </div>
          <TagInput
            value={rantTags}
            onChange={setRantTags}
            suggestions={existingTags}
            placeholder="Add tags and press Enter"
          />
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setRantOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => createRant(false)}
              disabled={!rantBody.trim()}
            >
              Save draft
            </Button>
            <Button
              type="button"
              onClick={() => createRant(true)}
              disabled={!rantTitle.trim() || !rantBody.trim()}
            >
              <MessageCircle className="size-4" /> Publish rant
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Section>
  );
}
