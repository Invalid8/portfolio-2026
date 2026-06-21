"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  X,
  GripVertical,
  Pencil,
  ArrowUpRight,
  Code2,
} from "lucide-react";
import { useCmsAuth, usePageContext } from "@dalgoridim/headless-cms/client";
import { Section, Eyebrow, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TagInput } from "@/components/ui/tag-input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ImageUploadField } from "@/components/editable/image-upload-field";
import { projects as staticProjects, socials } from "@/lib/content";
import { formatMonthYear } from "@/lib/format";

type ProjectItem = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  link: string;
  github?: string;
  date?: string;
  year?: string | number;
  tags: string[];
  order?: number;
};

const fallback: ProjectItem[] = staticProjects.map((p, i) => ({
  id: p.id,
  title: p.title,
  description: p.description,
  thumbnail: p.thumbnail,
  link: p.link,
  github: p.github,
  date: `${p.year}-01`,
  tags: p.tags,
  order: i,
}));

const viewAllHref =
  socials.find((s) => /github/i.test(s.name))?.href ?? "#contact";

type FormState = {
  title: string;
  description: string;
  thumbnail: string;
  link: string;
  github: string;
  date: string;
  tags: string[];
};

function toForm(p?: ProjectItem): FormState {
  return {
    title: p?.title ?? "",
    description: p?.description ?? "",
    thumbnail: p?.thumbnail ?? "",
    link: p?.link ?? "",
    github: p?.github ?? "",
    date: p?.date ?? (p?.year ? `${p.year}-01` : ""),
    tags: p?.tags ?? [],
  };
}

export function Projects() {
  const { isAdmin, isEditing } = useCmsAuth();
  const { items: cmsItems, createItem, updateItem, deleteItem, reorderItems } =
    usePageContext();

  const live = (cmsItems.projects as ProjectItem[] | undefined) ?? [];
  const items = live.length ? live : fallback;
  const canEdit = isAdmin && isEditing && live.length > 0;

  const [dragId, setDragId] = useState<string | null>(null);
  const [detail, setDetail] = useState<ProjectItem | null>(null);
  const [editing, setEditing] = useState<
    { mode: "add" } | { mode: "edit"; item: ProjectItem } | null
  >(null);
  const [form, setForm] = useState<FormState>(toForm());
  const set = (k: keyof FormState) => (v: FormState[typeof k]) =>
    setForm((f) => ({ ...f, [k]: v }));

  function handleDrop(targetId: string) {
    if (!dragId || dragId === targetId) return;
    const ids = items.map((i) => i.id);
    const from = ids.indexOf(dragId);
    const to = ids.indexOf(targetId);
    if (from === -1 || to === -1) return;
    const [moved] = ids.splice(from, 1);
    if (moved === undefined) return;
    ids.splice(to, 0, moved);
    reorderItems("projects", ids);
    setDragId(null);
  }

  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!editing || !form.title.trim()) return;
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      thumbnail: form.thumbnail.trim(),
      link: form.link.trim(),
      github: form.github.trim(),
      date: form.date,
      year: Number(form.date.slice(0, 4)) || new Date().getFullYear(),
      tags: form.tags,
    };
    if (editing.mode === "add") {
      createItem("projects", { ...payload, order: items.length });
    } else {
      updateItem("projects", editing.item.id, payload);
    }
    setEditing(null);
  }

  return (
    <Section id="work" width="wide">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>selected work</Eyebrow>
            <SectionHeading lead="Featured" highlight="projects" className="mt-4" />
          </div>
          <Button asChild size="lg" className="rounded-full px-5">
            <Link href={viewAllHref} target="_blank" rel="noopener noreferrer">
              View all <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {items.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 100} className="h-full">
            <article
              draggable={canEdit}
              onDragStart={() => setDragId(p.id)}
              onDragOver={(e) => canEdit && e.preventDefault()}
              onDrop={() => handleDrop(p.id)}
              className={`surface-card group flex h-full flex-col overflow-hidden transition-colors hover:border-(--text-muted) ${
                dragId === p.id ? "opacity-50" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => setDetail(p)}
                className="relative block aspect-[16/10] w-full overflow-hidden border-b border-hairline bg-surface-2 text-left"
              >
                {p.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.thumbnail}
                    alt={`${p.title} preview`}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <span className="grid size-full place-items-center text-xs text-muted-foreground">
                    no image
                  </span>
                )}
                <span className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full bg-background/80 px-2.5 py-1 font-mono text-[11px] text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  View details <ArrowUpRight className="size-3" />
                </span>
                {canEdit && (
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-md bg-background/80 px-2 py-1 font-mono text-[10px] text-muted-foreground backdrop-blur-sm">
                    <GripVertical className="size-3" /> drag
                  </span>
                )}
              </button>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-medium tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                      {formatMonthYear(p.date ?? p.year)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {canEdit ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setForm(toForm(p));
                            setEditing({ mode: "edit", item: p });
                          }}
                          aria-label={`Edit ${p.title}`}
                          className="inline-flex size-9 items-center justify-center rounded-lg border border-hairline text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Pencil className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteItem("projects", p.id)}
                          aria-label={`Remove ${p.title}`}
                          className="inline-flex size-9 items-center justify-center rounded-lg border border-hairline text-muted-foreground transition-colors hover:text-destructive"
                        >
                          <X className="size-4" />
                        </button>
                      </>
                    ) : (
                      <Link
                        href={p.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${p.title}`}
                        className="inline-flex size-9 items-center justify-center rounded-lg border border-hairline text-foreground transition-colors hover:border-lime hover:bg-lime hover:text-ink"
                      >
                        <ArrowUpRight className="size-4" />
                      </Link>
                    )}
                  </div>
                </div>
                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  {p.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-hairline px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}

        {canEdit && (
          <button
            type="button"
            onClick={() => {
              setForm(toForm());
              setEditing({ mode: "add" });
            }}
            className="flex min-h-48 items-center justify-center gap-2 rounded-xl border border-dashed border-hairline text-sm text-muted-foreground transition-colors hover:border-(--text-muted) hover:text-foreground"
          >
            <Plus className="size-4" /> Add project
          </button>
        )}
      </div>

      {isAdmin && isEditing && live.length === 0 && (
        <p className="mt-6 font-mono text-xs text-muted-foreground">
          Run <code className="text-foreground">npm run seed</code> to enable
          editing, adding &amp; reordering projects.
        </p>
      )}

      {/* Detail view */}
      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent className="sm:max-w-lg">
          {detail && (
            <>
              <div className="-mx-4 -mt-4 mb-1 aspect-video overflow-hidden rounded-t-xl border-b border-hairline bg-surface-2">
                {detail.thumbnail && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={detail.thumbnail}
                    alt=""
                    className="size-full object-cover"
                  />
                )}
              </div>
              <DialogHeader>
                <DialogTitle className="flex items-baseline justify-between gap-3">
                  {detail.title}
                  <span className="font-mono text-xs text-muted-foreground">
                    {formatMonthYear(detail.date ?? detail.year)}
                  </span>
                </DialogTitle>
                <DialogDescription className="leading-relaxed">
                  {detail.description}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap gap-2">
                {detail.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-hairline px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-3">
                {detail.link && (
                  <Button asChild size="lg" className="rounded-full px-5">
                    <Link href={detail.link} target="_blank" rel="noopener noreferrer">
                      Visit <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                )}
                {detail.github && (
                  <Button asChild size="lg" variant="outline" className="rounded-full px-5">
                    <Link href={detail.github} target="_blank" rel="noopener noreferrer">
                      <Code2 className="size-4" /> Source
                    </Link>
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add / edit form */}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <ImageUploadField
            value={form.thumbnail}
            onChange={set("thumbnail")}
            variant="banner"
          />
          <DialogHeader>
            <DialogTitle>
              {editing?.mode === "edit" ? "Edit project" : "Add project"}
            </DialogTitle>
            <DialogDescription>
              Changes write to the live site.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={save} className="flex flex-col gap-2.5">
            <Input
              placeholder="Title"
              value={form.title}
              onChange={(e) => set("title")(e.target.value)}
              required
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => set("description")(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
            <div className="flex gap-2.5">
              <Input
                type="url"
                placeholder="Live URL (https://…)"
                value={form.link}
                onChange={(e) => set("link")(e.target.value)}
              />
              <Input
                type="month"
                aria-label="Project date"
                value={form.date}
                onChange={(e) => set("date")(e.target.value)}
                className="w-40 shrink-0"
              />
            </div>
            <Input
              type="url"
              placeholder="GitHub URL (https://…)"
              value={form.github}
              onChange={(e) => set("github")(e.target.value)}
            />
            <TagInput
              value={form.tags}
              onChange={set("tags")}
              placeholder="Add a tag and press Enter"
            />
            <Button type="submit" size="lg">
              {editing?.mode === "edit" ? "Save changes" : "Add project"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Section>
  );
}
