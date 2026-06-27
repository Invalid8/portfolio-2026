import { compileMDX } from "next-mdx-remote/rsc";
import type { ComponentPropsWithoutRef } from "react";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { CodeCopyButton } from "@/components/code-copy-button";
import { remarkStyleStrings } from "@/lib/mdx/remark-style-strings";

function CodeBlock(props: ComponentPropsWithoutRef<"pre">) {
  return (
    <pre {...props} data-code-block>
      <CodeCopyButton />
      {props.children}
    </pre>
  );
}

/**
 * Server-rendered Markdown/MDX, shared by the feed posts and the project
 * case-study pages. Wrap the output in `.feed-prose` for the editorial styles.
 */
export async function Markdown({ source }: { source: string }) {
  const { content } = await compileMDX({
    source,
    components: {
      pre: CodeBlock,
    },
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
