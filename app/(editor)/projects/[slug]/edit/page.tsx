import { ProjectContentEditor } from "@/components/project-content-editor";
import { requireEditorAdmin } from "@/lib/cms/editor-auth";

export default async function EditProjectContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireEditorAdmin();
  const { slug } = await params;
  return <ProjectContentEditor slug={slug} />;
}
