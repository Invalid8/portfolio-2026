import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { contact, owner, socials, nav } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer id="contact" className="relative z-10 mt-16 overflow-hidden border-t border-hairline">
      <div className="mx-auto w-full max-w-5xl px-6 pt-24 pb-10">
        <Reveal>
          <p className="eyebrow flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime" />
            contact
          </p>
          <h2 className="mt-6 max-w-[14ch] font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl">
            {contact.title}
            <span className="text-lime">.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            {contact.subtitle}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link href={`mailto:${owner.email}`}>
                <Mail className="size-4" /> {owner.email}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link href={owner.resume} target="_blank" rel="noopener noreferrer">
                Resume <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" /> {owner.location}
            </span>
            <span>{owner.phone}</span>
          </div>
        </Reveal>

        {/* Signature wordmark watermark */}
        <Reveal delay={280}>
          <p
            aria-hidden="true"
            className="pointer-events-none mt-16 select-none font-script text-7xl leading-none text-foreground/10 sm:text-[10rem]"
          >
            {owner.name}
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-6 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <Link
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="font-mono text-xs text-muted-foreground transition-colors hover:text-lime"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-8 font-mono text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} {owner.name}. Built with Next.js.
        </p>
      </div>
    </footer>
  );
}
