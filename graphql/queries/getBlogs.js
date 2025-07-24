import { gql } from "@apollo/client";

export const GET_BLOGS = gql`
  query GetBlogs {
    blogs {
      _id
      slug
      title
      tags
      description
      coverImage
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
