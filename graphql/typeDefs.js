import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Blog {
    _id: ID!
    title: String!
    slug: String!
    tags: [String!]!
    description: String!
    coverImage: String
    authorId: ID!
    createdAt: String
    updatedAt: String
    author: User
    bookmarked: Boolean!
    reactions: [EmojiCount!]!
    userReactions: [String!]!
    comments: [Comment!]!
    commentsCount: Int!
  }

  type Comment {
    _id: ID!
    comment: String!
    user_id: ID!
    blog_id: ID!
    createdAt: String
    author: User
  }

  type EmojiCount {
    emoji: String!
    count: Int!
  }

  type Mutation {
    toggleReaction(blogId: ID!, emoji: String!): EmojiCount!
    addComment(blogId: ID!, userId: ID!, comment: String!): Comment!
    deleteComment(commentId: ID!, blogId: ID!): Comment!
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

  type Query {
    blogs: [Blog!]!
    blog(id: ID!): Blog
    blogBySlug(slug: String!): Blog
    users: [User!]!
    user(id: ID!): User
    getUserBlogs: [Blog!]!
    searchBlogs(title: String!): [Blog!]!
    isBlogBookmarked(blogId: ID!): Boolean!
    bookmarkedBlogs: [Blog]
  }
`;
