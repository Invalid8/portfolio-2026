"use client";

import { Pencil, Check } from "lucide-react";
import { useCmsAuth } from "@dalgoridim/headless-cms/client";
import { cn } from "@/lib/utils";

/**
 * Edit-mode toggle, available to everyone (per the editing model). Visitors get
 * optimistic local edits; only a signed-in admin's saves persist server-side.
 */
export function EditToggle() {
  const { isEditing, toggleEdit } = useCmsAuth();

  return (
    <button
      type="button"
      onClick={toggleEdit}
      aria-pressed={isEditing}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium shadow-lg backdrop-blur-md transition-colors",
        isEditing
          ? "border-lime bg-lime text-ink"
          : "border-hairline bg-surface/80 text-foreground hover:border-(--text-muted)",
      )}
    >
      {isEditing ? <Check className="size-4" /> : <Pencil className="size-4" />}
      {isEditing ? "Done" : "Edit"}
    </button>
  );
}
