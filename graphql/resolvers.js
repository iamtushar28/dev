import { ObjectId } from "mongodb";

export const resolvers = {
  Blog: {

    //getting blog's author
    author: async (parent, _, context) => {
      try {
        return await context.db
          .collection("users")
          .findOne({ _id: new ObjectId(parent.authorId) });
      } catch (error) {
        console.error("Failed to fetch author:", error);
        return null;
      }
    },

    //getting comments count of blog
    commentsCount: async (parent, _, context) => {
      return await context.db
        .collection("comments")
        .countDocuments({ blog_id: new ObjectId(parent._id) });
    },
  },

  Query: {
    blogs: async (_, __, context) => {
      try {
        return await context.db
          .collection("blogs")
          .find()
          .sort({ createdAt: -1 }) // newest first
          .toArray();
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        throw new Error("Failed to fetch blogs");
      }
    },

    blog: async (_, { id }, context) => {
      try {
        return await context.db
          .collection("blogs")
          .findOne({ _id: new ObjectId(id) });
      } catch (error) {
        console.error("Failed to fetch blog:", error);
        throw new Error("Failed to fetch blog");
      }
    },

    users: async (_, __, context) => {
      try {
        return await context.db.collection("users").find().toArray();
      } catch (error) {
        console.error("Failed to fetch users:", error);
        throw new Error("Failed to fetch users");
      }
    },

    user: async (_, { id }, context) => {
      try {
        return await context.db
          .collection("users")
          .findOne({ _id: new ObjectId(id) });
      } catch (error) {
        console.error("Failed to fetch user:", error);
        throw new Error("Failed to fetch user");
      }
    },
  },
};
