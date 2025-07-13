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
    totalReactionsCount: Int
    reactions: ReactionCounts
    author: User
  }

  type User {
    _id: ID!
    name: String!
    image: String
    bio: String
    location: String
    website: String
    brandColor: String
    joinedAt: String
  }

  type ReactionCounts {
    like: Int
    unicorn: Int
    excite: Int
    fire: Int
    star: Int
  }

  type Query {
    blogs: [Blog!]!
    blog(id: ID!): Blog
    users: [User!]!
    user(id: ID!): User
    

    # For logged-in user's blogs
    getUserBlogs: [Blog!]!

    # for searching blog
    searchBlogs(title: String!): [Blog!]!
  }
`;
