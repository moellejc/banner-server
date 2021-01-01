import { ApolloServer } from "apollo-server-express";
import { Application } from "express";
import { buildSchema } from "type-graphql";
import { registerAllEnums } from "../api/enums/index";
import { resolvers } from "../api/resolvers";
import { evalBoolean } from "../utils/EvalBoolean";

export const graphqlLoader = async (app: Application) => {
  // register all enums as types with graphql
  registerAllEnums();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: resolvers,
      validate: false,
    }),
    context: ({ res, req }) => ({ res, req }),
    playground: evalBoolean(process.env.GRAPHQL_EDITOR!),
  });

  server.applyMiddleware({ app, path: process.env.GRAPHQL_ROUTE });
};
