import { Section, Eyebrow, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { tools } from "@/lib/content";

export function Tools() {
  return (
    <Section id="tools" width="wide">
      <Reveal>
        <Eyebrow>tools i use</Eyebrow>
        <SectionHeading lead="The everyday" highlight="kit" className="mt-4" />
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {tools.map((tool, i) => (
          <Reveal key={tool.key} delay={(i % 4) * 60}>
            <div className="surface-card flex items-center gap-3 p-4 transition-colors hover:border-[color:var(--text-muted)]">
              <span
                className="flex size-9 shrink-0 items-center justify-center rounded-md"
                style={{ backgroundColor: `${tool.color}1A` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tool.img}
                  alt=""
                  aria-hidden="true"
                  width={20}
                  height={20}
                  className="size-5"
                />
              </span>
              <span className="text-sm font-medium">{tool.name}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
