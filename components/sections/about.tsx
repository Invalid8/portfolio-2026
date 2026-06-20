import { Section, Eyebrow } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { EditableText } from "@/components/editable/editable-text";
import { about, owner } from "@/lib/content";

export function About() {
  return (
    <Section id="about">
      <Reveal>
        <Eyebrow>about</Eyebrow>
      </Reveal>
      <Reveal delay={80}>
        <EditableText
          as="p"
          collection="portfolio"
          sectionKey="about"
          fieldKey="leading"
          className="mt-8 block font-display text-2xl leading-snug tracking-tight sm:text-3xl"
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
          className="mt-6 block max-w-2xl text-lg leading-relaxed text-muted-foreground"
        >
          {about.trailing}
        </EditableText>
      </Reveal>
      <Reveal delay={240}>
        <p className="mt-8 font-script text-4xl text-lime sm:text-5xl">
          {owner.name}
        </p>
      </Reveal>
    </Section>
  );
}
