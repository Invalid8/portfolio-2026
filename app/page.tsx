import { SiteNav } from "@/components/sections/site-nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Tools } from "@/components/sections/tools";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Feed } from "@/components/sections/feed";
import { Approach } from "@/components/sections/approach";
import { SiteFooter } from "@/components/sections/site-footer";
import { AdminBar } from "@/components/admin-bar";
import { AdminLogin } from "@/components/admin-login";
import { JsonLd } from "@/components/json-ld";
import { owner, socials } from "@/lib/content";
import { getExperiences } from "@/lib/cms/experience";
import { getProjects } from "@/lib/cms/projects";
import { getTools } from "@/lib/cms/tools";
import { siteConfig } from "@/lib/seo";

export const revalidate = 300;

export default async function Home() {
  const [projects, tools, experiences] = await Promise.all([
    getProjects(),
    getTools(),
    getExperiences(),
  ]);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: owner.name,
          alternateName: owner.handle,
          url: siteConfig.url,
          email: `mailto:${owner.email}`,
          jobTitle: owner.role,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Lagos",
            addressCountry: "NG",
          },
          sameAs: socials.map((social) => social.href),
          knowsAbout: [
            "React",
            "Next.js",
            "TypeScript",
            "Web Accessibility",
            "Frontend Performance",
            "React Native",
          ],
        }}
      />
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Tools initialTools={tools} />
        <Projects limit={6} initialProjects={projects} />
        <Experience initialExperiences={experiences} />
        <Feed showViewAll limit={2} />
        <Approach />
      </main>
      <SiteFooter />
      <AdminBar />
      <AdminLogin />
    </>
  );
}
