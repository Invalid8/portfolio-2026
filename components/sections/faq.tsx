import { Section, Eyebrow, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs as defaultFaqs, type FaqItem } from "@/lib/content";

/**
 * Built and ready, but intentionally NOT mounted in app/page.tsx yet — there's
 * no real FAQ data. Mount it once `faqs` is populated.
 */
export function Faq({ items = defaultFaqs }: { items?: FaqItem[] }) {
  if (items.length === 0) return null;

  return (
    <Section id="faq">
      <Reveal>
        <Eyebrow>questions</Eyebrow>
        <SectionHeading lead="Got" highlight="questions?" className="mt-4" />
      </Reveal>

      <Reveal delay={100}>
        <Accordion type="single" collapsible className="mt-10 w-full">
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-left font-display text-lg tracking-tight">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  );
}
