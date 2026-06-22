import type { Metadata } from "next";
import { SiteNav } from "@/components/sections/site-nav";
import { FeedFooter } from "@/components/sections/feed-footer";
import { Feed } from "@/components/sections/feed";
import { AdminBar } from "@/components/admin-bar";
import { AdminLogin } from "@/components/admin-login";

export const metadata: Metadata = {
  title: "Feed — Daniel Fadamitan",
  description: "Serious engineering notes, unserious observations, and everything in between.",
};

export default function FeedPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1 pt-24">
        <Feed />
      </main>
      <FeedFooter />
      <AdminBar />
      <AdminLogin />
    </>
  );
}
