import { gql } from "apollo-server-core";

export const typeDefs = gql`
    type Query{
        cats: [Cat!]!
        hello: String!
    }

    type Cat {
        id: ID!,
        name: String!
    }

    type Mutation {
        createCat(name: String!): Cat!
    }
`; 
// String! means a string that cannot be null
