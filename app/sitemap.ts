import type { MetadataRoute } from "next";
import { getFeedPosts } from "@/lib/cms/feed";
import { getProjects } from "@/lib/cms/projects";
import { absoluteUrl, toIsoDate } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([getFeedPosts(), getProjects()]);

  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl("/images/og/home.png")],
    },
    {
      url: absoluteUrl("/projects"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/feed"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...projects
      .filter((project) => project.slug)
      .map((project) => ({
        url: absoluteUrl(`/projects/${encodeURIComponent(project.slug)}`),
        lastModified: toIsoDate(project.date),
        changeFrequency: "monthly" as const,
        priority: 0.8,
        ...(project.thumbnail
          ? {
              images: [
                /^https?:\/\//.test(project.thumbnail)
                  ? project.thumbnail
                  : absoluteUrl(project.thumbnail),
              ],
            }
          : {}),
      })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/feed/${encodeURIComponent(post.slug)}`),
      lastModified: toIsoDate(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
