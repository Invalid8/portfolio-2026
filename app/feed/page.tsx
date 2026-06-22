import type { Metadata } from "next";
import { SiteNav } from "@/components/sections/site-nav";
import { FeedFooter } from "@/components/sections/feed-footer";
import { Feed } from "@/components/sections/feed";
import { AdminBar } from "@/components/admin-bar";
import { AdminLogin } from "@/components/admin-login";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Feed",
  description:
    "Frontend engineering notes, lessons from shipping products, experiments, and useful observations by Daniel Fadamitan.",
  path: "/feed",
});

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
