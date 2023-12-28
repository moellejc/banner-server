import { Field, Int, ObjectType } from "type-graphql";
import { Post } from "./Post";
import { User } from "../User";
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

export const postReplies = pgTable("post_replies", {
  id: serial("id").primaryKey(),
  postID: integer("post_id"),
  // post     Post   @relation(fields: [postID], references: [id])
  authorID: integer("author_id"),
  // author   User   @relation(fields: [authorID], references: [id])
  text: text("text"),
  updatedAt: timestamp("updated_at").default(sql`now()`),
  createdAt: timestamp("created_at").default(sql`now()`),
});
