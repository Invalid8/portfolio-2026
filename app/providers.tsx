"use client";

import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  PageProvider,
  CmsAuthProvider,
  type Notifier,
  type NestedSections,
  type CollectionItem,
} from "@dalgoridim/headless-cms/client";
import { GoogleAuthProvider } from "@dalgoridim/headless-cms/auth/google/client";
import { cloudinaryStorage } from "@dalgoridim/headless-cms/storage/cloudinary";
import { googleClientId, googleEnabled, adminEmails } from "@/lib/auth";

const notify: Notifier = {
  success: (m) => toast.success(m),
  error: (m) => toast.error(m),
};

const storage = cloudinaryStorage({ folder: "portfolio-2026" });

/**
 * Fallback auth when Google sign-in isn't configured yet: visitors can still
 * toggle edit mode locally (optimistic edits), but `isAdmin` is false so saves
 * are rejected by the server gate — exactly the "anyone edits, only admin saves"
 * model, minus a real login.
 */
function LocalEditProvider({ children }: { children: ReactNode }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <CmsAuthProvider
      value={{ isAdmin: false, isEditing, toggleEdit: () => setIsEditing((v) => !v) }}
    >
      {children}
    </CmsAuthProvider>
  );
}

export function Providers({
  children,
  initialSections,
  initialCollections,
}: {
  children: ReactNode;
  initialSections?: NestedSections;
  initialCollections?: Record<string, CollectionItem[]>;
}) {
  const page = (
    <PageProvider
      initialSections={initialSections}
      initialCollections={initialCollections}
      apiBasePath="/api/admin"
      storage={storage}
      notify={notify}
    >
      {children}
    </PageProvider>
  );

  if (googleEnabled) {
    return (
      <GoogleAuthProvider clientId={googleClientId} adminEmails={adminEmails}>
        {page}
      </GoogleAuthProvider>
    );
  }

  return <LocalEditProvider>{page}</LocalEditProvider>;
}
