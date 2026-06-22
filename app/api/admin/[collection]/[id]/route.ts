import { cmsHandlers } from "@/lib/cms/server";

// Generic admin CRUD. Non-admin saves are rejected by the gate with 401.
export const { GET, PATCH, PUT, DELETE } = cmsHandlers;
