CREATE TABLE "identity" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"handle" text,
	"role" text,
	"email" text,
	"phone" text,
	"calendar" text,
	"resume" text,
	"available" boolean,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
INSERT INTO "identity" (
	"id",
	"name",
	"handle",
	"role",
	"email",
	"phone",
	"calendar",
	"resume",
	"available",
	"created_at",
	"updated_at"
)
SELECT
	"id",
	"name",
	"handle",
	"role",
	"email",
	"phone",
	"calendar",
	"resume",
	"available",
	"created_at",
	"updated_at"
FROM "portfolio"
WHERE "id" = 'identity'
ON CONFLICT ("id") DO UPDATE SET
	"name" = EXCLUDED."name",
	"handle" = EXCLUDED."handle",
	"role" = EXCLUDED."role",
	"email" = EXCLUDED."email",
	"phone" = EXCLUDED."phone",
	"calendar" = EXCLUDED."calendar",
	"resume" = EXCLUDED."resume",
	"available" = EXCLUDED."available",
	"updated_at" = EXCLUDED."updated_at";
--> statement-breakpoint
DELETE FROM "portfolio" WHERE "id" = 'identity';--> statement-breakpoint
ALTER TABLE "portfolio" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "portfolio" DROP COLUMN "handle";--> statement-breakpoint
ALTER TABLE "portfolio" DROP COLUMN "role";--> statement-breakpoint
ALTER TABLE "portfolio" DROP COLUMN "email";--> statement-breakpoint
ALTER TABLE "portfolio" DROP COLUMN "phone";--> statement-breakpoint
ALTER TABLE "portfolio" DROP COLUMN "calendar";--> statement-breakpoint
ALTER TABLE "portfolio" DROP COLUMN "resume";--> statement-breakpoint
ALTER TABLE "portfolio" DROP COLUMN "available";
