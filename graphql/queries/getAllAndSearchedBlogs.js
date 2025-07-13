import { gql } from "@apollo/client";

export const GET_ALL_OR_SEARCHED_BLOGS = gql`
  query GetBlogs($title: String) {
    blogs(title: $title) {
      _id
      title
      createdAt
      updatedAt
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
