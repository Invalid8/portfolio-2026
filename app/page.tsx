import { SiteNav } from "@/components/sections/site-nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Stats } from "@/components/sections/stats";
import { Services } from "@/components/sections/services";
import { Tools } from "@/components/sections/tools";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Approach } from "@/components/sections/approach";
import { SiteFooter } from "@/components/sections/site-footer";

// Built but unmounted (no source data yet): Testimonials, Faq.
// import { Testimonials } from "@/components/sections/testimonials";
// import { Faq } from "@/components/sections/faq";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <About />
        <Stats />
        <Services />
        <Tools />
        <Projects />
        <Experience />
        <Approach />
      </main>
      <SiteFooter />
    </>
  );
}
