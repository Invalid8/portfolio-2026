/**
 * Seed the local Postgres with the owner's content.
 *
 *   npm run db:up && npm run db:setup   (migrate + seed)
 *
 * Idempotent (upserts), so re-running is safe. Schema (DDL) is owned by Drizzle
 * Kit — run `npm run db:migrate` first. This script only writes data:
 *   - portfolio/{hero,about,contact} + stats + principles (editable copy)
 *   - projects / experiences / tools (full typed rows incl. order/tags)
 */
import "dotenv/config";
import { PostgresDataAdapter } from "@dalgoridim/headless-cms/adapters/postgres";
import { schema } from "../lib/db/schema";
import { defaultItems } from "../lib/cms/sections";
import { projects, tools, experiences, feedPosts } from "../lib/content";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("✗ DATABASE_URL is required (is the DB up? `npm run db:up`)");
  process.exit(1);
}

const data = new PostgresDataAdapter({ connectionString, schema });

async function main() {
  console.log("🚀 Seeding Postgres…\n");

  // Editable section copy (portfolio, stats, principles).
  for (const [collection, items] of Object.entries(defaultItems())) {
    for (const item of items) {
      await data.upsert(collection, item.id, item);
    }
    console.log(`✅ ${items.length} ${collection}`);
  }

  // Projects: full typed rows (year/order numeric columns; tags a text[] column).
  for (const [i, p] of projects.entries()) {
    await data.upsert("projects", p.id, {
      title: p.title,
      description: p.description,
      thumbnail: p.thumbnail,
      link: p.link,
      github: p.github ?? "",
      date: `${p.year}-01`,
      year: Number(p.year),
      order: i,
      tags: p.tags,
    });
  }
  console.log(`✅ ${projects.length} projects`);

  // Experiences: typed rows; sorted by `start` (YYYY-MM) descending at read time.
  for (const [i, e] of experiences.entries()) {
    await data.upsert("experiences", e.id, {
      role: e.role,
      company: e.company,
      href: e.href ?? "",
      blurb: e.blurb,
      start: e.start,
      end: e.end,
      order: i,
    });
  }
  console.log(`✅ ${experiences.length} experiences`);

  // Tools: typed rows (order numeric column) keyed by their stable `key`.
  for (const [i, t] of tools.entries()) {
    await data.upsert("tools", t.key, {
      name: t.name,
      category: t.category,
      img: t.img,
      color: t.color,
      order: i,
    });
  }
  console.log(`✅ ${tools.length} tools`);

  for (const [i, post] of feedPosts.entries()) {
    await data.upsert("feeds", post.id, {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      body: post.body,
      date: post.date,
      tags: post.tags,
      published: post.published,
      order: i,
    });
  }
  console.log(`✅ ${feedPosts.length} feed posts`);

  console.log("\n✨ Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
