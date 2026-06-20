import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, Eyebrow, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { EditableText } from "@/components/editable/editable-text";
import { experiences } from "@/lib/content";

export function Experience() {
  return (
    <Section id="experience">
      <Reveal>
        <Eyebrow>career</Eyebrow>
        <SectionHeading lead="Where I've" highlight="worked" className="mt-4" />
      </Reveal>

      <ol className="mt-12 ml-1 border-l border-hairline">
        {experiences.map((exp, i) => (
          <Reveal key={exp.id} delay={(i % 2) * 80}>
            <li className="relative pb-11 pl-8 last:pb-0">
              {/* Timeline node on the vertical rail. */}
              <span
                aria-hidden
                className="absolute top-1 -left-[5px] size-2.5 rounded-full border border-hairline bg-surface"
              />
              <EditableText
                collection="experiences"
                sectionKey={exp.id}
                fieldKey="period"
                className="font-mono text-[11px] uppercase tracking-[0.16em] text-lime"
              >
                {exp.period}
              </EditableText>
              <div>
                <div className="mt-2 flex flex-wrap items-baseline gap-x-3">
                  <EditableText
                    as="h3"
                    collection="experiences"
                    sectionKey={exp.id}
                    fieldKey="role"
                    className="font-display text-lg font-medium tracking-tight"
                  >
                    {exp.role}
                  </EditableText>
                  <span className="text-muted-foreground">·</span>
                  {exp.href ? (
                    <Link
                      href={exp.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 text-lime transition-colors hover:text-lime-dim"
                    >
                      <EditableText
                        collection="experiences"
                        sectionKey={exp.id}
                        fieldKey="company"
                      >
                        {exp.company}
                      </EditableText>
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  ) : (
                    <EditableText
                      collection="experiences"
                      sectionKey={exp.id}
                      fieldKey="company"
                      className="text-foreground"
                    >
                      {exp.company}
                    </EditableText>
                  )}
                </div>
                <EditableText
                  as="p"
                  collection="experiences"
                  sectionKey={exp.id}
                  fieldKey="blurb"
                  className="mt-2 block max-w-xl leading-relaxed text-muted-foreground"
                >
                  {exp.blurb}
                </EditableText>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
