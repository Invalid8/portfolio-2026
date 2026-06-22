"use client";

import { useState } from "react";
import { X } from "lucide-react";

/**
 * Chip-style tag editor. Type and press Enter (or comma) to add; click ✕ or
 * press Backspace on an empty field to remove. Value is a string array.
 */
export function TagInput({
  value,
  onChange,
  suggestions = [],
  placeholder = "Add a tag…",
}: {
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");

  function add(raw: string) {
    const tag = raw.trim().replace(/,$/, "");
    if (tag && !value.includes(tag)) onChange([...value, tag]);
    setDraft("");
  }

  const available = suggestions.filter(
    (tag) =>
      !value.includes(tag) &&
      (!draft || tag.toLowerCase().includes(draft.toLowerCase())),
  );

  return (
    <div className="rounded-lg border border-input bg-transparent p-2 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
      <div className="flex flex-wrap items-center gap-2">
      {value.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-full border border-hairline bg-surface-2 py-0.5 pr-1.5 pl-2.5 font-mono text-[11px] text-foreground"
        >
          {tag}
          <button
            type="button"
            onClick={() => onChange(value.filter((t) => t !== tag))}
            aria-label={`Remove ${tag}`}
            className="text-muted-foreground transition-colors hover:text-destructive"
          >
            <X className="size-3" />
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add(draft);
          } else if (e.key === "Backspace" && !draft && value.length) {
            onChange(value.slice(0, -1));
          }
        }}
        onBlur={() => draft && add(draft)}
        placeholder={value.length ? "" : placeholder}
        className="min-w-[6rem] flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
      </div>
      {available.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5 border-t border-hairline pt-2">
          <span className="mr-1 self-center font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
            Existing
          </span>
          {available.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => add(tag)}
              className="rounded-full border border-hairline bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-muted-foreground transition-colors hover:border-lime/50 hover:text-lime"
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
