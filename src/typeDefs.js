import { gql } from "apollo-server-core";
// import { GraphQLDateTime } from "graphql-iso-date";
// import { GraphQLJSON } from 'graphql-type-json';


// https://github.com/Urigo/graphql-scalars

// const customScalarResolver = {
//     Date: GraphQLDateTime
// };

export const typeDefs = gql`
    scalar Date
    scalar GraphQLJSON

    type Query{
        cats: [Cat!],
        hello: String!,
        profile: Profile,
    }

    type Mutation {
        createCat(name: String!): Cat!,
        login(username: String!, password: String!): Authentication!,
        updateProfile(args: GraphQLJSON): Profile,
    }

    type Cat {
        id: ID!,
        name: String!,
    }

    type Authentication {
        token: String!,
    }

    type Profile {
        id: ID!,
        firstName: String!,
        middleName: String,
        lastName: String!,
        description: String,
        dateBirth: Date!,
        email: String!,
        phone: String!,
        hobbies: [String],
        cvUrl: String,
        socialMediaUrls: [String],
    }

    type Project {
        id: ID!,
        name: String!,
        description: String!,
        thumbnailUrl: String!,
        imagesUrl: String,
        videoUrl: String,
        skillsIds: [ID],
        githubRepo: String,
        url: String,
    }

    type Skill {
        id: ID!,
    }
`; 