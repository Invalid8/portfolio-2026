import { visit } from "unist-util-visit";
import * as acorn from "acorn";
import type { Plugin } from "unified";
import type { Root } from "mdast";

/** Build a JS object-literal source string from an inline CSS string. */
function styleStringToObjectSource(style: string): string {
  const entries = style
    .split(";")
    .map((decl) => {
      const [rawProp, ...rest] = decl.split(":");
      const prop = rawProp?.trim();
      const value = rest.join(":").trim();
      if (!prop || !value) return null;
      const camel = prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
      return `${JSON.stringify(camel)}: ${JSON.stringify(value)}`;
    })
    .filter(Boolean);
  return `{${entries.join(", ")}}`;
}

/**
 * MDX parses literal raw HTML (e.g. `<div style="text-align: justify">`) as JSX,
 * so a string `style` attribute reaches React and throws ("expects a mapping…").
 * This plugin rewrites such string `style` attributes into real expression
 * objects on every JSX element node so they render correctly.
 */
export const remarkStyleStrings: Plugin<[], Root> = () => (tree) => {
  visit(tree, (node: { type: string; attributes?: unknown[] }) => {
    if (
      node.type !== "mdxJsxFlowElement" &&
      node.type !== "mdxJsxTextElement"
    ) {
      return;
    }
    const attributes = node.attributes as Array<{
      type: string;
      name?: string;
      value?: unknown;
    }>;
    if (!Array.isArray(attributes)) return;

    for (const attr of attributes) {
      if (
        attr.type !== "mdxJsxAttribute" ||
        attr.name !== "style" ||
        typeof attr.value !== "string"
      ) {
        continue;
      }
      const source = styleStringToObjectSource(attr.value);
      const estree = acorn.parse(`(${source})`, {
        ecmaVersion: 2020,
        sourceType: "module",
      });
      attr.value = {
        type: "mdxJsxAttributeValueExpression",
        value: source,
        data: { estree },
      };
    }
  });
};
