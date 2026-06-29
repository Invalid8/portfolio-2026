"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileCheck, Save } from "lucide-react";
import { usePageContext } from "@dalgoridim/headless-cms/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TagInput } from "@/components/ui/tag-input";
import { slugify, uniqueSlug } from "@/lib/slug";
import type { FeedItem } from "@/components/sections/feed";

const MarkdownEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type FeedForm = Omit<FeedItem, "id" | "order">;

const BLANK_BODY = "# New thought\n\nStart writing…";

const blank = (): FeedForm => ({
  title: "",
  slug: "",
  excerpt: "",
  body: BLANK_BODY,
  date: new Date().toISOString().slice(0, 10),
  tags: [],
  published: true,
});

export function FeedEditor({ slug }: { slug?: string }) {
  const router = useRouter();
  const { items: cmsItems, createItem, updateItem } = usePageContext();
  const posts = (cmsItems.feeds as FeedItem[] | undefined) ?? [];
  const post = posts.find((item) => item.slug === slug);
  const existingTags = [...new Set(posts.flatMap((item) => item.tags))].sort();
  const [initialForm] = useState<FeedForm>(() =>
    post
      ? { title: post.title, slug: post.slug, excerpt: post.excerpt, body: post.body, date: post.date, tags: post.tags, published: post.published }
      : blank(),
  );
  const [form, setForm] = useState<FeedForm>(initialForm);
  const [savedSnapshot, setSavedSnapshot] = useState(() => JSON.stringify(initialForm));
  const [postId, setPostId] = useState<string | undefined>(post?.id);
  const [saving, setSaving] = useState(false);
  const saved = useRef(false);
  const hasUnsavedChanges = JSON.stringify(form) !== savedSnapshot;
  const isExisting = Boolean(postId);
  const hasContent =
    form.title.trim().length > 0 || (form.body.trim().length > 0 && form.body !== BLANK_BODY);
  const set = <K extends keyof FeedForm>(key: K, value: FeedForm[K]) => setForm((current) => ({ ...current, [key]: value }));

  useEffect(() => {
    function warnBeforeUnload(event: BeforeUnloadEvent) {
      if (!hasUnsavedChanges || saved.current) return;
      event.preventDefault();
      event.returnValue = "";
    }
    window.addEventListener("beforeunload", warnBeforeUnload);
    return () => window.removeEventListener("beforeunload", warnBeforeUnload);
  }, [hasUnsavedChanges]);

  function leaveEditor() {
    if (
      hasUnsavedChanges &&
      !window.confirm("You have unsaved changes. Are you sure you want to leave?")
    ) {
      return;
    }
    saved.current = true;
    router.push("/feed");
  }

  async function save(published: boolean) {
    if (!hasContent) return;
    if (published && !form.title.trim()) return;
    const title = form.title.trim() || "Untitled draft";
    const takenSlugs = posts
      .filter((item) => item.id !== postId)
      .map((item) => item.slug);
    const payload = {
      ...form,
      published,
      title,
      slug: uniqueSlug(slugify(form.slug || title), takenSlugs),
      excerpt: form.excerpt.trim(),
    };
    const savedForm = {
      title: payload.title,
      slug: payload.slug,
      excerpt: payload.excerpt,
      body: payload.body,
      date: payload.date,
      tags: payload.tags,
      published: payload.published,
    };
    setSaving(true);
    saved.current = true;
    try {
      if (postId) await updateItem("feeds", postId, payload);
      else {
        const nextOrder = posts.reduce(
          (max, item) => Math.max(max, (item.order ?? -1) + 1),
          0,
        );
        const newId = await createItem("feeds", { ...payload, order: nextOrder });
        setPostId(newId);
      }
      setForm(savedForm);
      if (published) {
        // Publishing sends you to the feed listing.
        router.push("/feed");
        return;
      }
      // Saving a draft keeps you in the editor; just clear the "unsaved" flag.
      setSavedSnapshot(JSON.stringify(savedForm));
      saved.current = false;
      setSaving(false);
    } catch {
      saved.current = false;
      setSaving(false);
    }
  }

  return (
    <main className="feed-editor-shell flex h-svh flex-col overflow-hidden bg-black" data-color-mode="dark">
      <header className="flex min-h-20 flex-wrap items-center justify-between gap-4 border-b border-hairline bg-black px-6 py-4 sm:px-8">
        <div className="flex items-center gap-4">
          <Button type="button" variant="ghost" size="icon" onClick={leaveEditor} aria-label="Back to Feed"><ArrowLeft className="size-5" /></Button>
          <div>
            <p className="font-display text-lg font-medium">{isExisting ? "Edit post" : "New feed post"}</p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <p className="text-xs text-muted-foreground">Markdown and MDX supported</p>
              <span
                className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${
                  form.published
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                    : "border-lime/30 bg-lime/10 text-lime"
                }`}
              >
                {form.published ? "Published" : "Draft"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button type="button" variant="outline" onClick={() => save(false)} disabled={!hasContent || saving}>
            <Save className="size-4" /> {saving ? "Saving..." : form.published ? "Move to draft" : "Save draft"}
          </Button>
          <Button type="button" onClick={() => save(true)} disabled={!form.title.trim() || saving}>
            <FileCheck className="size-4" /> {form.published ? "Save published" : "Publish"}
          </Button>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 lg:grid-cols-[22rem_1fr]">
        <aside className="overflow-y-auto border-r border-hairline p-6">
          <div className="flex flex-col gap-4">
            <Input placeholder="Title" value={form.title} onChange={(event) => set("title", event.target.value)} required />
            <Input placeholder="Slug (optional)" value={form.slug} onChange={(event) => set("slug", event.target.value)} />
            <textarea placeholder="Short excerpt" value={form.excerpt} onChange={(event) => set("excerpt", event.target.value)} rows={5} className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50" />
            <Input type="date" aria-label="Publish date" value={form.date} onChange={(event) => set("date", event.target.value)} />
            <TagInput value={form.tags} onChange={(tags) => set("tags", tags)} suggestions={existingTags} placeholder="Add tags and press Enter" />
            <div className="rounded-xl border border-hairline p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Status
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={form.published ? "default" : "outline"}
                  onClick={() => set("published", true)}
                >
                  Published
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={!form.published ? "default" : "outline"}
                  onClick={() => set("published", false)}
                >
                  Draft
                </Button>
              </div>
            </div>
          </div>
        </aside>
        <section className="min-h-0 overflow-hidden bg-black p-3 sm:p-5">
          <div className="h-full overflow-hidden rounded-xl border border-hairline">
            <MarkdownEditor value={form.body} onChange={(value) => set("body", value ?? "")} height="100%" preview="live" />
          </div>
        </section>
      </div>
    </main>
  );
}
