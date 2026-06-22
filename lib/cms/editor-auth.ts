import "server-only";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { requireAdmin } from "./server";

export async function requireEditorAdmin() {
  const incoming = await headers();
  const request = new Request("http://localhost/feed/editor", {
    headers: incoming,
  });

  try {
    await requireAdmin(request);
  } catch {
    notFound();
  }
}
