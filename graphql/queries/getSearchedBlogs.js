import { gql } from "@apollo/client";

export const GET_SEARCHED_BLOGS = gql`
  query GetSearchedBlogs($title: String!) {
    searchBlogs(title: $title) {
      _id
      title
      slug
      tags
      createdAt
      bookmarked
      author {
        _id
        name
        image
      }
      reactions {
        emoji
        count
      }
      commentsCount
    }
  }
`;
