DO $$ BEGIN
 CREATE TYPE "location_types" AS ENUM('Place', 'User');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "media_extensions" AS ENUM('PNG', 'JPG', 'JPEG', 'BMP', 'MP4', 'AVI', 'FBX', 'USDZ', 'GLTF');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "media_types" AS ENUM('VIDEO', 'PHOTO', 'AUDIO', 'MODEL');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "place_types" AS ENUM('Transit', 'Residential', 'Commercial', 'Educational', 'Medical', 'Religious', 'Community', 'Municipality', 'Administrative', 'State', 'Province', 'Country', 'Continent', 'Geographic', 'Landmark');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "user_roles" AS ENUM('USER', 'ADMIN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "user_statuses" AS ENUM('INVITED', 'ACTIVE', 'INACTIVE', 'ARCHIVE', 'DEACTIVATED', 'REMOVED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "user_verifications" AS ENUM('STANDARD', 'CELEBRITY', 'OFFICIAL', 'DEVELOPER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "addresses" (
	"id" serial PRIMARY KEY NOT NULL,
	"country_code" varchar(100),
	"country_name" varchar(100),
	"state_code" varchar(100),
	"state" varchar(100),
	"county" varchar(100),
	"city" varchar(100),
	"district" varchar(100),
	"street" varchar(100),
	"postal_code" varchar(100),
	"house_number" varchar(100)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "likes" (
	"id" serial PRIMARY KEY NOT NULL,
	"liker_id" integer,
	"post_id" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "locations" (
	"id" serial PRIMARY KEY NOT NULL,
	"location_type" "location_types",
	"primary_cell_level" integer,
	"lat" double precision,
	"lon" double precision,
	"geom_cell_res_0" varchar(16),
	"geom_cell_res_1" varchar(16),
	"geom_cell_res_2" varchar(16),
	"geom_cell_res_3" varchar(16),
	"geom_cell_res_4" varchar(16),
	"geom_cell_res_5" varchar(16),
	"geom_cell_res_6" varchar(16),
	"geom_cell_res_7" varchar(16),
	"geom_cell_res_8" varchar(16),
	"geom_cell_res_9" varchar(16),
	"geom_cell_res_10" varchar(16),
	"geom_cell_res_11" varchar(16),
	"geom_cell_res_12" varchar(16),
	"geom_cell_res_13" varchar(16),
	"geom_cell_res_14" varchar(16),
	"geom_cell_res_15" varchar(16),
	"bbox" json,
	"access_points" json,
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"extension" "media_extensions",
	"media_type" "media_types",
	"post_id" integer,
	"media_url" text,
	"media_index" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organizations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "places" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"language" varchar(3) DEFAULT 'en',
	"place_type" "place_types",
	"created_by_id" integer,
	"location_id" integer,
	"parent_id" integer,
	"address_id" integer,
	"people_here" integer DEFAULT 0,
	"references" json,
	"categories" json,
	"contacts" json,
	"hours" json,
	"organization_id" integer,
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "post_replies" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_id" integer,
	"author_id" integer,
	"text" text,
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"author_id" integer,
	"location_id" integer,
	"place_id" integer,
	"text" text,
	"reply_count" integer DEFAULT 0,
	"like_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(256),
	"first_name" varchar(256) NOT NULL,
	"last_name" varchar(256) NOT NULL,
	"screen_name" varchar(200) NOT NULL,
	"password" text NOT NULL,
	"temp_password" text,
	"temp_password_expires" timestamp,
	"has_template_password" boolean DEFAULT false,
	"token_version" integer DEFAULT 0,
	"profile_pic" text,
	"role" "user_roles" DEFAULT 'USER',
	"user_statuses" "user_statuses" DEFAULT 'ACTIVE',
	"is_verified" boolean DEFAULT false,
	"user_verifications" "user_verifications" DEFAULT 'STANDARD',
	"location_id" integer,
	"total_posts" integer DEFAULT 0,
	"total_likes" integer DEFAULT 0,
	"total_followers" integer DEFAULT 0,
	"total_following" integer DEFAULT 0,
	"total_following_places" integer DEFAULT 0,
	"last_active_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "geom_cell_res_0_idx" ON "locations" ("geom_cell_res_0");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "geom_cell_res_1_idx" ON "locations" ("geom_cell_res_1");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "geom_cell_res_2_idx" ON "locations" ("geom_cell_res_2");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "geom_cell_res_3_idx" ON "locations" ("geom_cell_res_3");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "geom_cell_res_4_idx" ON "locations" ("geom_cell_res_4");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "geom_cell_res_5_idx" ON "locations" ("geom_cell_res_5");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "geom_cell_res_6_idx" ON "locations" ("geom_cell_res_6");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "geom_cell_res_7_idx" ON "locations" ("geom_cell_res_7");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "geom_cell_res_8_idx" ON "locations" ("geom_cell_res_8");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "geom_cell_res_9_idx" ON "locations" ("geom_cell_res_9");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "geom_cell_res_10_idx" ON "locations" ("geom_cell_res_10");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "geom_cell_res_11_idx" ON "locations" ("geom_cell_res_11");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "geom_cell_res_12_idx" ON "locations" ("geom_cell_res_12");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "geom_cell_res_13_idx" ON "locations" ("geom_cell_res_13");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "geom_cell_res_14_idx" ON "locations" ("geom_cell_res_14");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "geom_cell_res_15_idx" ON "locations" ("geom_cell_res_15");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_id_idx" ON "media" ("post_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "organization_name_idx" ON "organizations" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "place_name_idx" ON "places" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "address_id_idx" ON "places" ("address_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "users" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "screen_name_idx" ON "users" ("screen_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "location_id_idx" ON "users" ("location_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "media" ADD CONSTRAINT "media_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "places" ADD CONSTRAINT "places_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "places" ADD CONSTRAINT "places_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "places" ADD CONSTRAINT "places_parent_id_places_id_fk" FOREIGN KEY ("parent_id") REFERENCES "places"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "places" ADD CONSTRAINT "places_address_id_addresses_id_fk" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "places" ADD CONSTRAINT "places_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post_replies" ADD CONSTRAINT "post_replies_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post_replies" ADD CONSTRAINT "post_replies_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_place_id_places_id_fk" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
