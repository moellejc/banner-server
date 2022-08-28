import { ApolloServer } from "apollo-server-express";
import { Application } from "express";
import path from "path";
import { buildSchema } from "type-graphql";
import { registerAllEnums } from "../api/enums/index";
import { resolvers } from "../api/resolvers";
import { evalBoolean } from "../utils/EvalBoolean";
import { AppContext } from "../context/AppContext";
import prismaClient from "../lib/prisma";

export const graphqlLoader = async (app: Application) => {
  // register all enums as types with graphql
  registerAllEnums();

  const server = new ApolloServer({
    schema: await buildSchema({
      // emitSchemaFile: isPROD() ? false : true, // autogenerate schema.graphql in root dir if not prod env
      emitSchemaFile: path.resolve("./generator", "schema.gql"),
      resolvers: resolvers,
      validate: false,
    }),
    context: ({ res, req }) => {
      const custCtx: AppContext = {
        req,
        res,
        prisma: prismaClient,
      };
      return custCtx;
    },
    playground: evalBoolean(process.env.GRAPHQL_EDITOR!),
  });

  server.applyMiddleware({ app, path: process.env.GRAPHQL_ROUTE });
};
