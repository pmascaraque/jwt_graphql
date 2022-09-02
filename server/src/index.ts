import "dotenv/config";
import "reflect-metadata";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from "./UserResolvers";
import { AppDataSource } from "./data-source";

(async () => {
  const app = express();
  app.get("/", (_req, res) => res.send("hello"));

  await AppDataSource.initialize();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("express server started");
  });
})();