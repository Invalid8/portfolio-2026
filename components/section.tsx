import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Centered content column with consistent vertical rhythm. */
export function Section({
  id,
  children,
  className,
  width = "default",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  width?: "default" | "wide";
}) {
  void width;
  return (
    <section
      id={id}
      className={cn(
        "relative z-10 mx-auto w-full max-w-6xl px-6 py-20 scroll-mt-24 sm:py-24",
        className,
      )}
    >
      {children}
    </section>
  );
}

/** The signature monospace "field-spec" eyebrow. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow flex items-center gap-2">
      {/* <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime" /> */}
      {children}
    </p>
  );
}

/** Two-tone section heading: white lead + accent/muted highlight. */
export function SectionHeading({
  lead,
  highlight,
  className,
}: {
  lead: string;
  highlight?: string;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-display text-3xl font-semibold tracking-tight sm:text-4xl",
        className,
      )}
    >
      {lead}{" "}
      {highlight ? (
        <span className="text-muted-foreground">{highlight}</span>
      ) : null}
    </h2>
  );
}
