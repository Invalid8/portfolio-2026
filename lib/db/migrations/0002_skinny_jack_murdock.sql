ALTER TABLE "projects" ADD COLUMN "slug" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "content" text;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_slug_unique" UNIQUE("slug");