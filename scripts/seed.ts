/**
 * Seed the local Postgres with the owner's content.
 *
 *   npm run db:up && npm run seed
 *
 * Idempotent (upserts), so re-running is safe. Writes:
 *   - portfolio/{hero,about,contact} + stats/services/experiences/principles
 *     (editable copy) → JSONB `documents` table
 *   - projects/* (full typed rows incl. year/order/tags) → typed `projects` table
 */
import "dotenv/config";
import { PostgresDataAdapter } from "@dalgoridim/headless-cms/adapters/postgres";
import { collections } from "../lib/cms/collections";
import { defaultSections } from "../lib/cms/sections";
import { projects, tools } from "../lib/content";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("✗ DATABASE_URL is required (is the DB up? `npm run db:up`)");
  process.exit(1);
}

const data = new PostgresDataAdapter({ connectionString, collections });

async function main() {
  console.log("🚀 Seeding Postgres…\n");
  await data.migrate();

  // Editable copy for every collection except projects (handled below with
  // full typed fields).
  const sections = defaultSections();
  for (const [collection, docs] of Object.entries(sections)) {
    if (collection === "projects") continue;
    for (const [id, doc] of Object.entries(docs)) {
      await data.upsert(collection, id, doc);
    }
    console.log(`✅ ${Object.keys(docs).length} ${collection}`);
  }

  // Projects: full typed rows (year/order are typed columns; tags → extra).
  for (const [i, p] of projects.entries()) {
    await data.upsert("projects", p.id, {
      collection: "projects",
      title: p.title,
      description: p.description,
      thumbnail: p.thumbnail,
      link: p.link,
      github: p.github ?? "",
      year: Number(p.year),
      order: i,
      tags: p.tags,
    });
  }
  console.log(`✅ ${projects.length} projects`);

  // Tools: typed rows (order is a typed column) keyed by their stable `key`.
  for (const [i, t] of tools.entries()) {
    await data.upsert("tools", t.key, {
      collection: "tools",
      name: t.name,
      category: t.category,
      img: t.img,
      color: t.color,
      order: i,
    });
  }
  console.log(`✅ ${tools.length} tools`);

  console.log("\n✨ Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
