import { createCmsHandlers } from "@dalgoridim/headless-cms/server";
import { getDataAdapter, cmsAuth, cmsStorage } from "@/lib/cms/server";

// Cloudinary signature endpoint for client-side uploads.
export const POST = createCmsHandlers({
  data: getDataAdapter(),
  auth: cmsAuth,
  storage: cmsStorage,
}).sign;
