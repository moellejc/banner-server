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
  AnyPgColumn,
  index,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { users } from "../User";
import { places } from "../Place";
import { media } from "../Media";
import { locations } from "../Location";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  authorID: integer("author_id").references(() => users.id),
  locationID: integer("location_id").references(() => locations.id),
  placeID: integer("place_id").references(() => places.id),
  text: text("text"),
  replyCount: integer("reply_count").default(0),
  // likes      Like[]
  likeCount: integer("like_count").default(0),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorID],
    references: [users.id],
  }),
  location: one(locations, {
    fields: [posts.locationID],
    references: [locations.id],
  }),
  place: one(places, {
    fields: [posts.placeID],
    references: [places.id],
  }),
  media: many(media),
  replies: many(postReplies),
}));

// TODO: this needs some work. Parents, children, likes, media? etc
export const postReplies = pgTable("post_replies", {
  id: serial("id").primaryKey(),
  postID: integer("post_id").references(() => posts.id),
  authorID: integer("author_id").references(() => users.id),
  text: text("text"),
  updatedAt: timestamp("updated_at").default(sql`now()`),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const postRepliesRelations = relations(postReplies, ({ one, many }) => ({
  author: one(users, {
    fields: [postReplies.authorID],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [postReplies.postID],
    references: [posts.id],
  }),
}));
