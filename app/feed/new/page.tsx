import { SiteNav } from "@/components/sections/site-nav";
import { FeedEditor } from "@/components/feed-editor";
import { AdminBar } from "@/components/admin-bar";
import { AdminLogin } from "@/components/admin-login";

export default function NewFeedPostPage() {
  return (
    <>
      <SiteNav />
      <FeedEditor />
      <AdminBar />
      <AdminLogin />
    </>
  );
}
