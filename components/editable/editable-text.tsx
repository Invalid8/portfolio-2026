"use client";

import type { ElementType, ReactNode } from "react";
import { ContentEditSpan } from "@dalgoridim/headless-cms/client";
import { cn } from "@/lib/utils";

/**
 * Design-system skin over the headless `ContentEditSpan`. The outline/affordance
 * in edit mode is driven by the `data-cms-editing` / `data-cms-focused`
 * attributes the primitive sets (styled in globals.css).
 */
export function EditableText({
  collection,
  sectionKey,
  fieldKey,
  as,
  className,
  children,
}: {
  collection: string;
  sectionKey: string;
  fieldKey: string;
  as?: ElementType;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <ContentEditSpan
      collection={collection}
      itemId={sectionKey}
      fieldKey={fieldKey}
      as={as}
      className={cn("cms-editable", className)}
    >
      {children}
    </ContentEditSpan>
  );
}
