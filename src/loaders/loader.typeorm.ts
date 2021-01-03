import { Application } from "express";
import { createConnection } from "typeorm";

export const typeormLoader = async (app: Application) => {
  await createConnection({
    type: "postgres",
    database: "neurondb",
    synchronize: true,
    logging: true,
    entities: ["dist/api/entities/**/*.js"],
    migrations: ["dist/database/migrations/**/*.js"],
    subscribers: ["dist/api/subscribers/**/*.js"],
    cli: {
      entitiesDir: "dist/api/entities",
      migrationsDir: "dist/database/migrations",
      subscribersDir: "dist/api/subscribers",
    },
  });
};