"use client";

import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { Check, Copy } from "lucide-react";

export function CodeCopyButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function copyCode(event: MouseEvent<HTMLButtonElement>) {
    const block = event.currentTarget.closest("[data-code-block]");
    const code = block?.querySelector("code")?.innerText;
    if (!code) return;

    await navigator.clipboard.writeText(code.trimEnd());
    setCopied(true);
  }

  const Icon = copied ? Check : Copy;

  return (
    <button
      type="button"
      className="code-copy-button"
      aria-label={copied ? "Code copied" : "Copy code"}
      title={copied ? "Copied" : "Copy code"}
      onClick={copyCode}
    >
      <Icon aria-hidden="true" />
    </button>
  );
}
