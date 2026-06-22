import { FeedEditor } from "@/components/feed-editor";
import { requireEditorAdmin } from "@/lib/cms/editor-auth";

export default async function NewFeedPostPage() {
  await requireEditorAdmin();
  return <FeedEditor />;
}
