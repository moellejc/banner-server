import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import "dotenv/config";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { resolvers } from "./api/resolvers";
import { evalBoolean } from "./utils/EvalBoolean";

(async () => {
  const app = express();

  // load database (config options in ormconfig.json)
  await createConnection();

  // load graphql apollo server
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: resolvers,
      validate: false,
    }),
    context: ({ res, req }) => ({ res, req }),
    playground: evalBoolean(process.env.GRAPHQL_EDITOR!),
  });

  app.use("*", cors());

  server.applyMiddleware({ app, path: process.env.GRAPHQL_ROUTE });

  app.listen({ port: process.env.APP_PORT || 3000 }, () => {
    console.log("Apollo Server on http://localhost:8000/graphql");
  });
})();
