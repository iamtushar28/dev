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
    commentsCount: Int!
  }

  type EmojiCount {
    emoji: String!
    count: Int!
  }

  type Comment {
    _id: ID!
    comment: String!
    user: User! 
    blogId: ID!
    createdAt: String!
  }

  type Mutation {
    # TOGGLE REACTION
    toggleReaction(blogId: ID!, emoji: String!): EmojiCount!
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

    #for getting comments
    getBlogComments(blogId: ID!): [Comment!]!
  }
`;
