import { gql } from "@apollo/client";

export const GET_BLOG_COMMENTS = gql`
  query GetBlogComments($blogId: ID!) {
    getBlogComments(blogId: $blogId) {
      _id
      comment
      createdAt
      user {
        _id
        name
        image
      }
    }
  }
`;
