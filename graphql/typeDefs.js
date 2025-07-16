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
    # TOGGLE REACTION
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
    users: [User!]!
    user(id: ID!): User

    # For logged-in user's blogs
    getUserBlogs: [Blog!]!

    # for searching blog
    searchBlogs(title: String!): [Blog!]!

    # Check a single blog quickly (handy for BookmarkButton)
    isBlogBookmarked(blogId: ID!): Boolean!

    # for showing bookmarked blog of loged in user
    bookmarkedBlogs: [Blog]
  }
`;
