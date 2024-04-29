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
import { places } from "./places";

export const organizations = pgTable(
  "organizations",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    createdAt: timestamp("created_at").default(sql`now()`),
  },
  (table) => {
    return {
      organizationNameIdx: index("organization_name_idx").on(table.name),
    };
  }
);

export const organizationsRelations = relations(organizations, ({ many }) => ({
  places: many(places),
}));
