"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Upload, ImageIcon } from "lucide-react";
import { storage } from "@/lib/storage";
import { Input } from "@/components/ui/input";

/**
 * Image picker for edit dialogs: upload a file (signed Cloudinary upload) or
 * paste a URL. Calls `onChange` with the resulting image URL.
 *
 * - `variant="inline"` (default): a small thumbnail beside the controls.
 * - `variant="banner"`: a full-width image area at the top of a dialog, with the
 *   upload button overlaid and a URL field beneath.
 */
export function ImageUploadField({
  value,
  onChange,
  variant = "inline",
}: {
  value: string;
  onChange: (url: string) => void;
  variant?: "inline" | "banner";
}) {
  const [busy, setBusy] = useState(false);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const { url } = await storage.upload(file);
      onChange(url);
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  const uploadLabel = (full?: boolean) => (
    <label
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-hairline bg-surface/80 px-3 py-2 text-sm backdrop-blur-sm transition-colors hover:border-(--text-muted) ${
        busy ? "pointer-events-none opacity-60" : ""
      } ${full ? "w-full" : ""}`}
    >
      {busy ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Upload className="size-4" />
      )}
      {value ? "Replace image" : "Upload image"}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFile}
        disabled={busy}
      />
    </label>
  );

  if (variant === "banner") {
    return (
      <div className="-mx-4 -mt-4 mb-1">
        <div className="relative grid aspect-video w-full place-items-center overflow-hidden rounded-t-xl border-b border-hairline bg-surface-2">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="size-full object-cover" />
          ) : (
            <ImageIcon className="size-7 text-muted-foreground" />
          )}
          <div className="absolute right-3 bottom-3">{uploadLabel()}</div>
        </div>
        <Input
          placeholder="or paste an image URL"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mx-4 mt-3 w-[calc(100%-2rem)]"
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-lg border border-hairline bg-surface-2">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="size-full object-cover" />
        ) : (
          <ImageIcon className="size-5 text-muted-foreground" />
        )}
      </div>
      {uploadLabel()}
      <Input
        placeholder="or paste URL"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
