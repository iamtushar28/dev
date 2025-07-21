import { gql } from "@apollo/client";

export const GET_BOOKMARKED_BLOGS = gql`
  query GetBookmarkedBlogs {
    bookmarkedBlogs {
      _id
      title
      slug
      description
      coverImage
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
