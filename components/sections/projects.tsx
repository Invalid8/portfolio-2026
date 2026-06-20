import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";
import { Section, Eyebrow, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { EditableText } from "@/components/editable/editable-text";
import { EditableImage } from "@/components/editable/editable-image";
import { projects, socials } from "@/lib/content";

const viewAllHref =
  socials.find((s) => /github/i.test(s.name))?.href ?? "#contact";

export function Projects() {
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
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={(i % 2) * 100} className="h-full">
            <article className="group flex h-full flex-col">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-hairline bg-surface-2">
                <EditableImage
                  collection="projects"
                  docId={project.id}
                  fieldKey="thumbnail"
                  src={project.thumbnail}
                  alt={`${project.title} preview`}
                  href={project.link}
                  imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <EditableText
                    as="h3"
                    collection="projects"
                    sectionKey={project.id}
                    fieldKey="title"
                    className="font-display text-lg font-medium tracking-tight"
                  >
                    {project.title}
                  </EditableText>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-hairline px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} source`}
                      className="inline-flex size-9 items-center justify-center rounded-lg border border-hairline text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Code2 className="size-4" />
                    </Link>
                  )}
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.title}`}
                    className="inline-flex size-9 items-center justify-center rounded-lg border border-hairline text-foreground transition-colors hover:border-lime hover:bg-lime hover:text-ink"
                  >
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
