import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client } from "pg";
import "dotenv/config";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  await client.connect();
  const db = drizzle(client);
  await migrate(db, { migrationsFolder: "../drizzle" });
  client.end();
  process.exit(0);
}

main().catch((err) => {
  console.log("ERROR FOUND TRYING TO MIGRATE DB");
  console.log(err);
  process.exit(0);
});
