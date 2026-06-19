import { Star } from "lucide-react";
import { Section, Eyebrow, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Card } from "@/components/ui/card";
import { testimonials as defaultTestimonials, type Testimonial } from "@/lib/content";

/**
 * Built and ready, but intentionally NOT mounted in app/page.tsx yet — there's
 * no real testimonial data. Mount it once `testimonials` is populated.
 */
export function Testimonials({
  items = defaultTestimonials,
}: {
  items?: Testimonial[];
}) {
  if (items.length === 0) return null;

  return (
    <Section id="testimonials" width="wide">
      <Reveal>
        <Eyebrow>kind words</Eyebrow>
        <SectionHeading lead="What clients" highlight="say" className="mt-4" />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((t, i) => (
          <Reveal key={t.id} delay={(i % 3) * 100}>
            <Card className="surface-card h-full gap-4 p-7">
              <div className="flex gap-1 text-lime">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="size-4 fill-current" />
                ))}
              </div>
              <p className="leading-relaxed text-foreground/90">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-auto">
                <p className="font-medium">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
