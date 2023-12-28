import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import { MediaTypes, MediaExtensions } from "@prisma/client";
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
import { Post } from "../Post";
import { User } from "../User";

registerEnumType(MediaTypes, {
  name: "MediaTypes",
  description: undefined,
});

export const MediaTypesDZL = pgEnum(
  "media_types",
  Object.values(MediaTypes) as [string]
);

registerEnumType(MediaExtensions, {
  name: "MediaExtensions",
  description: undefined,
});

export const MediaExtensionsDZL = pgEnum(
  "media_extensions",
  Object.values(MediaExtensions) as [string]
);

@ObjectType()
export class Media {
  @Field()
  id!: string;

  @Field()
  creatorID: string;

  @Field(() => User)
  creator: User;

  @Field()
  postID: string;

  @Field(() => Post)
  post: Post;

  @Field(() => MediaTypes)
  mediaType!: MediaTypes;

  @Field()
  mediaURL: string;

  @Field(() => Int, { defaultValue: 0 })
  mediaIndex: number;

  @Field()
  createdAt: Date;
}

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  extension: MediaExtensionsDZL("extension"),
  mediaType: MediaTypesDZL("media_type"),
  postID: integer("post_id"),
  // post       Post            @relation(fields: [postID], references: [id])
  mediaURL: text("media_url"),
  mediaIndex: integer("media_index").default(0),
  createdAt: timestamp("created_at").default(sql`now()`),
});
