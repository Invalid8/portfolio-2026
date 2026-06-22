import { FeedEditor } from "@/components/feed-editor";
import { requireEditorAdmin } from "@/lib/cms/editor-auth";

export default async function EditFeedPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireEditorAdmin();
  const { slug } = await params;
  return <FeedEditor slug={slug} />;
}
