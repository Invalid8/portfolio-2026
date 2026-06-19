import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";
import { Section, Eyebrow, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/content";

export function Projects() {
  return (
    <Section id="work" width="wide">
      <Reveal>
        <div className="flex items-end justify-between gap-6">
          <div>
            <Eyebrow>selected work</Eyebrow>
            <SectionHeading
              lead="Featured"
              highlight="projects"
              className="mt-4"
            />
          </div>
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={(i % 2) * 100} className="h-full">
            <article className="group surface-card flex h-full flex-col overflow-hidden">
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-hairline bg-surface-2">
                  <Image
                    src={project.thumbnail}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-xl font-medium tracking-tight">
                      {project.title}
                    </h3>
                    <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                      {project.year}
                      <ArrowUpRight className="size-4 text-lime opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-hairline px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
              {project.github && (
                <div className="border-t border-hairline px-6 py-3">
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Code2 className="size-3.5" /> Source
                  </Link>
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
