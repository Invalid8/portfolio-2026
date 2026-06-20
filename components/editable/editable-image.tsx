"use client";

import { ImagePlus } from "lucide-react";
import { EditableImage as HeadlessEditableImage } from "@dalgoridim/headless-cms/client";
import { cn } from "@/lib/utils";

/**
 * Design-system skin over the headless `EditableImage` render-prop. Fills its
 * container. When not editing and `href` is set, the image links out; in edit
 * mode it shows a "Replace" overlay that opens the file picker (uploads via the
 * Cloudinary client storage on save).
 */
export function EditableImage({
  collection,
  docId,
  fieldKey,
  src,
  alt,
  href,
  className,
  imgClassName,
}: {
  collection: string;
  docId: string;
  fieldKey: string;
  src: string;
  alt: string;
  href?: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <HeadlessEditableImage
      collection={collection}
      docId={docId}
      sectionKey={docId}
      fieldKey={fieldKey}
      src={src}
      className={cn("relative block size-full", className)}
    >
      {({ imgProps, isEditing, openFilePicker, saving }) => {
        const img = (
          // Cloudinary-hosted, dynamically-swapped src — next/image's optimizer
          // doesn't fit the inline-edit flow, so a plain <img> is intentional.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            {...imgProps}
            alt={alt}
            className={cn("h-full w-full object-cover", imgClassName)}
          />
        );
        return (
          <>
            {!isEditing && href ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className="block size-full">
                {img}
              </a>
            ) : (
              img
            )}
            {isEditing && (
              <button
                type="button"
                onClick={openFilePicker}
                disabled={saving}
                className="absolute inset-0 z-10 flex items-center justify-center gap-2 bg-bg/55 text-sm font-medium text-foreground opacity-0 backdrop-blur-[1px] transition-opacity hover:opacity-100 focus-visible:opacity-100"
              >
                <ImagePlus className="size-4" />
                {saving ? "Uploading…" : "Replace image"}
              </button>
            )}
          </>
        );
      }}
    </HeadlessEditableImage>
  );
}
