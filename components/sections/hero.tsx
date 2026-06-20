import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { EditableText } from "@/components/editable/editable-text";
import { hero, tools } from "@/lib/content";

// A grayscale tech-logo strip under the hero (mirrors the reference's logo row).
const heroStack = tools.filter((t) =>
  [
    "typescript",
    "react",
    "nextjs",
    "tailwind",
    "node",
    "figma",
    "git",
  ].includes(t.key),
);

export function Hero() {
  return (
    <section
      id="home"
      className="relative z-10 mx-auto flex min-h-[92vh] w-full max-w-6xl flex-col justify-center px-6 pt-32 xl:pt-40 pb-16"
    >
      <Reveal delay={80}>
        <h1 className="mt-6 max-w-[16ch] font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">
          <EditableText
            collection="portfolio"
            sectionKey="hero"
            fieldKey="headlineLead"
          >
            {hero.headlineLead}
          </EditableText>{" "}
          <EditableText
            collection="portfolio"
            sectionKey="hero"
            fieldKey="headlineAccent"
          >
            {hero.headlineAccent}
          </EditableText>{" "}
          <EditableText
            collection="portfolio"
            sectionKey="hero"
            fieldKey="headlineTail"
            className="text-muted-foreground"
          >
            {hero.headlineTail}
          </EditableText>
        </h1>
      </Reveal>

      <Reveal delay={160}>
        <EditableText
          as="p"
          collection="portfolio"
          sectionKey="hero"
          fieldKey="subtitle"
          className="mt-8 block max-w-xl text-lg leading-relaxed text-muted-foreground"
        >
          {hero.subtitle}
        </EditableText>
      </Reveal>

      <Reveal delay={240}>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button asChild size="lg" className="rounded-full px-4 py-4">
            <Link href="#contact">
              Let&apos;s talk <ArrowUpRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full px-4 py-4"
          >
            <Link href="#work">View work</Link>
          </Button>
        </div>
      </Reveal>

      <Reveal delay={360}>
        <div className="mt-24 overflow-hidden mask-[linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
          <div className="marquee-track flex items-center gap-x-12">
            {[...heroStack, ...heroStack].map((t, i) => (
              <span
                key={`${t.key}-${i}`}
                aria-hidden={i >= heroStack.length}
                className="inline-flex shrink-0 items-center gap-2 opacity-60 grayscale transition-opacity hover:opacity-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.img}
                  alt=""
                  aria-hidden="true"
                  width={20}
                  height={20}
                  className="size-5"
                />
                <span className="text-3xl font-medium text-muted-foreground">
                  {t.name}
                </span>
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={420}>
        <Link
          href="#about"
          className="mt-22 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowDown className="size-3.5" /> Scroll
        </Link>
      </Reveal>
    </section>
  );
}
