import { SiteNav } from "@/components/sections/site-nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Tools } from "@/components/sections/tools";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Approach } from "@/components/sections/approach";
// import { Testimonials } from "@/components/sections/testimonials";
// import { Faq } from "@/components/sections/faq";
import { SiteFooter } from "@/components/sections/site-footer";
import { AdminBar } from "@/components/admin-bar";
import { AdminLogin } from "@/components/admin-login";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Tools />
        <Projects limit={6} />
        <Experience />
        <Approach />
        {/* <Testimonials />
        <Faq /> */}
      </main>
      <SiteFooter />
      <AdminBar />
      <AdminLogin />
    </>
  );
}
