import { gql } from "@apollo/client";

export const GET_BLOGS = gql`
  query GetBlogs {
    blogs {
      _id
      title
      description
      coverImage
      createdAt
      updatedAt
      bookmarked
      commentsCount
      totalReactionsCount
      author {
        _id
        name
        image
      }
    }
  }
`;
