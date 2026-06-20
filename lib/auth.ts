// Client-safe auth config for Google Identity Services sign-in.
//
// The real admin gate lives server-side in `lib/cms/server.ts` (the `googleAuth`
// adapter verifies the Google ID token + checks ADMIN_EMAILS). These values only
// power the sign-in UI and an *optimistic* client-side `isAdmin`; the server
// remains authoritative. All are public by nature (a client ID and the owner's
// email), so exposing them via NEXT_PUBLIC is fine.

export const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

/** When false, the app runs in local-edit-only mode (no sign-in possible). */
export const googleEnabled = Boolean(googleClientId);

/** Optional allowlist for optimistic client `isAdmin`; server still enforces. */
export const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean);
