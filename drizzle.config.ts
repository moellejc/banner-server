import { Config } from "drizzle-kit";

export default {
  schema: [
    "./src/api/entities/User/schema.ts",
    "./src/api/entities/Place/schema.ts",
    "./src/api/entities/Address/schema.ts",
    "./src/api/entities/Location/schema.ts",
    "./src/api/entities/Post/schema.ts",
    "./src/api/entities/Media/schema.ts",
    "./src/api/entities/Like/schema.ts",
    "./src/api/entities/Organization/schema.ts",
  ],
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config;
