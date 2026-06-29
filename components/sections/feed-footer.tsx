"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EditableIdentityText, useIdentity } from "@/components/identity";

export function FeedFooter() {
  const identity = useIdentity();

  return (
    <footer className="relative z-10 border-t border-hairline">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/feed" className="font-display text-lg font-medium tracking-tight">
            The Feed<span className="text-lime">.</span>
          </Link>
          <p className="mt-1 text-sm text-muted-foreground">
            Notes by{" "}
            <EditableIdentityText fieldKey="name">
              {identity.name}
            </EditableIdentityText>
            .
          </p>
        </div>

        <nav aria-label="Feed footer" className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
          <Link href="/projects" className="transition-colors hover:text-foreground">Projects</Link>
          <Link href={identity.calendar} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-lime">
            Book a call <ArrowUpRight className="size-3.5" />
          </Link>
        </nav>

        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
