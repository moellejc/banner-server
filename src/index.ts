import express from "express";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cors from "cors";
import { resolvers } from "./api/resolvers";

(async () => {
  const app = express();

  // load database
  await createConnection();

  // load graphql apollo server
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: resolvers,
    }),
    context: ({ res, req }) => ({ res, req }),
    playground: true,
  });

  app.use("*", cors());

  server.applyMiddleware({ app, path: "/graphql" });

  app.listen({ port: 8000 }, () => {
    console.log("Apollo Server on http://localhost:8000/graphql");
  });
})();
