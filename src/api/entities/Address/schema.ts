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
import { places } from "../Place";

export const addresses = pgTable("addresses", {
  id: serial("id").primaryKey(),
  countryCode: varchar("country_code", { length: 100 }),
  countryName: varchar("country_name", { length: 100 }),
  stateCode: varchar("state_code", { length: 100 }),
  state: varchar("state", { length: 100 }),
  county: varchar("county", { length: 100 }),
  city: varchar("city", { length: 100 }),
  district: varchar("district", { length: 100 }),
  street: varchar("street", { length: 100 }),
  postalCode: varchar("postal_code", { length: 100 }),
  houseNumber: varchar("house_number", { length: 100 }),
});

export const addressesRelations = relations(addresses, ({ many }) => ({
  places: many(places),
}));
