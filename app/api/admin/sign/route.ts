import { cmsHandlers } from "@/lib/cms/server";

// Cloudinary signature endpoint for client-side uploads.
export const POST = cmsHandlers.sign;
