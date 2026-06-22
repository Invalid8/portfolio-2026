/**
 * Drizzle schema — the single source of DDL. Every CMS collection is a typed
 * table here; the headless-cms Postgres adapter does runtime reads/writes (DML)
 * against these same tables (it's handed the `schema` map below). Drizzle Kit
 * owns migrations and discovers tables from the top-level exports.
 *
 * There is no schemaless `documents` table and no `extra` JSONB column anymore:
 * every persisted field is a declared column. The column JS keys must match the
 * field names the app reads/writes (the adapter looks columns up by name).
 */
import { pgTable, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

/** Bookkeeping columns shared by every table. */
const stamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
};

/** Singleton "section" docs: hero, about, contact (one row each). */
export const portfolio = pgTable("portfolio", {
  id: text("id").primaryKey(),
  headlineLead: text("headline_lead"),
  headlineAccent: text("headline_accent"),
  headlineTail: text("headline_tail"),
  subtitle: text("subtitle"),
  leading: text("leading"),
  trailing: text("trailing"),
  title: text("title"),
  ...stamps,
});

/** Stat tiles (value + label), keyed by index. */
export const stats = pgTable("stats", {
  id: text("id").primaryKey(),
  value: text("value"),
  label: text("label"),
  ...stamps,
});

/** Approach principles (title + description), keyed by index. */
export const principles = pgTable("principles", {
  id: text("id").primaryKey(),
  title: text("title"),
  description: text("description"),
  ...stamps,
});

/** Project cards — an editable, reorderable list. */
export const projects = pgTable("projects", {
  id: text("id").primaryKey(),
  // URL slug for the optional case-study page (`/projects/[slug]`).
  slug: text("slug").unique(),
  title: text("title"),
  description: text("description"),
  thumbnail: text("thumbnail"),
  link: text("link"),
  github: text("github"),
  // Display date "YYYY-MM" (kept as text); `year` is the numeric sort key.
  date: text("date"),
  year: integer("year"),
  order: integer("order"),
  tags: text("tags").array(),
  // Optional Markdown/MDX case study rendered on the project detail page.
  content: text("content"),
  ...stamps,
});

/** Tools/skills — an editable, reorderable list. */
export const tools = pgTable("tools", {
  id: text("id").primaryKey(),
  name: text("name"),
  category: text("category"),
  img: text("img"),
  color: text("color"),
  order: integer("order"),
  ...stamps,
});

/** Experience entries — an editable list, sorted by `start` descending. */
export const experiences = pgTable("experiences", {
  id: text("id").primaryKey(),
  role: text("role"),
  company: text("company"),
  href: text("href"),
  blurb: text("blurb"),
  // "YYYY-MM" (or "" for present).
  start: text("start"),
  end: text("end"),
  order: integer("order"),
  ...stamps,
});

/** Feed posts — Markdown/MDX source with manual ordering. */
export const feeds = pgTable("feeds", {
  id: text("id").primaryKey(),
  title: text("title"),
  slug: text("slug").unique(),
  excerpt: text("excerpt"),
  body: text("body"),
  date: text("date"),
  tags: text("tags").array(),
  published: boolean("published").default(true),
  order: integer("order"),
  ...stamps,
});

/**
 * The map the CMS adapter takes, keyed by **collection name**. The keys must
 * match the `collection` strings the app uses in `fetchCollection`, `editField`,
 * `createItem`, etc.
 */
export const schema = {
  portfolio,
  stats,
  principles,
  projects,
  tools,
  experiences,
  feeds,
};
