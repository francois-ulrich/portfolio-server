// Apollo
import { AuthenticationError } from "apollo-server-express";

import { getToken } from "./auth"

// Custom
import {Cat} from './models/Cats';

export const resolvers = {
    Query: {
        hello: () => "hello",
        cats: () => Cat.find()
    },

    Mutation: {
        createCat: async (_, {name}, context) => {
            if (!context.user) 
                throw new AuthenticationError("You must be logged in to perform this action");

            const kitty = new Cat({ name });

            await kitty.save()

            return kitty;
        },

        login: async (_, { username, password }) => ({
            token: await getToken({ username, password }),
        }),
    },
}