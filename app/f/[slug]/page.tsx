import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeedNav } from "@/components/sections/feed-nav";
import { Markdown } from "@/components/markdown";
import { FeedFooter } from "@/components/sections/feed-footer";
import { AdminBar } from "@/components/admin-bar";
import { AdminLogin } from "@/components/admin-login";
import { JsonLd } from "@/components/json-ld";
import { ShareButton } from "@/components/share-button";
import { getFeedPost } from "@/lib/cms/feed";
import { absoluteUrl, siteConfig, summarize, toIsoDate } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

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
      <main className="relative z-10 mx-auto w-full max-w-4xl flex-1 px-6 pt-20 pb-24">
        <header className="mt-12 border-b border-hairline pb-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              <time dateTime={post.date}>{post.date}</time>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-hairline px-2.5 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
            <ShareButton
              title={post.title}
              text={post.excerpt}
              url={postUrl}
              className="shrink-0"
            />
          </div>
          <h1 className="mt-6 font-display text-5xl font-medium leading-[1.02] tracking-[-0.04em] sm:text-7xl">
            {post.title}
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
        </header>
        <article className="feed-prose mt-12">
          <Markdown source={post.body} />
        </article>
      </main>
      <FeedFooter />
      <AdminBar />
      <AdminLogin />
    </>
  );
}
