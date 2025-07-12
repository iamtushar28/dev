// /graphql/queries/getBlogById.js
import { gql } from "@apollo/client";

export const GET_BLOG_BY_ID = gql`
  query Blog($id: ID!) {
    blog(id: $id) {
      _id
      title
      description
      coverImage
      createdAt
      updatedAt
      commentsCount
      totalReactionsCount

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
        like
        unicorn
        excite
        fire
        star
      }  
    }
  }
`;
