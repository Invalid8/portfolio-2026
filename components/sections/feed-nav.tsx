import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { owner } from "@/lib/content";

export function FeedNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6">
        <Link href="/" className="font-script text-2xl tracking-tight" aria-label="Back to home">
          {owner.handle}
          <span className="text-lime">.</span>
        </Link>

        <Link
          href="/feed"
          className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to the feed
        </Link>
      </div>
    </header>
  );
}
