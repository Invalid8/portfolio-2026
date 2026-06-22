"use client";

import type { ReactNode } from "react";
import { toast } from "sonner";
import {
  AnonymousEditProvider,
  PageProvider,
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

  return <AnonymousEditProvider>{page}</AnonymousEditProvider>;
}
