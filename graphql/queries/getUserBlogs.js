import { gql } from "@apollo/client";

export const GET_USER_BLOGS = gql`
  query GetUserBlogs {
    getUserBlogs {
      _id
      title
      createdAt
      updatedAt
      bookmarked
      commentsCount
      author {
        _id
        name
        image
      }
      reactions {
        emoji
        count
      }
    }
  }
`;
