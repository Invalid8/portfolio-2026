import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { EditableText } from "@/components/editable/editable-text";
import { contact, owner, socials, nav } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="relative z-10 mt-16 overflow-hidden border-hairline"
    >
      <div className="mx-auto w-full max-w-6xl px-6 pt-24 pb-10">
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          {/* Heading + CTA */}
          <Reveal className="max-w-md">
            <h2 className="font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl">
              <EditableText
                collection="portfolio"
                sectionKey="contact"
                fieldKey="title"
              >
                {contact.title}
              </EditableText>
            </h2>
            <EditableText
              as="p"
              collection="portfolio"
              sectionKey="contact"
              fieldKey="subtitle"
              className="mt-6 block text-lg leading-relaxed text-muted-foreground"
            >
              {contact.subtitle}
            </EditableText>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-full px-5">
                <Link href={`mailto:${owner.email}`}>
                  <Mail className="size-4" /> Start a project
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-5"
              >
                <Link
                  href={owner.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>

          {/* Link columns */}
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-x-16 gap-y-8 sm:gap-x-24">
              <div>
                <p className="eyebrow">useful links</p>
                <nav aria-label="Footer" className="mt-5 flex flex-col gap-3">
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
              </div>
              <div>
                <p className="eyebrow">follow me</p>
                <div className="mt-5 flex flex-col gap-3">
                  {socials.map((s) => (
                    <Link
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Signature wordmark watermark — huge, full-bleed script flourish. */}
        <Reveal delay={200}>
          <p
            aria-hidden="true"
            className="pointer-events-none mt-16 -ml-45 xl:-ml-75 -mb-2 w-full select-none whitespace-nowrap text-center font-script leading-[0.8] text-foreground/[0.07]"
            style={{ fontSize: "clamp(4.5rem, 19vw, 16rem)" }}
          >
            {owner.name}
          </p>
        </Reveal>

        <div className="mt-8 flex flex-col justify-center gap-3 border-hairline pt-8 font-mono text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-betweend">
          <span>
            © {new Date().getFullYear()} {owner.name}. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
