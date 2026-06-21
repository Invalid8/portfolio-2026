import type { Metadata } from "next";
import { SiteNav } from "@/components/sections/site-nav";
import { Projects } from "@/components/sections/projects";
import { SiteFooter } from "@/components/sections/site-footer";
import { AdminBar } from "@/components/admin-bar";
import { AdminLogin } from "@/components/admin-login";

export const metadata: Metadata = {
  title: "Projects — Daniel Fadamitan",
  description: "Selected frontend, mobile, and product engineering work by Daniel Fadamitan.",
};

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
