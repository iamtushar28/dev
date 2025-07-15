import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
  mutation AddComment($blogId: ID!, $comment: String!) {
    addComment(blogId: $blogId, comment: $comment) {
      _id
      comment
      createdAt
      user {
        id
        name
        image
      }
    }
  }
`;
