"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nav } from "@/lib/content";
import { useIdentity } from "@/components/identity";

export function SiteNav() {
  const identity = useIdentity();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-5 z-50 flex justify-center px-6">
      <div className="w-full max-w-6xl">
        <nav
          aria-label="Primary"
          className="flex h-16 items-center justify-between gap-4 rounded-2xl border border-hairline bg-surface/90 pr-2.5 pl-7 shadow-lg shadow-black/20 backdrop-blur-md"
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-script text-2xl tracking-tight"
          >
            {identity.handle}
            <span className="text-lime">.</span>
          </Link>

          {/* Desktop links */}
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-3 md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`rounded-lg px-4 py-2 text-base transition-colors hover:bg-surface-2 hover:text-foreground ${
                    isActive(item.href)
                      ? "bg-surface-2 text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="hidden h-11 rounded-xl border border-hairline px-6 text-sm sm:inline-flex"
            >
              <Link href={identity.calendar} target="_blank" rel="noopener noreferrer">
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
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`block rounded-xl px-4 py-3 text-sm transition-colors hover:bg-surface-2 hover:text-foreground ${
                      isActive(item.href)
                        ? "bg-surface-2 text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-1 w-full rounded-xl">
              <Link href={identity.calendar} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                Let&apos;s talk <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
