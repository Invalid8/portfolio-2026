import { ImageResponse } from "next/og";
import { OgCard } from "@/components/og-card";
import { getFeedPost } from "@/lib/cms/feed";
import { summarize } from "@/lib/seo";

export const alt = "Daniel Fadamitan feed article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getFeedPost(slug);

  return new ImageResponse(
    <OgCard
      eyebrow="The feed"
      title={post?.title ?? "Daniel Fadamitan's feed"}
      description={summarize(
        post?.excerpt ?? "Frontend engineering notes, lessons, and observations.",
        150,
      )}
      tags={post?.tags}
    />,
    size,
  );
}
