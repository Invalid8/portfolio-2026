"use client";

import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { EditableText } from "@/components/editable/editable-text";
import { contact, socials, nav } from "@/lib/content";
import { EditableIdentityText, useIdentity } from "@/components/identity";

export function SiteFooter() {
  const identity = useIdentity();

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
                <Link href={identity.calendar} target="_blank" rel="noopener noreferrer">
                  <Calendar className="size-4" /> Book a meeting
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-5"
              >
                <Link
                  href={identity.resume}
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
            className="relative left-1/2 mt-16 -mb-2 w-screen -translate-x-1/2 whitespace-nowrap text-center font-script leading-[0.8] text-foreground/[0.07]"
            style={{ fontSize: "clamp(4.5rem, 19vw, 16rem)" }}
          >
            <EditableIdentityText fieldKey="name" className="select-text">
              {identity.name}
            </EditableIdentityText>
          </p>
        </Reveal>

        <div className="mt-8 flex justify-center border-hairline pt-8 font-mono text-[11px] text-muted-foreground">
          <span className="text-center">
            © {new Date().getFullYear()}{" "}
            <EditableIdentityText fieldKey="name">
              {identity.name}
            </EditableIdentityText>
            . All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
