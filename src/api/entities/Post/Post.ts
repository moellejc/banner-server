import { Point } from "geojson";
import { Field, Int, ObjectType } from "type-graphql";
import { PointScalar } from "../../../types/Point";
import { Like } from "../Like/Like";
import { Media } from "../Media";
import { PostReply } from "./PostReply";
import { User } from "../User";
import { Location } from "../Location";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type PostWithRelations = Prisma.PromiseReturnType<
  typeof getPostWithRelations
>;

async function getPostWithRelations() {
  const posts = await prisma.post.findFirst({
    include: {
      author: true,
      location: true,
      place: true,
      likes: true,
      replies: true,
    },
  });
  return posts;
}

@ObjectType()
export class Post {
  @Field(() => Int)
  id!: number;

  @Field(() => Int)
  authorID!: number;

  @Field(() => User)
  author: User;

  @Field(() => Int, { nullable: true })
  cellID?: number | null;

  @Field(() => Location, { nullable: true })
  cell?: Location | null;

  @Field(() => String, { nullable: true })
  text?: String | null;

  @Field(() => [Media], { nullable: true })
  media?: [Media] | null;

  @Field(() => [PostReply], { nullable: true })
  replies?: [PostReply] | null;

  @Field(() => Int, { defaultValue: 0 })
  replyCount: number;

  @Field(() => [Like], { nullable: true })
  likes?: [Like] | null;

  @Field(() => Int, { defaultValue: 0 })
  likeCount: number;

  @Field(() => Date)
  createdAt: Date;
}
