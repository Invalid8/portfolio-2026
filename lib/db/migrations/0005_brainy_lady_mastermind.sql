ALTER TABLE "portfolio" ADD COLUMN "headline" text;--> statement-breakpoint
UPDATE "portfolio"
SET "headline" = NULLIF(
	btrim(concat_ws(' ', "headline_lead", "headline_accent", "headline_tail")),
	''
)
WHERE "headline" IS NULL;--> statement-breakpoint
ALTER TABLE "portfolio" DROP COLUMN "headline_lead";--> statement-breakpoint
ALTER TABLE "portfolio" DROP COLUMN "headline_accent";--> statement-breakpoint
ALTER TABLE "portfolio" DROP COLUMN "headline_tail";
