import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, Eyebrow, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { experiences } from "@/lib/content";

export function Experience() {
  return (
    <Section id="experience">
      <Reveal>
        <Eyebrow>career</Eyebrow>
        <SectionHeading lead="Where I've" highlight="worked" className="mt-4" />
      </Reveal>

      <ol className="mt-12 space-y-0">
        {experiences.map((exp, i) => (
          <Reveal key={exp.id} delay={(i % 2) * 80}>
            <li className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-hairline py-7 sm:grid-cols-[10rem_1fr]">
              <span className="font-mono text-xs text-muted-foreground">
                {exp.period}
              </span>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="font-display text-lg font-medium tracking-tight">
                    {exp.role}
                  </h3>
                  <span className="text-muted-foreground">·</span>
                  {exp.href ? (
                    <Link
                      href={exp.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 text-lime transition-colors hover:text-lime-dim"
                    >
                      {exp.company}
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  ) : (
                    <span className="text-foreground">{exp.company}</span>
                  )}
                </div>
                <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">
                  {exp.blurb}
                </p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
