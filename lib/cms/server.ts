import "server-only";
import type { DataAdapter, AuthAdapter, ServerStorageAdapter } from "@dalgoridim/headless-cms/server";
import { createAdminGate, createCmsHandlers } from "@dalgoridim/headless-cms/server";
import { PostgresDataAdapter } from "@dalgoridim/headless-cms/adapters/postgres";
import { googleAuth } from "@dalgoridim/headless-cms/auth/google";
import { cloudinarySign } from "@dalgoridim/headless-cms/storage/cloudinary/server";
import { schema } from "@/lib/db/schema";

/**
 * One data backend: Postgres via the Drizzle-backed adapter. Every collection is
 * a typed table declared in `lib/db/schema.ts`; the adapter does DML only and
 * Drizzle Kit owns the DDL/migrations (one shared `schema`).
 */
let _data: DataAdapter | null = null;

export function getDataAdapter(): DataAdapter {
  if (_data) return _data;
  _data = new PostgresDataAdapter({
    connectionString: process.env.DATABASE_URL,
    schema,
  });
  return _data;
}

/**
 * Server admin gate: verifies the Google ID token from the cookie (locally,
 * against Google's public keys — no service account) and grants admin only to a
 * verified email in ADMIN_EMAILS. If GOOGLE_CLIENT_ID is unset, the token's
 * audience can't match, so every save is rejected — the correct local default.
 */
export const cmsAuth: AuthAdapter = googleAuth({
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
  adminEmails:
    process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()).filter(Boolean) ??
    [],
});

export const requireAdmin = createAdminGate(cmsAuth);

const cloudinaryConfigured = Boolean(
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET,
);

/** Cloudinary server signer (mounted at /api/admin/sign). Undefined until configured. */
export const cmsStorage: ServerStorageAdapter | undefined = cloudinaryConfigured
  ? cloudinarySign({
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET,
      folder: "portfolio-2026",
    })
  : undefined;

/** Shared route handlers so CRUD and signing use one configured CMS instance. */
export const cmsHandlers = createCmsHandlers({
  data: getDataAdapter(),
  auth: cmsAuth,
  storage: cmsStorage,
});
