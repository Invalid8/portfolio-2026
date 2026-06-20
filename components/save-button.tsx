"use client";

import { Save, Loader2 } from "lucide-react";
import { useCmsAuth, usePageContext } from "@dalgoridim/headless-cms/client";

/**
 * Save affordance shown beside the Edit toggle only when a signed-in admin has
 * pending edits. Persists everything via `saveAll()` (which also uploads any
 * pending images); the PageProvider's `notify` surfaces success/error toasts.
 * Hidden for visitors — their local edits can't be saved by the server gate.
 */
export function SaveButton() {
  const { isAdmin } = useCmsAuth();
  const { hasUnsavedChanges, saving, saveAll } = usePageContext();

  if (!isAdmin || !hasUnsavedChanges) return null;

  return (
    <button
      type="button"
      onClick={() => saveAll()}
      disabled={saving}
      aria-busy={saving}
      className="inline-flex items-center gap-2 rounded-full border border-lime bg-lime px-4 py-2.5 text-sm font-medium text-ink shadow-lg backdrop-blur-md transition-opacity hover:opacity-90 disabled:opacity-70"
    >
      {saving ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Save className="size-4" />
      )}
      {saving ? "Saving…" : "Save"}
    </button>
  );
}
