import { gql } from "@apollo/client";

export const TOGGLE_REACTION = gql`
  mutation ToggleReaction($blogId: ID!, $emoji: String!) {
    toggleReaction(blogId: $blogId, emoji: $emoji) {
      emoji
      count
    }
  }
`;
