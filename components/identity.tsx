"use client";

import type { ReactNode } from "react";
import { usePageContext } from "@dalgoridim/headless-cms/client";
import { EditableText } from "@/components/editable/editable-text";
import { owner } from "@/lib/content";

export type Identity = typeof owner;

export function useIdentity() {
  const { items } = usePageContext();
  const identity = items.identity?.find((item) => item.id === "identity");
  return { ...owner, ...identity } as Identity;
}

export function EditableIdentityText({
  fieldKey,
  children,
  className,
}: {
  fieldKey: keyof Identity & string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <EditableText
      collection="identity"
      sectionKey="identity"
      fieldKey={fieldKey}
      className={className}
    >
      {children}
    </EditableText>
  );
}
