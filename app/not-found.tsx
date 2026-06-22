import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative z-10 grid min-h-svh place-items-center overflow-hidden px-6 py-20">
      <div aria-hidden className="absolute font-display text-[40vw] font-semibold leading-none text-foreground/[0.025]">404</div>
      <div className="relative max-w-xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-lime">404 · off the feed</p>
        <h1 className="mt-6 font-display text-5xl font-medium tracking-tight sm:text-7xl">Nothing lives here.</h1>
        <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
          The page may have moved, never existed, or was a thought I wisely kept to myself.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg"><Link href="/"><Home className="size-4" /> Go home</Link></Button>
          <Button asChild size="lg" variant="outline"><Link href="/feed"><ArrowLeft className="size-4" /> Browse the feed</Link></Button>
        </div>
      </div>
    </main>
  );
}
