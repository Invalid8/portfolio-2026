"use client";

import { type ReactNode } from "react";

/**
 * Subtle scroll-in reveal: a small rise + fade the first time the element
 * enters the viewport. The visual state is CSS-driven (see `[data-reveal]` in
 * globals.css), so `prefers-reduced-motion` is honored there and there's no
 * synchronous setState in the effect.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      data-reveal=""
      data-shown=""
      className={className}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
