import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import "reflect-metadata";
import routes from "./api/routes";
import { graphqlLoader } from "./loaders/graphql";
import { heremapsLoader } from "./loaders/heremaps";

(async () => {
  const app = express();

  // load security middleware
  app.use("*", cors());
  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === "production" ? undefined : false,
    })
  );

  // middleware to create an object from json body
  app.use(express.json());

  // load graphql apollo server
  await graphqlLoader(app);

  // load Here Maps access
  await heremapsLoader();

  // routes
  app.use("/api", routes);

  app.listen({ port: process.env.APP_PORT || 3000 }, () => {
    console.log(
      `Banner Server Online on port ${process.env.APP_PORT || 3000}!!`
    );
  });
})();
