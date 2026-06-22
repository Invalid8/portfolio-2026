"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useCmsAuth, usePageContext } from "@dalgoridim/headless-cms/client";
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
  const { isAdmin } = useCmsAuth();
  const { items: cmsItems, createItem, updateItem } = usePageContext();
  const posts = (cmsItems.feeds as FeedItem[] | undefined) ?? [];
  const post = posts.find((item) => item.slug === slug);
  const [form, setForm] = useState<FeedForm>(() =>
    post
      ? { title: post.title, slug: post.slug, excerpt: post.excerpt, body: post.body, date: post.date, tags: post.tags, published: post.published }
      : blank(),
  );
  const set = <K extends keyof FeedForm>(key: K, value: FeedForm[K]) => setForm((current) => ({ ...current, [key]: value }));

  if (!isAdmin) {
    return (
      <main className="grid min-h-svh place-items-center px-6">
        <div className="surface-card max-w-md p-8 text-center">
          <h1 className="font-display text-2xl">Admin access required</h1>
          <p className="mt-3 text-muted-foreground">Sign in as an administrator before opening the Feed editor.</p>
          <Button asChild className="mt-6"><Link href="/feed">Back to Feed</Link></Button>
        </div>
      </main>
    );
  }

  function save() {
    if (!form.title.trim()) return;
    const payload = { ...form, title: form.title.trim(), slug: slugify(form.slug || form.title), excerpt: form.excerpt.trim() };
    if (post) updateItem("feeds", post.id, payload);
    else createItem("feeds", { ...payload, order: posts.length });
    router.push("/feed");
  }

  return (
    <main className="flex h-svh flex-col overflow-hidden bg-background pt-24" data-color-mode="dark">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline px-6 py-4 sm:px-8">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="icon"><Link href="/feed" aria-label="Back to Feed"><ArrowLeft className="size-5" /></Link></Button>
          <div>
            <p className="font-display text-lg font-medium">{post ? "Edit post" : "New feed post"}</p>
            <p className="text-xs text-muted-foreground">Markdown and MDX supported</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex h-10 items-center gap-2 rounded-lg border border-input px-3 text-sm">
            <input type="checkbox" checked={form.published} onChange={(event) => set("published", event.target.checked)} /> Published
          </label>
          <Button type="button" onClick={save}><Save className="size-4" /> Save post</Button>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 lg:grid-cols-[22rem_1fr]">
        <aside className="overflow-y-auto border-r border-hairline p-6">
          <div className="flex flex-col gap-4">
            <Input placeholder="Title" value={form.title} onChange={(event) => set("title", event.target.value)} required />
            <Input placeholder="Slug (optional)" value={form.slug} onChange={(event) => set("slug", event.target.value)} />
            <textarea placeholder="Short excerpt" value={form.excerpt} onChange={(event) => set("excerpt", event.target.value)} rows={5} className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50" />
            <Input type="date" aria-label="Publish date" value={form.date} onChange={(event) => set("date", event.target.value)} />
            <TagInput value={form.tags} onChange={(tags) => set("tags", tags)} placeholder="Add tags and press Enter" />
          </div>
        </aside>
        <section className="min-h-0 overflow-hidden p-3 sm:p-5">
          <div className="h-full overflow-hidden rounded-xl border border-hairline">
            <MarkdownEditor value={form.body} onChange={(value) => set("body", value ?? "")} height="100%" preview="live" />
          </div>
        </section>
      </div>
    </main>
  );
}
