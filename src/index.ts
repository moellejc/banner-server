import cors from "cors";
import "dotenv/config";
import express from "express";
import "reflect-metadata";
import routes from "./api/routes";
import { graphqlLoader } from "./loaders/loader.graphql";
import { typeormLoader } from "./loaders/loader.typeorm";

(async () => {
  const app = express();

  // load middleware
  app.use("*", cors());

  // load database (config options in ormconfig.json)
  await typeormLoader(app);

  // load graphql apollo server
  await graphqlLoader(app);

  // routes
  app.use("/api", routes);

  app.listen({ port: process.env.APP_PORT || 3000 }, () => {
    console.log("Fabric Server Online!");
  });
})();
