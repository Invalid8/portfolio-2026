import { ImageResponse } from "next/og";
import { OgCard } from "@/components/og-card";
import { getProject } from "@/lib/cms/projects";
import { summarize } from "@/lib/seo";

export const alt = "Daniel Fadamitan project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  return new ImageResponse(
    <OgCard
      eyebrow="Selected project"
      title={project?.title ?? "Daniel Fadamitan's work"}
      description={summarize(
        project?.description ?? "Frontend and product engineering case study.",
        150,
      )}
      tags={project?.tags}
    />,
    size,
  );
}
