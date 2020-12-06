import { gql } from "apollo-server-core";

export const typeDefs = gql`
    type Query{
        cats: [Cat!]!
        hello: String!
    }

    type Mutation {
        createCat(name: String!): Cat!,
        login(username: String!, password: String!): Authentication!
    }

    type Cat {
        id: ID!,
        name: String!
    }

    type Authentication {
        token: String!
    }
`; 