import { Field, Int, ObjectType } from "type-graphql";
import { UserRoles, UserStatuses, UserVerifications } from "@prisma/client";
import { Like } from "./Like";
import { Media } from "./Media";
import { Post } from "./Post";
import { LocationCell } from "./LocationCell";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type UserWithRelations = Prisma.PromiseReturnType<
  typeof getUserWithRelations
>;

async function getUserWithRelations() {
  return await prisma.user.findFirst({
    include: {
      cell: true,
      posts: true,
      postReplies: true,
      likes: true,
    },
  });
}

@ObjectType()
export class User {
  @Field(() => Int)
  id!: number;

  @Field({ nullable: false })
  firstName: string;

  @Field({ nullable: false })
  lastName: string;

  @Field({ nullable: false })
  email: string;

  password: string;

  tempPassword?: string | null;

  @Field({ nullable: true })
  tempPasswordExpires?: Date | null;

  @Field({ defaultValue: false })
  hasTempPassword: boolean;

  tokenVersion: number;

  @Field({ nullable: false })
  screenName: string;

  @Field({ nullable: true })
  profilePic?: string | null;

  @Field(() => UserRoles, { defaultValue: UserRoles.USER })
  role: UserRoles;

  @Field(() => UserStatuses, { defaultValue: UserStatuses.ACTIVE })
  status: UserStatuses;

  @Field(() => UserVerifications, { defaultValue: UserVerifications.STANDARD })
  verificationType: UserVerifications;

  @Field({ defaultValue: false })
  isVerified: boolean;

  @Field(() => Int, { nullable: true })
  cellID?: number | null;

  @Field(() => LocationCell, { nullable: true })
  cell?: LocationCell | null;

  @Field(() => [Post], { nullable: true })
  posts?: Post[] | null;

  @Field(() => [Media], { nullable: true })
  media?: Media[] | null;

  @Field(() => Int, { defaultValue: 0 })
  totalPosts: number;

  @Field(() => [Like], { nullable: true })
  likes?: Like[] | null;

  @Field(() => Int, { defaultValue: 0 })
  totalLikes: number;

  @Field(() => Int, { defaultValue: 0 })
  totalFollowers: number;

  @Field(() => Int, { defaultValue: 0 })
  totalFollowing: number;

  @Field(() => Int, { defaultValue: 0 })
  totalFollowingPlaces: number;

  @Field()
  lastActiveAt: Date;

  @Field()
  createdAt: Date;
}
