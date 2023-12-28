import { Field, Int, ObjectType, Float } from "type-graphql";
import { Place } from "../Place";
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
export class Organization {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => [Place], { nullable: true })
  places?: Place[] | null;
}

export const organizations = pgTable("organizations", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  // places Place[]
  createdAt: timestamp("created_at").default(sql`now()`),
});
