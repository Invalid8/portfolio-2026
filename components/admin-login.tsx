"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, ShieldCheck } from "lucide-react";
import {
  useGoogleAuth,
  GoogleSignInButton,
} from "@dalgoridim/headless-cms/auth/google/client";
import { googleEnabled } from "@/lib/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/**
 * Hidden admin sign-in via Google (built on `@react-oauth/google`). No visible
 * trigger on the public site — summon/dismiss with ⌘/Ctrl + Shift + . (period).
 * Only an authenticated admin's saves persist (the server `googleAuth` gate
 * verifies the Google ID token + ADMIN_EMAILS); everyone else can still toggle
 * edit mode for local edits.
 *
 * The real dialog only mounts when Google sign-in is configured; otherwise the
 * shortcut still responds with a helpful toast (so it's always verifiable). The
 * `googleEnabled` guard keeps `useGoogleAuth` from running without its provider.
 */
export function AdminLogin() {
  if (!googleEnabled) return <AdminLoginDisabled />;
  return <AdminLoginInner />;
}

/** ⌘/Ctrl + Shift + . — summon the admin dialog. */
function useSummonShortcut(onSummon: () => void) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!((e.metaKey || e.ctrlKey) && e.shiftKey)) return;
      // With Shift held, `e.key` is ">" on US layouts — match the physical key.
      if (e.code !== "Period") return;
      const el = e.target as HTMLElement | null;
      if (
        el &&
        (el.isContentEditable ||
          el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA")
      ) {
        return;
      }
      e.preventDefault();
      onSummon();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onSummon]);
}

/** Not configured: the shortcut still responds, with a helpful toast. */
function AdminLoginDisabled() {
  useSummonShortcut(() =>
    toast.error("Admin login unavailable", {
      description:
        "Set NEXT_PUBLIC_GOOGLE_CLIENT_ID in .env and restart the dev server.",
    }),
  );
  return null;
}

function AdminLoginInner() {
  const { user, isAdmin, logout } = useGoogleAuth();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useSummonShortcut(() => setOpen((v) => !v));

  function onLogout() {
    setLoggingOut(true);
    logout();
    toast.success("Signed out");
    setOpen(false);
    setLoggingOut(false);
  }

  return (
    <>
      {/* Visible only when signed in: signifies the admin session and opens the
          dialog (account details + Sign out). Hidden from ordinary visitors. */}
      {user && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/80 py-1.5 pr-3.5 pl-1.5 text-sm font-medium text-foreground shadow-lg backdrop-blur-md transition-colors hover:border-(--text-muted)"
        >
          {user.picture ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.picture}
              alt=""
              className="size-6 rounded-full"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="grid size-6 place-items-center rounded-full bg-lime text-ink">
              <ShieldCheck className="size-3.5" />
            </span>
          )}
          {isAdmin ? "Admin" : "Signed in"}
        </button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          {user ? (
            <>
              <DialogHeader>
                <DialogTitle>{isAdmin ? "Admin" : "Signed in"}</DialogTitle>
                <DialogDescription>
                  {user.email ?? "Signed in"} —{" "}
                  {isAdmin
                    ? "your edits save to the live site."
                    : "this account can't save (not an admin)."}
                </DialogDescription>
              </DialogHeader>
              <Button
                type="button"
                variant="outline"
                size="lg"
                disabled={loggingOut}
                onClick={onLogout}
              >
                {loggingOut && <Loader2 className="size-4 animate-spin" />}
                Sign out
              </Button>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Admin sign in</DialogTitle>
                <DialogDescription>
                  Sign in with Google to save your edits. Visitors can preview
                  edits without an account.
                </DialogDescription>
              </DialogHeader>
              <div className="flex min-h-11 items-center justify-center">
                <GoogleSignInButton
                  onError={() => toast.error("Google sign-in failed")}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
