// Apollo
import { AuthenticationError } from "apollo-server-express";
import { getToken } from "./auth"

// Models
import {Cat} from './models/Cats';
import {Profile} from './models/Profile';


// For date scalar
import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import dayjs from "dayjs";

export const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return dayjs(value); // value from the client
        },
        serialize(value) {
            // return value.getTime(); // value sent to the client
            return dayjs(value).format("MM-DD-YYYY");
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.STRING) {
                return parseInt(ast.value, 10); // ast value is always in string format
            }
            return null;
        },
    }),

    Query: {
        hello: () => "hello",
        cats: () => Cat.find(),
        profile : () => Profile.find()
    },

    Mutation: {
        // createCat: async (_, {name}, context) => {
        //     if (!context.user) 
        //         throw new AuthenticationError("You must be logged in to perform this action");

        //     const kitty = new Cat({ name });

        //     await kitty.save()

        //     return kitty;
        // },

        login: async (_, { username, password }) => ({
            token: await getToken({ username, password }),
        }),

        // Profile
        updateProfile: async (_, {args}, context) => {

            // Must be authenticated
            if (!context.user) 
                throw new AuthenticationError("You must be logged in to perform this action");

            // There is only one profile entry in database. So pick first element of array
            Profile.findOne(_, (err, profile) => {
                console.log(profile); 
                
                profile = Object.assign(profile, args);

                profile.save();
            });



            // console.log("profile");
            // console.log(profile.length);

            // // New profile creation
            // if(!profile){
            //     console.log("Create profile cuz no profile");

            //     profile = new Profile(args);
            // }else{

            // }

            // // Store it
            // await profile.save();

            return profile;
        },

    },
}