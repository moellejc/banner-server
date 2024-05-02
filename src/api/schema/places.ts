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
  AnyPgColumn,
  index,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { users } from "./users";
import { addresses } from "./addresses";
import { organizations } from "./organizations";
import { posts } from "./posts";
import { locations } from "./locations";
import { PlaceTypes } from "../enums";

export const PlaceTypesDZL = pgEnum(
  "place_types",
  Object.values(PlaceTypes) as [string]
);

export const places = pgTable(
  "places",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    language: varchar("language", { length: 3 }).default("en"),
    placeType: PlaceTypesDZL("place_type"),
    createdByID: integer("created_by_id").references(() => users.id),
    locationID: integer("location_id").references(() => locations.id),
    parentID: integer("parent_id").references((): AnyPgColumn => places.id),
    addressID: integer("address_id").references(() => addresses.id),
    peopleHere: integer("people_here").default(0),
    references: json("references"),
    categories: json("categories"),
    contacts: json("contacts"),
    hours: json("hours"),
    organizationID: integer("organization_id").references(
      () => organizations.id
    ),
    updatedAt: timestamp("updated_at").default(sql`now()`),
    createdAt: timestamp("created_at").default(sql`now()`),
    // visitorHistory UserVisitHistory[]
  },
  (table) => {
    return {
      placeNameIdx: index("place_name_idx").on(table.name),
      addressIDIdx: index("address_id_idx").on(table.addressID),
    };
  }
);

export const placesRelations = relations(places, ({ one, many }) => ({
  createdBy: one(users, {
    fields: [places.createdByID],
    references: [users.id],
  }),
  location: one(locations, {
    fields: [places.locationID],
    references: [locations.id],
  }),
  address: one(addresses, {
    fields: [places.addressID],
    references: [addresses.id],
  }),
  organization: one(organizations, {
    fields: [places.organizationID],
    references: [organizations.id],
  }),
  parent: one(places, {
    fields: [places.parentID],
    references: [places.id],
  }),
  children: many(places),
  posts: many(posts),
}));
