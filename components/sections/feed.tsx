"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUpRight, GripVertical, Pencil, Plus, X } from "lucide-react";
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

type FeedForm = Omit<FeedItem, "id" | "order">;

const fallback: FeedItem[] = staticPosts.map((post, order) => ({ ...post, order }));

const emptyForm = (): FeedForm => ({
  title: "",
  slug: "",
  excerpt: "",
  body: "# New thought\n\nStart writing…",
  date: new Date().toISOString().slice(0, 10),
  tags: [],
  published: true,
});

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function Feed() {
  const { isAdmin, isEditing } = useCmsAuth();
  const { items: cmsItems, createItem, updateItem, deleteItem, reorderItems } =
    usePageContext();
  const live = (cmsItems.feeds as FeedItem[] | undefined) ?? [];
  const items = live.length ? live : fallback;
  const canEdit = isAdmin && isEditing;
  const canManage = canEdit && live.length > 0;
  const visibleItems = canEdit ? items : items.filter((item) => item.published);

  const [dragId, setDragId] = useState<string | null>(null);
  const [editing, setEditing] = useState<
    { mode: "add" } | { mode: "edit"; item: FeedItem } | null
  >(null);
  const [form, setForm] = useState<FeedForm>(emptyForm);
  const set = <K extends keyof FeedForm>(key: K, value: FeedForm[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

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

  function openAdd() {
    setForm(emptyForm());
    setEditing({ mode: "add" });
  }

  function openEdit(item: FeedItem) {
    setForm({
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      body: item.body,
      date: item.date,
      tags: item.tags,
      published: item.published,
    });
    setEditing({ mode: "edit", item });
  }

  function save(event: React.FormEvent) {
    event.preventDefault();
    if (!editing || !form.title.trim()) return;
    const payload = {
      ...form,
      title: form.title.trim(),
      slug: toSlug(form.slug || form.title),
      excerpt: form.excerpt.trim(),
    };
    if (editing.mode === "add") {
      createItem("feeds", { ...payload, order: items.length });
    } else {
      updateItem("feeds", editing.item.id, payload);
    }
    setEditing(null);
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
          <Button type="button" size="lg" onClick={openAdd}>
            <Plus className="size-4" /> New post
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
            className={`surface-card group relative flex min-h-80 flex-col p-7 transition-colors hover:border-lime/50 ${
              canManage ? "cursor-grab active:cursor-grabbing" : ""
            } ${dragId === post.id ? "opacity-50" : ""}`}
          >
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
                <span key={tag} className="rounded-full border border-hairline px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-auto flex items-end justify-between gap-4 pt-8">
              <Link href={`/feed/${post.slug}`} className="inline-flex items-center gap-2 text-sm transition-colors hover:text-lime">
                Open post <ArrowUpRight className="size-4" />
              </Link>
              {canManage && (
                <div className="flex gap-2">
                  <button type="button" onClick={() => openEdit(post)} aria-label={`Edit ${post.title}`} className="grid size-9 place-items-center rounded-lg border border-hairline bg-surface-2 text-muted-foreground hover:text-foreground">
                    <Pencil className="size-4" />
                  </button>
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

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-h-[92svh] gap-6 overflow-y-auto p-6 sm:max-w-4xl sm:p-8">
          <DialogHeader>
            <DialogTitle>{editing?.mode === "edit" ? "Edit feed post" : "New feed post"}</DialogTitle>
            <DialogDescription>Write in Markdown or MDX. The preview updates as you type.</DialogDescription>
          </DialogHeader>
          <form onSubmit={save} className="flex flex-col gap-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Input placeholder="Title" value={form.title} onChange={(event) => set("title", event.target.value)} required />
              <Input placeholder="Slug (generated from title if empty)" value={form.slug} onChange={(event) => set("slug", event.target.value)} />
            </div>
            <textarea placeholder="Short excerpt" value={form.excerpt} onChange={(event) => set("excerpt", event.target.value)} rows={3} className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50" required />
            <div data-color-mode="dark" className="overflow-hidden rounded-xl border border-hairline">
              <MarkdownEditor value={form.body} onChange={(value) => set("body", value ?? "")} height={420} preview="live" />
            </div>
            <div className="grid gap-3 sm:grid-cols-[12rem_1fr_auto]">
              <Input type="date" aria-label="Publish date" value={form.date} onChange={(event) => set("date", event.target.value)} />
              <TagInput value={form.tags} onChange={(tags) => set("tags", tags)} placeholder="Add tags and press Enter" />
              <label className="flex h-11 items-center gap-2 rounded-lg border border-input px-3 text-sm">
                <input type="checkbox" checked={form.published} onChange={(event) => set("published", event.target.checked)} /> Published
              </label>
            </div>
            <Button type="submit" size="lg">{editing?.mode === "edit" ? "Save changes" : "Publish post"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </Section>
  );
}
