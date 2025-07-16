import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
  mutation AddComment($blogId: ID!, $userId: ID!, $comment: String!) {
    addComment(blogId: $blogId, userId: $userId, comment: $comment) {
      _id
      comment
      createdAt
      user_id
      author {
        _id
        name
        image
      }
    }
  }
`;
