// graphql/mutations/deleteComment.js
import { gql } from '@apollo/client';

export const DELETE_COMMENT = gql`
  mutation DeleteComment($commentId: ID!, $blogId: ID!) {
    deleteComment(commentId: $commentId, blogId: $blogId) {
      _id
    }
  }
`;
