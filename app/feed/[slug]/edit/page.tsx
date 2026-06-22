import { SiteNav } from "@/components/sections/site-nav";
import { FeedEditor } from "@/components/feed-editor";
import { AdminBar } from "@/components/admin-bar";
import { AdminLogin } from "@/components/admin-login";

export default async function EditFeedPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <>
      <SiteNav />
      <FeedEditor slug={slug} />
      <AdminBar />
      <AdminLogin />
    </>
  );
}
