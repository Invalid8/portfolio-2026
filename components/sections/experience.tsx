"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus, Pencil, X } from "lucide-react";
import { useCmsAuth, usePageContext } from "@dalgoridim/headless-cms/client";
import { Section, Eyebrow, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { experiences as staticExperiences } from "@/lib/content";
import { formatPeriod, formatMonthYear } from "@/lib/format";

type ExpItem = {
  id: string;
  role: string;
  company: string;
  href?: string;
  blurb: string;
  start: string;
  end: string;
};

const fallback: ExpItem[] = staticExperiences.map((e) => ({
  id: e.id,
  role: e.role,
  company: e.company,
  href: e.href,
  blurb: e.blurb,
  start: e.start,
  end: e.end,
}));

type FormState = {
  role: string;
  company: string;
  href: string;
  blurb: string;
  start: string;
  end: string;
};

function toForm(e?: ExpItem): FormState {
  return {
    role: e?.role ?? "",
    company: e?.company ?? "",
    href: e?.href ?? "",
    blurb: e?.blurb ?? "",
    start: e?.start ?? "",
    end: e?.end ?? "",
  };
}

export function Experience() {
  const { isAdmin, isEditing } = useCmsAuth();
  const { items: cmsItems, createItem, updateItem, deleteItem } = usePageContext();

  const live = (cmsItems.experiences as ExpItem[] | undefined) ?? [];
  const source = live.length ? live : fallback;
  // Always sorted by start date, most recent first.
  const items = [...source].sort((a, b) =>
    (b.start || "").localeCompare(a.start || ""),
  );
  const canEdit = isAdmin && isEditing && live.length > 0;

  const [editing, setEditing] = useState<
    { mode: "add" } | { mode: "edit"; item: ExpItem } | null
  >(null);
  const [form, setForm] = useState<FormState>(toForm());
  const set = (k: keyof FormState) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!editing || !form.role.trim()) return;
    const payload = {
      role: form.role.trim(),
      company: form.company.trim(),
      href: form.href.trim(),
      blurb: form.blurb.trim(),
      start: form.start,
      end: form.end,
    };
    if (editing.mode === "add") {
      createItem("experiences", { ...payload, order: source.length });
    } else {
      updateItem("experiences", editing.item.id, payload);
    }
    setEditing(null);
  }

  return (
    <Section id="experience" width="wide">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>career</Eyebrow>
            <SectionHeading
              lead="Where I've"
              highlight="worked"
              className="mt-4"
            />
          </div>
          {canEdit && (
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="rounded-full px-5"
              onClick={() => {
                setForm(toForm());
                setEditing({ mode: "add" });
              }}
            >
              <Plus className="size-4" /> Add role
            </Button>
          )}
        </div>
      </Reveal>

      <ol className="mt-12">
        {items.map((exp, i) => (
          <Reveal key={exp.id} delay={(i % 2) * 80}>
            <li className="group relative grid gap-x-10 gap-y-3 border-t border-hairline py-8 transition-colors sm:grid-cols-[15rem_1fr]">
              <span
                aria-hidden
                className="absolute top-0 left-0 h-px w-0 bg-lime transition-all duration-500 group-hover:w-24"
              />
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-lime">
                  {formatPeriod(exp.start, exp.end)}
                </p>
                {exp.href ? (
                  <Link
                    href={exp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {exp.company} <ArrowUpRight className="size-3.5" />
                  </Link>
                ) : (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {exp.company}
                  </p>
                )}
              </div>

              <div>
                <h3 className="font-display text-2xl font-medium tracking-tight">
                  {exp.role}
                </h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                  {exp.blurb}
                </p>
              </div>

              {canEdit && (
                <div className="absolute top-6 right-0 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setForm(toForm(exp));
                      setEditing({ mode: "edit", item: exp });
                    }}
                    aria-label={`Edit ${exp.role}`}
                    className="inline-flex size-8 items-center justify-center rounded-lg border border-hairline text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Pencil className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteItem("experiences", exp.id)}
                    aria-label={`Remove ${exp.role}`}
                    className="inline-flex size-8 items-center justify-center rounded-lg border border-hairline text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              )}
            </li>
          </Reveal>
        ))}
      </ol>

      {isAdmin && isEditing && live.length === 0 && (
        <p className="mt-6 font-mono text-xs text-muted-foreground">
          Run <code className="text-foreground">npm run seed</code> to enable
          editing your career history.
        </p>
      )}

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="gap-6 p-6 sm:max-w-2xl sm:p-8">
          <DialogHeader>
            <DialogTitle>
              {editing?.mode === "edit" ? "Edit role" : "Add role"}
            </DialogTitle>
            <DialogDescription>
              The list is sorted by start date automatically.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={save} className="flex flex-col gap-2.5">
            <Input
              placeholder="Role (e.g. Frontend Developer)"
              value={form.role}
              onChange={(e) => set("role")(e.target.value)}
              required
            />
            <Input
              placeholder="Company"
              value={form.company}
              onChange={(e) => set("company")(e.target.value)}
            />
            <Input
              type="url"
              placeholder="Company URL (optional)"
              value={form.href}
              onChange={(e) => set("href")(e.target.value)}
            />
            <div className="flex gap-2.5">
              <label className="flex flex-1 flex-col gap-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                Start{" "}
                <span className="normal-case opacity-70">
                  ({form.start ? formatMonthYear(form.start) : "Present"})
                </span>
                <Input
                  type="month"
                  value={form.start}
                  onChange={(e) => set("start")(e.target.value)}
                  required
                />
              </label>
              <label className="flex flex-1 flex-col gap-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                End{" "}
                <span className="normal-case opacity-70">
                  ({form.end ? formatMonthYear(form.end) : "Present"})
                </span>
                <Input
                  type="month"
                  value={form.end}
                  onChange={(e) => set("end")(e.target.value)}
                />
              </label>
            </div>
            <textarea
              placeholder="What you did there"
              value={form.blurb}
              onChange={(e) => set("blurb")(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
            <Button type="submit" size="lg">
              {editing?.mode === "edit" ? "Save changes" : "Add role"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Section>
  );
}
