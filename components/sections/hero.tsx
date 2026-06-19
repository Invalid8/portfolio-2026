import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { hero, owner } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="home"
      className="relative z-10 mx-auto flex min-h-[92vh] w-full max-w-5xl flex-col justify-center px-6 pt-32 pb-16"
    >
      <Reveal>
        <p className="eyebrow flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            {owner.available && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-60" />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
          </span>
          {owner.available ? "Available for new work" : "Currently booked"} · {owner.location}
        </p>
      </Reveal>

      <Reveal delay={80}>
        <h1 className="mt-6 max-w-[16ch] font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">
          {hero.headlineLead}{" "}
          <span className="text-lime">{hero.headlineAccent}</span>{" "}
          <span className="text-muted-foreground">{hero.headlineTail}</span>
        </h1>
      </Reveal>

      <Reveal delay={160}>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {hero.subtitle}
        </p>
      </Reveal>

      <Reveal delay={240}>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button asChild size="lg" className="rounded-full">
            <Link href="#contact">
              Let&apos;s talk <ArrowUpRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link href="#work">View work</Link>
          </Button>
        </div>
      </Reveal>

      <Reveal delay={360}>
        <Link
          href="#about"
          className="mt-20 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowDown className="size-3.5" /> Scroll
        </Link>
      </Reveal>
    </section>
  );
}
