import { Field, Int, ObjectType } from "type-graphql";
import { Post, posts } from "./Post";
import { User, users } from "../User";
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

@ObjectType()
export class PostReply {
  @Field()
  id!: string;

  @Field()
  authorID: string;

  @Field(() => User)
  author!: User;

  @Field()
  postID: string;

  @Field(() => Post)
  post!: Post;

  @Field({ nullable: true })
  parentReplyId?: string;

  @Field(() => PostReply)
  parentReply?: PostReply;

  @Field(() => [PostReply])
  replies?: PostReply[];

  @Field(() => Int, { defaultValue: 0 })
  totalReplies: number;

  @Field()
  createdAt: Date;
}

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
