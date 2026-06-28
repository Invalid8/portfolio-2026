import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeedNav } from "@/components/sections/feed-nav";
import { Markdown } from "@/components/markdown";
import { FeedFooter } from "@/components/sections/feed-footer";
import { AdminBar } from "@/components/admin-bar";
import { AdminLogin } from "@/components/admin-login";
import { JsonLd } from "@/components/json-ld";
import { ShareButton } from "@/components/share-button";
import { getFeedPost, getFeedPosts } from "@/lib/cms/feed";
import { absoluteUrl, siteConfig, summarize, toIsoDate } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getFeedPosts();
  return posts
    .filter((post) => typeof post.slug === "string" && post.slug.length > 0)
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getFeedPost(slug);
  if (!post) {
    return {
      title: "Post not found",
      robots: { index: false, follow: false },
    };
  }
  const path = `/f/${encodeURIComponent(slug)}`;
  const description = summarize(post.excerpt || post.body);
  const image = absoluteUrl(`${path}/opengraph-image`);
  const publishedTime = toIsoDate(post.date);

  return {
    title: post.title,
    description,
    keywords: post.tags,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: "article",
      locale: siteConfig.locale,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      title: post.title,
      description,
      authors: [siteConfig.name],
      tags: post.tags,
      ...(publishedTime ? { publishedTime } : {}),
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      creator: siteConfig.twitter,
      title: post.title,
      description,
      images: [image],
    },
  };
}

export default async function FeedPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getFeedPost(slug);
  if (!post) notFound();

  const postUrl = absoluteUrl(`/f/${encodeURIComponent(slug)}`);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: summarize(post.excerpt || post.body),
          datePublished: toIsoDate(post.date),
          dateModified: toIsoDate(post.date),
          keywords: post.tags.join(", "),
          mainEntityOfPage: postUrl,
          url: postUrl,
          author: {
            "@type": "Person",
            name: siteConfig.name,
            url: siteConfig.url,
          },
          publisher: {
            "@type": "Person",
            name: siteConfig.name,
            url: siteConfig.url,
          },
        }}
      />
      <FeedNav />
      <main className="relative z-10 mx-auto w-full max-w-4xl flex-1 px-5 pt-20 pb-24 sm:px-6">
        <header className="mt-12 border-b border-hairline pb-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              <time dateTime={post.date}>{post.date}</time>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="max-w-full break-words rounded-full border border-hairline px-2.5 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
            <ShareButton
              title={post.title}
              text={post.excerpt}
              url={postUrl}
              className="shrink-0 self-start"
            />
          </div>
          <h1 className="mt-6 text-balance break-words font-display text-4xl font-medium leading-[1.04] tracking-tight sm:text-7xl">
            {post.title}
          </h1>
          <p className="mt-6 break-words text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {post.excerpt}
          </p>
        </header>
        <article className="feed-prose mt-12">
          <Markdown source={post.body} />
        </article>
      </main>
      <FeedFooter />
      <AdminBar showEdit={false} />
      <AdminLogin />
    </>
  );
}
