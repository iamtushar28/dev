import { gql } from "@apollo/client";

export const GET_BLOG_BY_SLUG = gql`
  query BlogBySlug($slug: String!) {
    blogBySlug(slug: $slug) {
      _id
      slug
      title
      description
      coverImage
      createdAt
      updatedAt
      bookmarked

      author {
        _id
        name
        image
        bio
        location
        website
        brandColor
        joinedAt
      }

      reactions {
        emoji
        count
      }
      userReactions

      comments {
        _id
        comment
        createdAt
        author {
          _id
          name
          image
        }
      }
      commentsCount
    }
  }
`;
