import { fetchItems } from "@/lib/cms/data";
import { requireAdmin } from "@/lib/cms/server";

export async function GET(req: Request) {
  try {
    await requireAdmin(req);
    const items = await fetchItems();
    return Response.json(items);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    return Response.json({ error: message }, { status: 401 });
  }
}
