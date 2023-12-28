import { Config } from "drizzle-kit";

export default {
  schema: "./src/api/entities/Schema/*.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config;
