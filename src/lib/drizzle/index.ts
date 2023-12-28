import { drizzle } from "drizzle-orm/node-postgres";
import { dbPool } from "../pg";
import { schema } from "../../api/entities/Schema";

export const dzlClient = drizzle(dbPool, { schema });
