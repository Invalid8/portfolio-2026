import { Section, Eyebrow, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { skillGroups } from "@/lib/content";

export function Services() {
  return (
    <Section id="services" width="wide">
      <Reveal>
        <Eyebrow>skills &amp; services</Eyebrow>
        <SectionHeading lead="What I" highlight="do" className="mt-4" />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.category} delay={i * 100}>
            <div className="border-t border-hairline pt-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                {group.category}
              </p>
              <ul className="mt-5 space-y-3">
                {group.items.map((item, j) => (
                  <li
                    key={item}
                    className={
                      j === 0
                        ? "font-display text-lg tracking-tight text-foreground"
                        : "text-muted-foreground"
                    }
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
