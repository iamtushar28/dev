import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Blog {
    _id: ID!
    title: String!
    description: String!
    coverImage: String
    authorId: ID!
    createdAt: String
    updatedAt: String
    commentsCount: Int
    author: User
  }

  type User {
    _id: ID!
    name: String!
    image: String
  }

  type Query {
    blogs: [Blog!]!
    blog(id: ID!): Blog
    users: [User!]!
    user(id: ID!): User
  }
`;
