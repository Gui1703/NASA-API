import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import typeDefs from "./types/index.js";
import resolvers from "./resolvers/index.js";

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    const token = req.headers.authorization || undefined;

    return { token };
  },
  listen: { port: 4000 },
});

export default server;

console.log(`🚀 Server ready at: ${url}`);
