import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { remarkStyleStrings } from "@/lib/mdx/remark-style-strings";

/**
 * Server-rendered Markdown/MDX, shared by the feed posts and the project
 * case-study pages. Wrap the output in `.feed-prose` for the editorial styles.
 */
export async function Markdown({ source }: { source: string }) {
  const { content } = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkStyleStrings],
        rehypePlugins: [
          rehypeSlug,
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
  return content;
}
