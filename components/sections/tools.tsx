"use client";

import { useState } from "react";
import { Plus, X, GripVertical } from "lucide-react";
import { useCmsAuth, usePageContext } from "@dalgoridim/headless-cms/client";
import { Section, Eyebrow, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUploadField } from "@/components/editable/image-upload-field";
import { tools as staticTools } from "@/lib/content";

type ToolItem = {
  id: string;
  name: string;
  category: string;
  img: string;
  color: string;
};

const fallback: ToolItem[] = staticTools.map((t) => ({
  id: t.key,
  name: t.name,
  category: t.category,
  img: t.img,
  color: t.color,
}));

export function Tools() {
  const { isAdmin, isEditing } = useCmsAuth();
  const { items: cmsItems, createItem, deleteItem, reorderItems } =
    usePageContext();

  const live = (cmsItems.tools as ToolItem[] | undefined) ?? [];
  const items = live.length ? live : fallback;
  // Editing requires seeded rows (so we never overwrite the static fallback).
  const canEdit = isAdmin && isEditing && live.length > 0;

  const [dragId, setDragId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImg] = useState("");

  function handleDrop(targetId: string) {
    if (!dragId || dragId === targetId) return;
    const ids = items.map((i) => i.id);
    const from = ids.indexOf(dragId);
    const to = ids.indexOf(targetId);
    if (from === -1 || to === -1) return;
    const [moved] = ids.splice(from, 1);
    if (moved === undefined) return;
    ids.splice(to, 0, moved);
    reorderItems("tools", ids);
    setDragId(null);
  }

  function handleAdd() {
    if (!name.trim()) return;
    createItem("tools", {
      name: name.trim(),
      category: category.trim() || "Tool",
      img: img.trim(),
      color: "#8b8b90",
      order: items.length,
    });
    setName("");
    setCategory("");
    setImg("");
    setAddOpen(false);
  }

  return (
    <Section
      id="tools"
      width="wide"
      className="my-16 max-w-[744px] rounded-2xl border border-hairline bg-surface px-8 sm:px-12"
    >
      <Reveal>
        <Eyebrow>tools i use</Eyebrow>
        <SectionHeading lead="The everyday" highlight="kit" className="mt-4" />
        <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
          The stack I reach for to build fast, accessible, well-crafted products
          that stand out and ship on time.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((tool, i) => (
          <Reveal key={tool.id} delay={(i % 3) * 60}>
            <div
              draggable={canEdit}
              onDragStart={() => setDragId(tool.id)}
              onDragOver={(e) => canEdit && e.preventDefault()}
              onDrop={() => handleDrop(tool.id)}
              className={`group/tool relative flex items-center gap-4 rounded-xl border p-4 transition-colors ${
                i === 0 && !canEdit
                  ? "border-[color:var(--text-muted)] bg-surface-2"
                  : "border-hairline bg-surface hover:border-[color:var(--text-muted)]"
              } ${canEdit ? "cursor-grab active:cursor-grabbing" : ""} ${
                dragId === tool.id ? "opacity-50" : ""
              }`}
            >
              {canEdit && (
                <GripVertical className="size-4 shrink-0 text-muted-foreground" />
              )}
              <span
                className="flex size-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold text-foreground"
                style={{ backgroundColor: `${tool.color}1A` }}
              >
                {tool.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={tool.img}
                    alt=""
                    aria-hidden="true"
                    width={20}
                    height={20}
                    className="size-5"
                  />
                ) : (
                  tool.name.charAt(0)
                )}
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-medium leading-tight">
                  {tool.name}
                </span>
                <span className="mt-0.5 text-xs text-muted-foreground">
                  {tool.category}
                </span>
              </span>
              {canEdit && (
                <button
                  type="button"
                  onClick={() => deleteItem("tools", tool.id)}
                  aria-label={`Remove ${tool.name}`}
                  className="absolute top-2 right-2 inline-flex size-6 items-center justify-center rounded-md border border-hairline bg-surface text-muted-foreground opacity-0 transition-opacity group-hover/tool:opacity-100 hover:text-destructive"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          </Reveal>
        ))}

        {canEdit && (
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-hairline p-4 text-sm text-muted-foreground transition-colors hover:border-[color:var(--text-muted)] hover:text-foreground"
          >
            <Plus className="size-4" /> Add tool
          </button>
        )}
      </div>

      {isAdmin && isEditing && live.length === 0 && (
        <p className="mt-6 font-mono text-xs text-muted-foreground">
          Run <code className="text-foreground">npm run seed </code> to enable
          adding, removing &amp; reordering tools.
        </p>
      )}

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <ImageUploadField value={img} onChange={setImg} variant="banner" />
          <DialogHeader>
            <DialogTitle>Add a tool</DialogTitle>
            <DialogDescription>
              It&apos;s added to the end of the list — drag to reposition.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAdd();
            }}
            className="flex flex-col gap-2.5"
          >
            <Input
              placeholder="Name (e.g. Storybook)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              placeholder="Category (e.g. Tooling)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Button type="submit" size="lg">
              Add tool
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Section>
  );
}
