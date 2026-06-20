import type { CollectionConfig } from "@dalgoridim/headless-cms/adapters/postgres";

/**
 * Registered typed tables. `projects` gets real columns so `year`/`order` sort
 * numerically (the JSONB `documents` table sorts everything as text). Anything
 * not listed here (the `portfolio` section docs) falls into `documents`.
 */
export const collections: Record<string, CollectionConfig> = {
  projects: {
    table: "projects",
    columns: {
      title: "text",
      description: "text",
      thumbnail: "text",
      link: "text",
      github: "text",
      // `date` is the display date ("YYYY-MM"); `year` kept for back-compat.
      date: "text",
      year: "int",
      order: "int",
    },
  },
  tools: {
    table: "tools",
    columns: {
      name: "text",
      category: "text",
      img: "text",
      color: "text",
      order: "int",
    },
  },
  experiences: {
    table: "experiences",
    columns: {
      role: "text",
      company: "text",
      href: "text",
      blurb: "text",
      // `start`/`end` are "YYYY-MM" (or "" for present); sorted by `start` desc.
      start: "text",
      end: "text",
      order: "int",
    },
  },
};
