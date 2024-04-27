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
  index,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { posts } from "./posts";
import { MediaTypes, MediaExtensions } from "../Media";

export const MediaTypesDZL = pgEnum(
  "media_types",
  Object.values(MediaTypes) as [string]
);

export const MediaExtensionsDZL = pgEnum(
  "media_extensions",
  Object.values(MediaExtensions) as [string]
);

export const media = pgTable(
  "media",
  {
    id: serial("id").primaryKey(),
    extension: MediaExtensionsDZL("extension"),
    mediaType: MediaTypesDZL("media_type"),
    postID: integer("post_id").references(() => posts.id), // TODO: add action here
    mediaURL: text("media_url"),
    mediaIndex: integer("media_index").default(0),
    createdAt: timestamp("created_at").default(sql`now()`),
  },
  (table) => {
    return {
      postIDIdx: index("post_id_idx").on(table.postID),
    };
  }
);

export const mediaRelations = relations(media, ({ one }) => ({
  post: one(posts, {
    fields: [media.postID],
    references: [posts.id],
  }),
}));
