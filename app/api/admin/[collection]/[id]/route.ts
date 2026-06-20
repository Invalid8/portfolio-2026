import { createCmsHandlers } from "@dalgoridim/headless-cms/server";
import { getDataAdapter, cmsAuth, cmsStorage } from "@/lib/cms/server";

// Generic admin CRUD. Non-admin saves are rejected by the gate with 401.
export const { GET, PATCH, PUT, DELETE } = createCmsHandlers({
  data: getDataAdapter(),
  auth: cmsAuth,
  storage: cmsStorage,
});
