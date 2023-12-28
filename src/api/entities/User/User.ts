import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import { UserRoles, UserStatuses, UserVerifications } from "@prisma/client";
import { Like } from "../Like";
import { Media } from "../Media";
import { Post, posts, postReplies } from "../Post";
import { Location, locations } from "../Location";
import { places } from "../Place";
import { UserLocationPath } from "./UserLocationPath";
import { UserVisitHistory } from "./UserVisitHistory";
import { Prisma, PrismaClient } from "@prisma/client";
import {
  serial,
  varchar,
  text,
  pgTable,
  timestamp,
  boolean,
  integer,
  pgEnum,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

const prisma = new PrismaClient();

export type UserWithRelations = Prisma.PromiseReturnType<
  typeof getUserWithRelations
>;

async function getUserWithRelations() {
  return await prisma.user.findFirst({
    include: {
      location: true,
      posts: true,
      postReplies: true,
      likes: true,
    },
  });
}

registerEnumType(UserRoles, {
  name: "UserRoles",
  description: undefined,
});

export const UserRolesDZL = pgEnum(
  "user_roles",
  Object.values(UserRoles) as [string]
);

registerEnumType(UserStatuses, {
  name: "UserStatuses",
  description: undefined,
});

export const UserStatusesDZL = pgEnum(
  "user_statuses",
  Object.values(UserStatuses) as [string]
);

registerEnumType(UserVerifications, {
  name: "UserVerifications",
  description: undefined,
});

export const UserVerificationsDZL = pgEnum(
  "user_verifications",
  Object.values(UserVerifications) as [string]
);

@ObjectType()
export class User {
  @Field(() => Int)
  id!: number;

  @Field(() => String, { nullable: false })
  firstName: string;

  @Field(() => String, { nullable: false })
  lastName: string;

  @Field(() => String, { nullable: false })
  email: string;

  password: string;

  tempPassword?: string | null;

  @Field(() => Date, { nullable: true })
  tempPasswordExpires?: Date | null;

  @Field({ defaultValue: false })
  hasTempPassword: boolean;

  tokenVersion: number;

  @Field(() => String, { nullable: false })
  screenName: string;

  @Field(() => String, { nullable: true })
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
  locationID?: number | null;

  @Field(() => Location, { nullable: true })
  location?: Location | null;

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

  @Field(() => [UserLocationPath], { nullable: true })
  locationPath?: UserLocationPath[] | null;

  @Field(() => [UserVisitHistory], { nullable: true })
  visitHistory?: UserVisitHistory[] | null;

  @Field(() => Date)
  lastActiveAt: Date;

  @Field(() => Date)
  createdAt: Date;
}

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 256 }).unique(),
    firstName: varchar("first_name", { length: 256 }).notNull(),
    lastName: varchar("last_name", { length: 256 }).notNull(),
    screenName: varchar("screen_name", { length: 200 }).notNull(),
    password: text("password").notNull(),
    tempPassword: text("temp_password"),
    tempPasswordExpires: timestamp("temp_password_expires"),
    hasTempPassword: boolean("has_template_password").default(false),
    tokenVersion: integer("token_version").default(0),
    profilePic: text("profile_pic"),
    role: UserRolesDZL("role").default("USER"),
    status: UserStatusesDZL("user_statuses").default("ACTIVE"),
    isVerified: boolean("is_verified").default(false),
    verificationType:
      UserVerificationsDZL("user_verifications").default("STANDARD"),
    locationID: integer("location_id").references(() => locations.id),
    totalPosts: integer("total_posts").default(0),
    // likes                Like[]
    // locationPath         UserLocationPath[]
    // visitHistory         UserVisitHistory[]
    totalLikes: integer("total_likes").default(0),
    totalFollowers: integer("total_followers").default(0),
    totalFollowing: integer("total_following").default(0),
    totalFollowingPlaces: integer("total_following_places").default(0),
    lastActiveAt: timestamp("last_active_at").default(sql`now()`),
    createdAt: timestamp("created_at").default(sql`now()`),
  },
  (table) => {
    return {
      emailIdx: uniqueIndex("email_idx").on(table.email),
      screenNameIdx: uniqueIndex("screen_name_idx").on(table.screenName),
      locationIDIdx: index("location_id_idx").on(table.locationID),
    };
  }
);

export const usersRelations = relations(users, ({ one, many }) => ({
  location: one(locations, {
    fields: [users.locationID],
    references: [locations.id],
  }),
  places: many(places),
  posts: many(posts),
  postReplies: many(postReplies),
}));
