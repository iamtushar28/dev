import { gql } from "@apollo/client";

export const GET_BOOKMARKED_BLOGS = gql`
  query GetBookmarkedBlogs {
    bookmarkedBlogs {
      _id
      title
      description
      coverImage
      createdAt
      bookmarked
      commentsCount
      author {
        _id
        name
        image
      }
    }
  }
`;
