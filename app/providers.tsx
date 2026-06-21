"use client";

import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  PageProvider,
  CmsAuthProvider,
  type Notifier,
  type ItemMap,
} from "@dalgoridim/headless-cms/client";
import { GoogleAuthProvider } from "@dalgoridim/headless-cms/auth/google/client";
import { googleClientId, googleEnabled, adminEmails } from "@/lib/auth";
import { storage } from "@/lib/storage";

const notify: Notifier = {
  success: (m) => toast.success(m),
  error: (m) => toast.error(m),
};


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
  initialItems,
}: {
  children: ReactNode;
  initialItems?: ItemMap;
}) {
  const page = (
    <PageProvider
      initialItems={initialItems}
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
