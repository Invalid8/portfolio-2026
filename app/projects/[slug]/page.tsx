import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Code2 } from "lucide-react";
import { FeedNav } from "@/components/sections/feed-nav";
import { Markdown } from "@/components/markdown";
import { FeedFooter } from "@/components/sections/feed-footer";
import { AdminBar } from "@/components/admin-bar";
import { AdminLogin } from "@/components/admin-login";
import { Button } from "@/components/ui/button";
import { getProject } from "@/lib/cms/projects";
import { formatMonthYear } from "@/lib/format";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — Daniel Fadamitan`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const hasCaseStudy = Boolean(project.content && project.content.trim());

  return (
    <>
      <FeedNav backHref="/projects" backLabel="Back to projects" />
      <main className="relative z-10 mx-auto w-full max-w-4xl flex-1 px-6 pt-20 pb-24">
        <header className="mt-12 border-b border-hairline pb-10">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <span>{formatMonthYear(project.date ?? project.year)}</span>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-hairline px-2.5 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-6 font-display text-5xl font-medium leading-[1.02] tracking-[-0.04em] sm:text-7xl">
            {project.title}
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.link && (
              <Button asChild size="lg">
                <Link href={project.link} target="_blank" rel="noopener noreferrer">
                  Visit project <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            )}
            {project.github && (
              <Button asChild size="lg" variant="outline">
                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                  <Code2 className="size-4" /> Source
                </Link>
              </Button>
            )}
          </div>
        </header>

        {project.thumbnail && (
          <div className="mt-12 overflow-hidden rounded-2xl border border-hairline bg-surface-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.thumbnail}
              alt={`${project.title} preview`}
              className="aspect-video w-full object-cover"
            />
          </div>
        )}

        {hasCaseStudy ? (
          <article className="feed-prose mt-12">
            <Markdown source={project.content as string} />
          </article>
        ) : (
          <p className="mt-12 font-mono text-sm text-muted-foreground">
            No write-up for this project yet.
          </p>
        )}
      </main>
      <FeedFooter />
      <AdminBar />
      <AdminLogin />
    </>
  );
}
