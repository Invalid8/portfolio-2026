"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nav, owner } from "@/lib/content";

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-6">
      <div className="w-full max-w-[744px]">
        <nav
          aria-label="Primary"
          className="flex h-10 items-center justify-between gap-4 rounded-xl border border-hairline bg-surface/90 pr-1 pl-5 shadow-lg shadow-black/20 backdrop-blur-md"
        >
          <Link
            href="#home"
            onClick={() => setOpen(false)}
            className="font-script text-xl tracking-tight"
          >
            {owner.handle}
            <span className="text-lime">.</span>
          </Link>

          {/* Desktop links */}
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-lg px-3 py-1.5 text-[11px] text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" variant="secondary" className="hidden h-8 rounded-lg border border-hairline px-4 text-[11px] sm:inline-flex">
              <Link href="#contact">
                Let&apos;s talk <ArrowUpRight className="size-3.5" />
              </Link>
            </Button>

            {/* Mobile toggle */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-9 items-center justify-center rounded-full border border-hairline text-foreground transition-colors hover:bg-surface-2 md:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="mt-2 overflow-hidden rounded-2xl border border-hairline bg-surface/95 p-2 shadow-lg shadow-black/20 backdrop-blur-md md:hidden">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-1 w-full rounded-xl">
              <Link href="#contact" onClick={() => setOpen(false)}>
                Let&apos;s talk <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
