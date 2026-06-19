import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { stats } from "@/lib/content";

export function Stats() {
  return (
    <Section className="py-12 sm:py-16">
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-3">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 100} className="bg-surface">
            <div className="flex h-full flex-col gap-2 p-8">
              <span className="font-display text-5xl font-semibold tracking-tight text-lime">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
