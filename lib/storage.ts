import { cloudinaryStorage } from "@dalgoridim/headless-cms/storage/cloudinary";

/**
 * Shared Cloudinary client storage. Used both by `PageProvider` (for inline
 * image replacement) and directly by edit dialogs that upload a file and need
 * the resulting URL (tool logos, project thumbnails). Uploads are signed by
 * `/api/admin/sign`, so only an admin can upload.
 */
export const storage = cloudinaryStorage({ folder: "portfolio-2026" });
