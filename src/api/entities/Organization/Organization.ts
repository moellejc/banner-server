import { Field, Int, ObjectType, Float } from "type-graphql";
import { Place, places } from "../Place";
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
  index,
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

export const organizations = pgTable(
  "organizations",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    createdAt: timestamp("created_at").default(sql`now()`),
  },
  (table) => {
    return {
      nameIdx: index("name_idx").on(table.name),
    };
  }
);

export const organizationsRelations = relations(organizations, ({ many }) => ({
  places: many(places),
}));
