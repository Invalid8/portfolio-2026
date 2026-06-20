import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { EditableText } from "@/components/editable/editable-text";
import { stats } from "@/lib/content";

export function Stats() {
  return (
    <Section className="py-12 sm:py-16">
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-3">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 100} className="bg-surface">
            <div className="flex h-full flex-col gap-2 p-8">
              <EditableText
                collection="stats"
                sectionKey={String(i)}
                fieldKey="value"
                className="font-display text-5xl font-semibold tracking-tight text-foreground sm:text-6xl"
              >
                {stat.value}
              </EditableText>
              <EditableText
                collection="stats"
                sectionKey={String(i)}
                fieldKey="label"
                className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
              >
                {stat.label}
              </EditableText>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
