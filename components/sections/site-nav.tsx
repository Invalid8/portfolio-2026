import Link from "next/link";
import { Button } from "@/components/ui/button";
import { nav, owner } from "@/lib/content";

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Primary"
        className="grid w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-full border border-hairline bg-surface/70 py-4 pl-5 pr-4 backdrop-blur-md"
      >
        <Link
          href="#home"
          className="justify-self-start font-display text-md font-semibold tracking-tight"
        >
          {owner.handle}
          <span className="text-lime">.</span>
        </Link>

        <ul className="hidden items-center gap-1 sm:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Button
          asChild
          size="sm"
          className="justify-self-end rounded-full px-4 py-4"
        >
          <Link href="#contact">Let&apos;s talk</Link>
        </Button>
      </nav>
    </header>
  );
}
