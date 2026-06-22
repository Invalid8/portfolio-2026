import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { SiteNav } from "@/components/sections/site-nav";
import { FeedFooter } from "@/components/sections/feed-footer";
import { AdminBar } from "@/components/admin-bar";
import { AdminLogin } from "@/components/admin-login";
import { getFeedPost } from "@/lib/cms/feed";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getFeedPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} — Daniel Fadamitan`,
    description: post.excerpt,
  };
}

export default async function FeedPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getFeedPost(slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.body,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          [
            rehypePrettyCode,
            {
              theme: "github-dark-default",
              keepBackground: false,
              defaultLang: "plaintext",
            },
          ],
        ],
      },
    },
  });

  return (
    <>
      <SiteNav />
      <main className="relative z-10 mx-auto w-full max-w-4xl flex-1 px-6 pt-36 pb-24">
        <Link href="/feed" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to the feed
        </Link>
        <header className="mt-12 border-b border-hairline pb-10">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <time dateTime={post.date}>{post.date}</time>
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-hairline px-2.5 py-1">{tag}</span>
            ))}
          </div>
          <h1 className="mt-6 max-w-3xl font-display text-5xl font-medium leading-[1.02] tracking-[-0.04em] sm:text-7xl">
            {post.title}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground">{post.excerpt}</p>
        </header>
        <article className="feed-prose mt-12">{content}</article>
      </main>
      <FeedFooter />
      <AdminBar />
      <AdminLogin />
    </>
  );
}
