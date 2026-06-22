"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileCheck, Save } from "lucide-react";
import { usePageContext } from "@dalgoridim/headless-cms/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TagInput } from "@/components/ui/tag-input";
import type { FeedItem } from "@/components/sections/feed";

const MarkdownEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type FeedForm = Omit<FeedItem, "id" | "order">;

const blank = (): FeedForm => ({
  title: "",
  slug: "",
  excerpt: "",
  body: "# New thought\n\nStart writing…",
  date: new Date().toISOString().slice(0, 10),
  tags: [],
  published: true,
});

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

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
  const [initialSnapshot] = useState(() => JSON.stringify(initialForm));
  const [saving, setSaving] = useState(false);
  const saved = useRef(false);
  const hasUnsavedChanges = JSON.stringify(form) !== initialSnapshot;
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
    if (published && !form.title.trim()) return;
    const title = form.title.trim() || "Untitled draft";
    const payload = {
      ...form,
      published,
      title,
      slug: slugify(form.slug || `${title}-${Date.now().toString(36)}`),
      excerpt: form.excerpt.trim(),
    };
    setSaving(true);
    saved.current = true;
    try {
      if (post) await updateItem("feeds", post.id, payload);
      else await createItem("feeds", { ...payload, order: posts.length });
      router.push("/feed");
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
            <p className="font-display text-lg font-medium">{post ? "Edit post" : "New feed post"}</p>
            <p className="text-xs text-muted-foreground">Markdown and MDX supported</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button type="button" variant="outline" onClick={() => save(false)} disabled={saving}><Save className="size-4" /> {saving ? "Saving…" : "Save draft"}</Button>
          <Button type="button" onClick={() => save(true)} disabled={!form.title.trim() || saving}><FileCheck className="size-4" /> Publish</Button>
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
