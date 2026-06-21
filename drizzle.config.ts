import "dotenv/config";
import { defineConfig } from "drizzle-kit";

// Drizzle Kit owns the schema (DDL) + versioned migrations; the headless-cms
// Postgres adapter does runtime reads/writes (DML). Schema is derived from
// lib/cms/collections.ts via the package's toDrizzleSchema helper.
export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL! },
  strict: true,
  verbose: true,
});
