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
import { users } from "../User";
import { posts } from "../Post";
import { places } from "../Place";
import { LocationTypes } from "@prisma/client";

export const LocationTypesDZL = pgEnum(
  "location_types",
  Object.values(LocationTypes) as [string]
);

export const locations = pgTable(
  "locations",
  {
    id: serial("id").primaryKey(),
    locationType: LocationTypesDZL("location_type"),
    primaryCellLevel: integer("primary_cell_level"),
    lat: doublePrecision("lat"),
    lon: doublePrecision("lon"),
    geoCellRes0: varchar("geom_cell_res_0", { length: 16 }),
    geoCellRes1: varchar("geom_cell_res_1", { length: 16 }),
    geoCellRes2: varchar("geom_cell_res_2", { length: 16 }),
    geoCellRes3: varchar("geom_cell_res_3", { length: 16 }),
    geoCellRes4: varchar("geom_cell_res_4", { length: 16 }),
    geoCellRes5: varchar("geom_cell_res_5", { length: 16 }),
    geoCellRes6: varchar("geom_cell_res_6", { length: 16 }),
    geoCellRes7: varchar("geom_cell_res_7", { length: 16 }),
    geoCellRes8: varchar("geom_cell_res_8", { length: 16 }),
    geoCellRes9: varchar("geom_cell_res_9", { length: 16 }),
    geoCellRes10: varchar("geom_cell_res_10", { length: 16 }),
    geoCellRes11: varchar("geom_cell_res_11", { length: 16 }),
    geoCellRes12: varchar("geom_cell_res_12", { length: 16 }),
    geoCellRes13: varchar("geom_cell_res_13", { length: 16 }),
    geoCellRes14: varchar("geom_cell_res_14", { length: 16 }),
    geoCellRes15: varchar("geom_cell_res_15", { length: 16 }),
    bbox: json("bbox"), // TODO: should move to its own place_borders table
    accessPoints: json("access_points"), // TODO: should move to places table
    updatedAt: timestamp("updated_at").default(sql`now()`),
    createdAt: timestamp("created_at").default(sql`now()`),
  },
  (table) => {
    return {
      geoCellRes0Idx: index("geom_cell_res_0_idx").on(table.geoCellRes0),
      geoCellRes1Idx: index("geom_cell_res_1_idx").on(table.geoCellRes1),
      geoCellRes2Idx: index("geom_cell_res_2_idx").on(table.geoCellRes2),
      geoCellRes3Idx: index("geom_cell_res_3_idx").on(table.geoCellRes3),
      geoCellRes4Idx: index("geom_cell_res_4_idx").on(table.geoCellRes4),
      geoCellRes5Idx: index("geom_cell_res_5_idx").on(table.geoCellRes5),
      geoCellRes6Idx: index("geom_cell_res_6_idx").on(table.geoCellRes6),
      geoCellRes7Idx: index("geom_cell_res_7_idx").on(table.geoCellRes7),
      geoCellRes8Idx: index("geom_cell_res_8_idx").on(table.geoCellRes8),
      geoCellRes9Idx: index("geom_cell_res_9_idx").on(table.geoCellRes9),
      geoCellRes10Idx: index("geom_cell_res_10_idx").on(table.geoCellRes10),
      geoCellRes11Idx: index("geom_cell_res_11_idx").on(table.geoCellRes11),
      geoCellRes12Idx: index("geom_cell_res_12_idx").on(table.geoCellRes12),
      geoCellRes13Idx: index("geom_cell_res_13_idx").on(table.geoCellRes13),
      geoCellRes14Idx: index("geom_cell_res_14_idx").on(table.geoCellRes14),
      geoCellRes15Idx: index("geom_cell_res_15_idx").on(table.geoCellRes15),
    };
  }
);

export const locationsRelations = relations(locations, ({ many }) => ({
  users: many(users),
  places: many(places),
  posts: many(posts),
}));
