import { gql } from "@apollo/client";

export const GET_USER_BLOGS = gql`
  query GetUserBlogs {
    getUserBlogs {
      _id
      title
      createdAt
      updatedAt
      author {
        _id
        name
        image
      }
      totalReactionsCount
      commentsCount
    }
  }
`;
