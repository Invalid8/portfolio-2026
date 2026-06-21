import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { EditableText } from "@/components/editable/editable-text";
import { hero, owner, tools } from "@/lib/content";

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
      className="relative z-10 mx-auto flex min-h-[730px] w-full max-w-[792px] flex-col px-6 pt-40 pb-14"
    >
      <Reveal>
        <div className="flex items-center gap-2 text-[10px] uppercase text-muted-foreground">
          <span className="grid size-8 place-items-center overflow-hidden rounded-md border border-white/40 bg-[#e5e5e5] text-[9px] font-semibold text-ink">DF</span>
          <span className="size-1.5 rounded-full bg-lime shadow-[0_0_8px_var(--lime)]" />
          {owner.available ? "Available for freelance" : "Currently unavailable"}
        </div>
      </Reveal>
      <Reveal delay={80}>
        <h1 className="mt-7 max-w-[17ch] font-display text-[2.65rem] font-medium leading-[1.08] tracking-[-0.035em] sm:text-[3.2rem]">
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

      <Reveal delay={240}>
        <div className="mt-7 flex flex-wrap items-center gap-2">
          <Button asChild size="lg" className="h-10 rounded-lg px-6 text-xs">
            <Link href="#contact">
              Let&apos;s talk <ArrowUpRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-10 rounded-lg px-6 text-xs"
          >
            <Link href="#work">View work</Link>
          </Button>
        </div>
      </Reveal>

      <Reveal delay={360}>
        <div className="mt-20 overflow-hidden mask-[linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
          <div className="marquee-track flex items-center gap-x-18">
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
                <span className="text-xl font-semibold text-muted-foreground">
                  {t.name}
                </span>
              </span>
            ))}
          </div>
        </div>
      </Reveal>

    </section>
  );
}
