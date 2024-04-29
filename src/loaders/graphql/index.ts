import { ApolloServer } from "apollo-server-express";
import { Application } from "express";
import path from "path";
import { buildSchema } from "type-graphql";
import { resolvers, orphanTypes } from "../../api/resolvers";
import { evalBoolean } from "../../utils/EvalBoolean";
import { AppContext } from "../../context/AppContext";
import { dzlClient } from "../../lib/drizzle";

export const graphqlLoader = async (app: Application) => {
  const server = new ApolloServer({
    schema: await buildSchema({
      // emitSchemaFile: isPROD() ? false : true, // autogenerate schema.graphql in root dir if not prod env
      emitSchemaFile: path.resolve("./generator", "schema.gql"),
      resolvers: resolvers,
      orphanedTypes: orphanTypes,
      validate: false,
    }),
    context: ({ res, req }) => {
      const custCtx: AppContext = {
        req,
        res,
        db: dzlClient,
      };
      return custCtx;
    },
    playground: evalBoolean(process.env.GRAPHQL_EDITOR!),
  });

  // apply middleware for graphql
  server.applyMiddleware({ app, path: process.env.GRAPHQL_ROUTE });
};
