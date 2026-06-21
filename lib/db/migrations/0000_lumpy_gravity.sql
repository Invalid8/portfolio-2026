CREATE TABLE "experiences" (
	"id" text PRIMARY KEY NOT NULL,
	"role" text,
	"company" text,
	"href" text,
	"blurb" text,
	"start" text,
	"end" text,
	"order" integer,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "portfolio" (
	"id" text PRIMARY KEY NOT NULL,
	"headline_lead" text,
	"headline_accent" text,
	"headline_tail" text,
	"subtitle" text,
	"leading" text,
	"trailing" text,
	"title" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "principles" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text,
	"description" text,
	"thumbnail" text,
	"link" text,
	"github" text,
	"date" text,
	"year" integer,
	"order" integer,
	"tags" text[],
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "stats" (
	"id" text PRIMARY KEY NOT NULL,
	"value" text,
	"label" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "tools" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"category" text,
	"img" text,
	"color" text,
	"order" integer,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
