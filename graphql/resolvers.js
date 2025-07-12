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

    // Fetch blog reactions
    reactions: async (parent, _, context) => {
      try {
        const blogId = parent._id.toString();

        const reactionDoc = await context.db
          .collection("reactions")
          .findOne({ blogId });

        if (!reactionDoc) {
          return { like: 0, unicorn: 0, excite: 0, fire: 0, star: 0 };
        }

        return {
          like: reactionDoc.like || 0,
          unicorn: reactionDoc.unicorn || 0,
          excite: reactionDoc.excite || 0,
          fire: reactionDoc.fire || 0,
          star: reactionDoc.star || 0,
        };
      } catch (error) {
        console.error("Error fetching reactions:", error);
        return { like: 0, unicorn: 0, excite: 0, fire: 0, star: 0 };
      }
    },

    //featching total reactions count for blog
    totalReactionsCount: async (parent, _, context) => {
      try {
        const blogId = parent._id?.toString();
        console.log("Looking up reactions for Blog ID:", blogId);

        if (!blogId) return 0;

        const reaction = await context.db
          .collection("reactions")
          .findOne({ blogId });

        console.log("Reaction doc found:", reaction);

        if (!reaction) return 0;

        const {
          like = 0,
          unicorn = 0,
          excite = 0,
          fire = 0,
          star = 0,
        } = reaction;

        return like + unicorn + excite + fire + star;
      } catch (error) {
        console.error("Error calculating totalReactionsCount:", error);
        return 0;
      }
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
