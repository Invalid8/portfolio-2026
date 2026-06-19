import { Section, Eyebrow, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { principles } from "@/lib/content";

export function Approach() {
  return (
    <Section id="approach" width="wide">
      <Reveal>
        <Eyebrow>how i work</Eyebrow>
        <SectionHeading lead="A few" highlight="principles" className="mt-4" />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {principles.map((p, i) => (
          <Reveal key={p.index} delay={i * 100}>
            <div className="surface-card flex h-full flex-col p-7">
              <span className="font-mono text-sm text-lime">{p.index}</span>
              <h3 className="mt-4 font-display text-xl font-medium tracking-tight">
                {p.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {p.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
