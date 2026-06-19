import { Section, Eyebrow, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { services } from "@/lib/content";

export function Services() {
  return (
    <Section id="services">
      <Reveal>
        <Eyebrow>skills &amp; services</Eyebrow>
        <SectionHeading
          lead="What I"
          highlight="do"
          className="mt-4"
        />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
        {services.map((service, i) => (
          <Reveal key={service.index} delay={(i % 2) * 100}>
            <div className="group border-t border-hairline pt-6">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-sm text-lime">{service.index}</span>
                <h3 className="font-display text-xl font-medium tracking-tight">
                  {service.title}
                </h3>
              </div>
              <p className="mt-3 pl-10 leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
