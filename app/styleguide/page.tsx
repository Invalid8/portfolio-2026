import { Button } from "@/components/ui/button";

const swatches = [
  { name: "bg", cls: "bg-bg" },
  { name: "surface", cls: "bg-surface" },
  { name: "surface-2", cls: "bg-surface-2" },
  { name: "hairline", cls: "bg-hairline" },
  { name: "lime", cls: "bg-lime" },
  { name: "muted", cls: "bg-[var(--text-muted)]" },
];

export default function StyleguidePage() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-3xl px-6 py-24 space-y-16">
      <header className="space-y-3">
        <p className="eyebrow">data-edit · styleguide</p>
        <h1 className="font-display text-5xl font-semibold tracking-tight">
          Visual system
        </h1>
        <p className="text-muted-foreground max-w-prose">
          Locking the dark, editorial, lime-accented look before building sections.
        </p>
      </header>

      {/* Color */}
      <section className="space-y-4">
        <p className="eyebrow">01 / color</p>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {swatches.map((s) => (
            <div key={s.name} className="space-y-2">
              <div
                className={`${s.cls} h-16 w-full rounded-md border border-hairline`}
              />
              <p className="font-mono text-xs text-muted-foreground">{s.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Type */}
      <section className="space-y-6">
        <p className="eyebrow">02 / type</p>
        <div className="space-y-2">
          <p className="font-mono text-xs text-muted-foreground">Display — Bricolage Grotesque</p>
          <p className="font-display text-6xl font-semibold tracking-tight leading-[0.95]">
            Frontend that <span className="text-lime">performs</span>
          </p>
        </div>
        <div className="space-y-2">
          <p className="font-mono text-xs text-muted-foreground">Body — Geist Sans</p>
          <p className="max-w-prose text-lg leading-relaxed text-muted-foreground">
            A Nigeria-based frontend developer building accessible, user-friendly
            web applications with React, Next.js, and TypeScript.
          </p>
        </div>
        <div className="space-y-2">
          <p className="font-mono text-xs text-muted-foreground">Mono — Geist Mono</p>
          <p className="font-mono text-sm">
            {'const stack = ["react", "next", "typescript"];'}
          </p>
        </div>
        <div className="space-y-2">
          <p className="font-mono text-xs text-muted-foreground">Script — Allura (signature)</p>
          <p className="font-script text-6xl text-lime">Daniel Fadamitan</p>
        </div>
      </section>

      {/* Buttons */}
      <section className="space-y-4">
        <p className="eyebrow">03 / actions</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button className="rounded-full">Let&apos;s talk</Button>
          <Button variant="outline" className="rounded-full">
            View work
          </Button>
          <Button variant="secondary" className="rounded-full">
            Secondary
          </Button>
          <Button variant="ghost" className="rounded-full">
            Ghost
          </Button>
        </div>
      </section>

      {/* Card */}
      <section className="space-y-4">
        <p className="eyebrow">04 / surface</p>
        <div className="surface-card p-6">
          <p className="eyebrow mb-2">hairline-bordered card</p>
          <p className="font-display text-2xl font-medium">Selected work</p>
          <p className="mt-1 text-muted-foreground">
            Rounded ~14px, hairline border, sits on the near-black canvas.
          </p>
        </div>
      </section>
    </main>
  );
}
