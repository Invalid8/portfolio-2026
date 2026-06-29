"use client";

import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { EditableText } from "@/components/editable/editable-text";
import { about, stats } from "@/lib/content";
import { EditableIdentityText, useIdentity } from "@/components/identity";

export function About() {
  const identity = useIdentity();

  return (
    <Section id="about" className="py-14 sm:py-20">
      <div className="surface-card px-7 py-10 sm:px-12 sm:py-14">
      <Reveal delay={80}>
        <EditableText
          as="p"
          collection="portfolio"
          sectionKey="about"
          fieldKey="leading"
          className="block font-display text-lg leading-relaxed tracking-tight sm:text-xl"
        >
          {about.leading}
        </EditableText>
      </Reveal>
      <Reveal delay={160}>
        <EditableText
          as="p"
          collection="portfolio"
          sectionKey="about"
          fieldKey="trailing"
          className="mt-1 block max-w-2xl text-lg leading-relaxed text-muted-foreground"
        >
          {about.trailing}
        </EditableText>
      </Reveal>
      <Reveal delay={240}>
        <p className="mt-6 font-script text-4xl text-foreground sm:text-5xl">
          <EditableIdentityText fieldKey="name">
            {identity.name}
          </EditableIdentityText>
        </p>
      </Reveal>
      <div className="mt-10 grid grid-cols-3 gap-5 sm:mt-12 sm:gap-10">
        {stats.map((stat, i) => (
          <div key={stat.label}>
            <EditableText collection="stats" sectionKey={String(i)} fieldKey="value" className="font-display text-3xl tracking-tight sm:text-5xl">
              {stat.value}
            </EditableText>
            <EditableText collection="stats" sectionKey={String(i)} fieldKey="label" className="mt-2 block font-mono text-[8px] uppercase leading-relaxed text-muted-foreground sm:text-[9px]">
              {stat.label}
            </EditableText>
          </div>
        ))}
      </div>
      </div>
    </Section>
  );
}
