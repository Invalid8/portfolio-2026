"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

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
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal=""
      data-shown={shown ? "" : undefined}
      className={className}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
