"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { EditableText } from "@/components/editable/editable-text";
import { hero, tools } from "@/lib/content";
import { ADMIN_LOGIN_EVENT } from "@/lib/admin-login-event";
import { useIdentity } from "@/components/identity";

// A grayscale tech-logo strip under the hero (mirrors the reference's logo row).
const heroStack = tools;

function renderHeroHeadline(raw: string) {
  const words = raw.match(/\S+\s*/g) ?? [];

  if (words.length <= 4) return raw;

  const lead = words.slice(0, 4).join("");
  const tail = words.slice(4).join("");

  return (
    <>
      {lead}
      <span className="text-muted-foreground">{tail}</span>
    </>
  );
}

export function Hero() {
  const identity = useIdentity();
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didLongPress = useRef(false);

  function startAdminHold() {
    didLongPress.current = false;
    holdTimer.current = setTimeout(() => {
      didLongPress.current = true;
      window.dispatchEvent(new Event(ADMIN_LOGIN_EVENT));
      navigator.vibrate?.(30);
    }, 700);
  }

  function cancelAdminHold() {
    if (holdTimer.current) clearTimeout(holdTimer.current);
    holdTimer.current = null;
  }

  return (
    <section
      id="home"
      className="relative z-10 mx-auto flex min-h-svh w-full max-w-6xl flex-col justify-center px-6 pt-32 pb-16"
    >
      <Reveal delay={80}>
        <h1 className="max-w-[16ch] font-display text-5xl font-medium leading-[1.02] tracking-[-0.04em] sm:text-7xl">
          <EditableText
            collection="portfolio"
            sectionKey="hero"
            fieldKey="headline"
            renderValue={renderHeroHeadline}
          >
            {hero.headline}
          </EditableText>
        </h1>
      </Reveal>

      <Reveal delay={240}>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button asChild size="lg" className="h-12 rounded-xl px-7 text-sm">
            <Link
              href={identity.calendar}
              target="_blank"
              rel="noopener noreferrer"
            >
              Let&apos;s talk <ArrowUpRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-xl px-7 text-sm"
          >
            <Link
              href="#work"
              onPointerDown={startAdminHold}
              onPointerUp={cancelAdminHold}
              onPointerCancel={cancelAdminHold}
              onPointerLeave={cancelAdminHold}
              onContextMenu={(event) => event.preventDefault()}
              onClick={(event) => {
                if (!didLongPress.current) return;
                event.preventDefault();
                didLongPress.current = false;
              }}
            >
              View work
            </Link>
          </Button>
        </div>
      </Reveal>

      <Reveal delay={360}>
        <div className="mt-24 xl:mt-30 overflow-hidden mask-[linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
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
                <span className="text-3xl font-semibold text-muted-foreground">
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
