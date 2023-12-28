import { Field, Int, ObjectType } from "type-graphql";
import { Post } from "../Post/Post";
import { User } from "../User/User";
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
export class Like {
  @Field(() => Int)
  id!: number;

  @Field(() => Int)
  likerID: number;

  @Field(() => User)
  liker: User;

  @Field(() => Int)
  postID: number;

  @Field(() => Post)
  post: Post;

  @Field(() => Date)
  createdAt: Date;
}

export const likes = pgTable("likes", {
  id: serial("id").primaryKey(),
  likerID: integer("liker_id"),
  // liker   User @relation(fields: [likerID], references: [id])
  postID: integer("post_id"),
  // post    Post @relation(fields: [postID], references: [id])
  createdAt: timestamp("created_at").default(sql`now()`),
});
