import { drizzle } from "drizzle-orm/node-postgres";
import { dbPool } from "../pg";
import * as schema from "../../api/schema";

export const dzlClient = drizzle(dbPool, { schema });
