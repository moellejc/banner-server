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
import { posts, postReplies } from "./posts";
import { locations } from "./locations";
import { places } from "./places";
import { UserRoles, UserStatuses, UserVerifications } from "../User";

export const UserRolesDZL = pgEnum(
  "user_roles",
  Object.values(UserRoles) as [string]
);

export const UserStatusesDZL = pgEnum(
  "user_statuses",
  Object.values(UserStatuses) as [string]
);

export const UserVerificationsDZL = pgEnum(
  "user_verifications",
  Object.values(UserVerifications) as [string]
);

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
