CREATE TABLE "feeds" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text,
	"slug" text,
	"excerpt" text,
	"body" text,
	"date" text,
	"tags" text[],
	"published" boolean DEFAULT true,
	"order" integer,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "feeds_slug_unique" UNIQUE("slug")
);
