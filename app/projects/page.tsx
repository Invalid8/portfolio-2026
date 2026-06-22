import type { Metadata } from "next";
import { SiteNav } from "@/components/sections/site-nav";
import { Projects } from "@/components/sections/projects";
import { SiteFooter } from "@/components/sections/site-footer";
import { AdminBar } from "@/components/admin-bar";
import { AdminLogin } from "@/components/admin-login";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  description:
    "Selected frontend, mobile, and product engineering work by Daniel Fadamitan.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1 pt-24">
        <Projects showViewAll={false} title="All" highlight="projects" />
      </main>
      <SiteFooter />
      <AdminBar />
      <AdminLogin />
    </>
  );
}
