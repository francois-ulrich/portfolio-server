import { ApolloServer } from "apollo-server-express";

import { getUserIdFromToken, getUser } from "./auth"

import express from "express";
import mongoose from "mongoose";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const context = async ({ req }) => {
    const [, token] = (req.headers.authorization || '').split("Bearer ");

    return {
        user: await getUser(await getUserIdFromToken(token)),
    };
};

// Wait for the MongoDB connection to be resolved before launching server
const startServer = async () => {
    // Create express app
    const app = express();

    // The ApolloServer constructor requires two parameters: your schema
    // definition and your set of resolvers.
    const server = new ApolloServer({ typeDefs, resolvers, context });

    // Add GraphQL support to our express express
    server.applyMiddleware({ app });

    // Connect to our MongoDB database
    await mongoose.connect('mongodb://localhost:27017/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    // The `listen` method launches a web server.
    app.listen({
        port: 4000
    }, () => console.log(`Server ready at http://localhost:4000${server.graphqlPath}`));
}

// Start server
startServer();