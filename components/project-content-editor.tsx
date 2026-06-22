"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, Save } from "lucide-react";
import { usePageContext } from "@dalgoridim/headless-cms/client";
import { Button } from "@/components/ui/button";

const MarkdownEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const STARTER = "## About this project\n\nStart writing the case study…";

type ProjectRow = { id: string; slug?: string; title?: string; content?: string };

/**
 * Edit a project's optional case-study `content` (Markdown/MDX). Reuses the
 * same editor chrome as the feed editor, but writes the single `content` field
 * on the `projects` collection. Saving stays on the page; "View" opens the
 * public case-study page.
 */
export function ProjectContentEditor({ slug }: { slug: string }) {
  const router = useRouter();
  const { items: cmsItems, updateItem } = usePageContext();
  const projects = (cmsItems.projects as ProjectRow[] | undefined) ?? [];
  const project = projects.find((p) => p.slug === slug || p.id === slug);

  const [body, setBody] = useState(() => project?.content || STARTER);
  const [savedSnapshot, setSavedSnapshot] = useState(() => project?.content || STARTER);
  const [saving, setSaving] = useState(false);
  const saved = useRef(false);
  const hasUnsavedChanges = body !== savedSnapshot;

  useEffect(() => {
    function warnBeforeUnload(event: BeforeUnloadEvent) {
      if (!hasUnsavedChanges || saved.current) return;
      event.preventDefault();
      event.returnValue = "";
    }
    window.addEventListener("beforeunload", warnBeforeUnload);
    return () => window.removeEventListener("beforeunload", warnBeforeUnload);
  }, [hasUnsavedChanges]);

  function leave() {
    if (
      hasUnsavedChanges &&
      !window.confirm("You have unsaved changes. Are you sure you want to leave?")
    ) {
      return;
    }
    saved.current = true;
    router.push(project?.slug ? `/p/${project.slug}` : "/projects");
  }

  async function save() {
    if (!project) return;
    setSaving(true);
    saved.current = true;
    try {
      await updateItem("projects", project.id, { content: body.trim() });
      setSavedSnapshot(body);
      saved.current = false;
    } catch {
      saved.current = false;
    } finally {
      setSaving(false);
    }
  }

  if (!project) {
    return (
      <main className="grid h-svh place-items-center bg-black px-6 text-center">
        <div>
          <p className="font-display text-lg">Project not found</p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/projects">Back to projects</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="feed-editor-shell flex h-svh flex-col overflow-hidden bg-black" data-color-mode="dark">
      <header className="flex min-h-20 flex-wrap items-center justify-between gap-4 border-b border-hairline bg-black px-6 py-4 sm:px-8">
        <div className="flex items-center gap-4">
          <Button type="button" variant="ghost" size="icon" onClick={leave} aria-label="Back to project">
            <ArrowLeft className="size-5" />
          </Button>
          <div>
            <p className="font-display text-lg font-medium">Case study</p>
            <p className="text-xs text-muted-foreground">{project.title} · Markdown and MDX supported</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {project.slug && (
            <Button asChild type="button" variant="outline">
              <Link href={`/p/${project.slug}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="size-4" /> View
              </Link>
            </Button>
          )}
          <Button type="button" onClick={save} disabled={!hasUnsavedChanges || saving}>
            <Save className="size-4" /> {saving ? "Saving…" : "Save"}
          </Button>
        </div>
      </header>

      <section className="min-h-0 flex-1 overflow-hidden bg-black p-3 sm:p-5">
        <div className="h-full overflow-hidden rounded-xl border border-hairline">
          <MarkdownEditor value={body} onChange={(value) => setBody(value ?? "")} height="100%" preview="live" />
        </div>
      </section>
    </main>
  );
}
