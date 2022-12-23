import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import "reflect-metadata";
import routes from "./api/routes";
import { graphqlLoader } from "./loaders/loader.graphql";

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

  // load graphql apollo server
  await graphqlLoader(app);

  // routes
  app.use("/api", routes);

  app.listen({ port: process.env.APP_PORT || 3000 }, () => {
    console.log("banner Server Online!!");
  });
})();
