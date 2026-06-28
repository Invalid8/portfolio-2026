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
  BookOpen,
  ChevronLeft,
  ChevronRight,
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
import { projects as staticProjects } from "@/lib/content";
import { formatMonthYear } from "@/lib/format";

type ProjectItem = {
  id: string;
  slug?: string;
  title: string;
  description: string;
  thumbnail: string;
  link: string;
  github?: string;
  date?: string;
  year?: string | number;
  tags: string[];
  content?: string;
  order?: number;
};

const fallback: ProjectItem[] = staticProjects.map((p, i) => ({
  id: p.id,
  slug: p.slug,
  title: p.title,
  description: p.description,
  thumbnail: p.thumbnail,
  link: p.link,
  github: p.github,
  date: p.date ?? `${p.year}-01`,
  tags: p.tags,
  content: p.content,
  order: i,
}));

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

export function Projects({
  showViewAll = true,
  title = "Featured",
  highlight = "projects",
  limit,
  initialProjects = [],
}: {
  showViewAll?: boolean;
  title?: string;
  highlight?: string;
  /** Cap the number of project cards shown (e.g. the landing page). */
  limit?: number;
  initialProjects?: ProjectItem[];
} = {}) {
  const { isAdmin, isEditing } = useCmsAuth();
  const {
    items: cmsItems,
    createItem,
    updateItem,
    deleteItem,
    reorderItems,
  } = usePageContext();

  const live = (cmsItems.projects as ProjectItem[] | undefined) ?? [];
  const items = live.length ? live : initialProjects.length ? initialProjects : fallback;
  const canEdit = isAdmin && isEditing && live.length > 0;
  // Don't truncate while editing, so admins can still reorder/delete the full set.
  const visibleItems =
    typeof limit === "number" && !canEdit ? items.slice(0, limit) : items;

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

  function openAdd() {
    setForm(toForm());
    setEditing({ mode: "add" });
  }

  const detailIndex = detail
    ? items.findIndex((item) => item.id === detail.id)
    : -1;
  const previousProject =
    detailIndex >= 0
      ? items[(detailIndex - 1 + items.length) % items.length]
      : undefined;
  const nextProject =
    detailIndex >= 0 ? items[(detailIndex + 1) % items.length] : undefined;

  return (
    <Section id="work" width="wide">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>selected work</Eyebrow>
            <SectionHeading
              lead={title}
              highlight={highlight}
              className="mt-4"
            />
          </div>
          {showViewAll && (
            <Button asChild size="lg" className="rounded-full px-5">
              <Link href="/projects">
                View all <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          )}
          {!showViewAll && canEdit && (
            <Button type="button" size="lg" onClick={openAdd}>
              <Plus className="size-4" /> Add project
            </Button>
          )}
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {visibleItems.map((p, i) => (
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
                      {p.slug ? (
                        <Link
                          href={`/p/${p.slug}`}
                          className="transition-colors hover:text-lime"
                        >
                          {p.title}
                        </Link>
                      ) : (
                        p.title
                      )}
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
            onClick={openAdd}
            className="flex min-h-48 items-center justify-center gap-2 rounded-xl border border-dashed border-lime/40 bg-lime/10 text-sm font-medium text-lime transition-colors hover:border-lime hover:bg-lime/15"
          >
            <Plus className="size-4" /> Add project
          </button>
        )}
      </div>

      {isAdmin && isEditing && live.length === 0 && initialProjects.length === 0 && (
        <p className="mt-6 font-mono text-xs text-muted-foreground">
          Run <code className="text-foreground">npm run seed </code> to enable
          editing, adding &amp; reordering projects.
        </p>
      )}

      {/* Detail view */}
      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent className="max-h-[92svh] gap-0 overflow-visible border-0 bg-transparent p-0 shadow-none ring-0 sm:max-w-6xl">
          {detail && (
            <div className="grid max-h-[92svh] md:grid-cols-[1fr_3fr_1fr]">
              {previousProject && items.length > 1 && (
                <div className="hidden min-w-0 items-center md:flex">
                  <button
                    type="button"
                    onClick={() => setDetail(previousProject)}
                    className="group/side relative flex h-[85%] min-w-0 w-full flex-col overflow-hidden rounded-l-2xl border border-r-0 border-hairline bg-surface text-left shadow-2xl"
                  >
                    <div className="relative h-full overflow-hidden opacity-35 transition-opacity group-hover/side:opacity-60">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {previousProject.thumbnail && (
                        <img
                          src={previousProject.thumbnail}
                          alt=""
                          className="size-full object-cover"
                        />
                      )}
                      <span className="absolute inset-0 bg-black/65" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <ChevronLeft className="mb-3 size-5 text-lime" />
                      <p className="line-clamp-2 font-display text-lg">
                        {previousProject.title}
                      </p>
                      <p className="mt-2 font-mono text-[10px] uppercase text-muted-foreground">
                        Previous project
                      </p>
                    </div>
                  </button>
                </div>
              )}

              <div className="min-w-0 overflow-y-auto rounded-2xl border border-hairline bg-[#101011] shadow-2xl md:rounded-none">
                <div className="aspect-video overflow-hidden border-b border-hairline bg-surface-2">
                  {detail.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={detail.thumbnail}
                      alt={`${detail.title} project preview`}
                      className="size-full object-cover"
                    />
                  ) : (
                    <span className="grid size-full place-items-center text-muted-foreground">
                      No preview image
                    </span>
                  )}
                </div>
                <div className="p-6 sm:p-8">
                  <DialogHeader>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <span className="font-mono text-xs uppercase tracking-[0.14em] text-lime">
                        Project {detailIndex + 1} / {items.length}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {formatMonthYear(detail.date ?? detail.year)}
                      </span>
                    </div>
                    <DialogTitle className="mt-4 font-display text-3xl leading-tight tracking-tight sm:text-4xl">
                      {detail.title}
                    </DialogTitle>
                    <DialogDescription className="mt-3 max-w-2xl text-base leading-relaxed">
                      {detail.description}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {detail.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-hairline px-3 py-1 font-mono text-[11px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {detail.content?.trim() && detail.slug && (
                      <Button asChild size="lg">
                        <Link href={`/p/${detail.slug}`}>
                          Read case study <BookOpen className="size-4" />
                        </Link>
                      </Button>
                    )}
                    {detail.link && (
                      <Button
                        asChild
                        size="lg"
                        variant={detail.content?.trim() ? "outline" : "default"}
                      >
                        <Link
                          href={detail.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit project <ArrowUpRight className="size-4" />
                        </Link>
                      </Button>
                    )}
                    {detail.github && (
                      <Button asChild size="lg" variant="outline">
                        <Link
                          href={detail.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Code2 className="size-4" /> Source
                        </Link>
                      </Button>
                    )}
                    {canEdit && detail.slug && (
                      <Button asChild size="lg" variant="outline">
                        <Link href={`/projects/${detail.slug}/edit`}>
                          <Pencil className="size-4" />{" "}
                          {detail.content?.trim()
                            ? "Edit case study"
                            : "Write case study"}
                        </Link>
                      </Button>
                    )}
                  </div>
                  <div className="mt-8 flex items-center justify-between border-t border-hairline pt-5 md:hidden">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() =>
                        previousProject && setDetail(previousProject)
                      }
                      disabled={items.length < 2}
                    >
                      <ChevronLeft className="size-4" /> Previous
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => nextProject && setDetail(nextProject)}
                      disabled={items.length < 2}
                    >
                      Next <ChevronRight className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {nextProject && items.length > 1 && (
                <div className="hidden min-w-0 items-center md:flex">
                  <button
                    type="button"
                    onClick={() => setDetail(nextProject)}
                    className="group/side relative flex h-[85%] min-w-0 w-full flex-col overflow-hidden rounded-r-2xl border border-l-0 border-hairline bg-surface text-left shadow-2xl"
                  >
                    <div className="relative h-full overflow-hidden opacity-35 transition-opacity group-hover/side:opacity-60">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {nextProject.thumbnail && (
                        <img
                          src={nextProject.thumbnail}
                          alt=""
                          className="size-full object-cover"
                        />
                      )}
                      <span className="absolute inset-0 bg-black/65" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-5 text-right">
                      <ChevronRight className="mb-3 ml-auto size-5 text-lime" />
                      <p className="line-clamp-2 font-display text-lg">
                        {nextProject.title}
                      </p>
                      <p className="mt-2 font-mono text-[10px] uppercase text-muted-foreground">
                        Next project
                      </p>
                    </div>
                  </button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add / edit form */}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="gap-6 p-6 sm:max-w-2xl sm:p-8">
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
            <Input
              type="url"
              placeholder="Live URL (https://…)"
              value={form.link}
              onChange={(e) => set("link")(e.target.value)}
            />
            <Input
              type="url"
              placeholder="GitHub URL (https://…)"
              value={form.github}
              onChange={(e) => set("github")(e.target.value)}
            />
            <label className="flex flex-col gap-1.5 font-mono text-xs text-muted-foreground">
              Month &amp; year
              <Input
                type="month"
                aria-label="Project month and year"
                value={form.date}
                onChange={(e) => set("date")(e.target.value)}
              />
            </label>
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
