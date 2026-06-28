"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  AnonymousEditProvider,
  PageProvider,
  useCmsAuth,
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

const editModeStorageKey = "portfolio:edit-mode";

function PersistEditMode() {
  const { isEditing, toggleEdit } = useCmsAuth();
  const hydrated = useRef(false);

  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;

      if (sessionStorage.getItem(editModeStorageKey) === "true" && !isEditing) {
        toggleEdit();
      }

      return;
    }

    sessionStorage.setItem(editModeStorageKey, String(isEditing));
  }, [isEditing, toggleEdit]);

  return null;
}

function CmsPageProvider({
  children,
  initialItems,
}: {
  children: ReactNode;
  initialItems?: ItemMap;
}) {
  const { isAdmin, isEditing } = useCmsAuth();
  const [items, setItems] = useState<ItemMap | undefined>(initialItems);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!isAdmin || !isEditing || items) return;

    let cancelled = false;

    fetch("/api/admin/bootstrap")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load CMS items");
        return response.json() as Promise<ItemMap>;
      })
      .then((nextItems) => {
        if (cancelled) return;
        setItems(nextItems);
        setVersion((value) => value + 1);
      })
      .catch((error) => {
        console.error("[cms] failed to bootstrap edit data:", error);
      });

    return () => {
      cancelled = true;
    };
  }, [isAdmin, isEditing, items]);

  return (
    <PageProvider
      key={version}
      initialItems={items}
      apiBasePath="/api/admin"
      storage={storage}
      notify={notify}
    >
      <PersistEditMode />
      {children}
    </PageProvider>
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
    <CmsPageProvider initialItems={initialItems}>{children}</CmsPageProvider>
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
