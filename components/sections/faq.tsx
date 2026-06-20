import { Section, Eyebrow } from "@/components/section";
import { Reveal } from "@/components/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs as defaultFaqs, type FaqItem } from "@/lib/content";

function FaqColumn({ items }: { items: FaqItem[] }) {
  return (
    <Accordion type="single" collapsible className="flex w-full flex-col gap-3">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className="rounded-xl border border-hairline bg-surface px-5 last:border-b"
        >
          <AccordionTrigger className="py-4 text-left font-display text-base tracking-tight hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="leading-relaxed text-muted-foreground">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/**
 * Built and ready, but intentionally NOT mounted in app/page.tsx yet — there's
 * no real FAQ data. Mount it once `faqs` is populated.
 */
export function Faq({ items = defaultFaqs }: { items?: FaqItem[] }) {
  if (items.length === 0) return null;

  // Two-column layout (matches the reference): split the list in half.
  const mid = Math.ceil(items.length / 2);
  const left = items.slice(0, mid);
  const right = items.slice(mid);

  return (
    <Section id="faq" width="wide">
      <Reveal>
        <Eyebrow>questions</Eyebrow>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
          Got any questions?
          <br />
          <span className="text-muted-foreground">We&apos;ve got answers.</span>
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-10 grid grid-cols-1 gap-x-12 md:grid-cols-2">
          <FaqColumn items={left} />
          <FaqColumn items={right} />
        </div>
      </Reveal>
    </Section>
  );
}
