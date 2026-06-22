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
import { JsonLd } from "@/components/json-ld";
import { getProject } from "@/lib/cms/projects";
import { formatMonthYear } from "@/lib/format";
import { absoluteUrl, siteConfig, summarize, toIsoDate } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) {
    return {
      title: "Project not found",
      robots: { index: false, follow: false },
    };
  }
  const path = `/p/${encodeURIComponent(slug)}`;
  const description = summarize(project.description);
  const image = absoluteUrl(`${path}/opengraph-image`);

  return {
    title: project.title,
    description,
    keywords: project.tags,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: "article",
      locale: siteConfig.locale,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      title: project.title,
      description,
      tags: project.tags,
      images: [{ url: image, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      creator: siteConfig.twitter,
      title: project.title,
      description,
      images: [image],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const hasCaseStudy = Boolean(project.content && project.content.trim());
  const projectUrl = absoluteUrl(`/p/${encodeURIComponent(slug)}`);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: summarize(project.description),
          url: projectUrl,
          image: project.thumbnail || undefined,
          dateCreated: toIsoDate(project.date),
          keywords: project.tags.join(", "),
          creator: {
            "@type": "Person",
            name: siteConfig.name,
            url: siteConfig.url,
          },
          sameAs: [project.link, project.github].filter(Boolean),
        }}
      />
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
