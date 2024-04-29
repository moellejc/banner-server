import {
  serial,
  varchar,
  text,
  pgTable,
  timestamp,
  boolean,
  integer,
  pgEnum,
  json,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const likes = pgTable("likes", {
  id: serial("id").primaryKey(),
  likerID: integer("liker_id"),
  // liker   User @relation(fields: [likerID], references: [id])
  postID: integer("post_id"),
  // post    Post @relation(fields: [postID], references: [id])
  createdAt: timestamp("created_at").default(sql`now()`),
});
