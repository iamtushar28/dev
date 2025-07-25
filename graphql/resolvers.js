import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

    // getting reactions
    reactions: async (parent, _, { db }) => {
      const results = await db
        .collection("reactions")
        .aggregate([
          { $match: { blogId: parent._id.toString() } },
          { $group: { _id: "$emoji", count: { $sum: 1 } } },
          { $project: { emoji: "$_id", count: 1, _id: 0 } },
        ])
        .toArray();

      return results;
    },

    userReactions: async (parent, _, { db, session }) => {
      if (!session || !session.user?.id) return [];

      const userId = session.user.id;

      const results = await db
        .collection("reactions")
        .find({
          blogId: parent._id.toString(),
          userId,
        })
        .toArray();

      return results.map((r) => r.emoji);
    },

    // 🚀 Comments (from updated schema)
    comments: async (parent, _, { db }) => {
      return await db
        .collection("comments")
        .find({ blog_id: new ObjectId(parent._id) })
        .sort({ createdAt: -1 }) // Optional: show latest first
        .toArray();
    },

    // 🧮 Count
    commentsCount: async (parent, _, { db }) => {
      return await db
        .collection("comments")
        .countDocuments({ blog_id: new ObjectId(parent._id) });
    },
  },

  Comment: {
    // 👤 Get the comment's author (now using `user_id`)
    author: async (parent, _, { db }) => {
      return await db
        .collection("users")
        .findOne({ _id: new ObjectId(parent.user_id) });
    },
  },

  Mutation: {
    //toogling reaction
    toggleReaction: async (_, { blogId, emoji }, { db, session }) => {
      if (!session || !session.user?.id) {
        throw new Error("Unauthorized");
      }

      const userId = session.user.id;

      const reactions = db.collection("reactions");
      const filter = {
        blogId,
        userId,
        emoji,
      };

      const existing = await reactions.findOne(filter);

      if (existing) {
        // 👎 REMOVE reaction
        await reactions.deleteOne({ _id: existing._id });
      } else {
        // 👍 ADD reaction
        await reactions.insertOne({
          blogId,
          userId,
          emoji,
          createdAt: new Date(),
        });
      }

      // ✅ Return updated count
      const count = await reactions.countDocuments({ blogId, emoji });
      return { emoji, count };
    },

    // ✍️ Add comment using `comment`, `user_id`, `blog_id`
    addComment: async (_, { blogId, comment }, { db, session }) => {
      if (!session?.user?.id) throw new Error("Unauthorized");

      const userId = session.user.id;

      const commentDoc = {
        comment: comment,
        blog_id: new ObjectId(blogId),
        user_id: new ObjectId(userId),
        createdAt: new Date(),
      };

      const result = await db.collection("comments").insertOne(commentDoc);

      return {
        _id: result.insertedId,
        comment: commentDoc.comment,
        blog_id: commentDoc.blog_id,
        user_id: commentDoc.user_id,
        createdAt: commentDoc.createdAt,
      };
    },

    deleteComment: async (_, { commentId, blogId }, { db, session }) => {
      if (!session?.user?.id) throw new Error("Unauthorized");

      const userId = session.user.id;

      const comment = await db
        .collection("comments")
        .findOne({ _id: new ObjectId(commentId) });

      if (!comment) throw new Error("Comment not found");
      if (comment.user_id.toString() !== userId.toString())
        throw new Error("Unauthorized");

      // Delete the comment
      await db
        .collection("comments")
        .deleteOne({ _id: new ObjectId(commentId) });

      // Decrement comment count in blog
      await db
        .collection("blogs")
        .updateOne(
          { _id: new ObjectId(blogId) },
          { $inc: { commentsCount: -1 } }
        );

      return { _id: commentId };
    },
  },

  Query: {
    blogs: async (_, __, context) => {
      try {
        const session = context.session;
        const userId = session?.user?.id;

        const blogs = await context.db
          .collection("blogs")
          .find()
          .sort({ createdAt: -1 })
          .toArray();

        if (!userId) {
          // not logged in, return blogs with bookmarked = false
          return blogs.map((blog) => ({
            ...blog,
            _id: blog._id.toString(),
            bookmarked: false,
          }));
        }

        // Get all bookmarks by current user
        const userBookmarks = await context.db
          .collection("bookmarks")
          .find({ userId })
          .toArray();

        const bookmarkedBlogIds = new Set(
          userBookmarks.map((b) => b.blogId.toString())
        );

        return blogs.map((blog) => ({
          ...blog,
          _id: blog._id.toString(),
          bookmarked: bookmarkedBlogIds.has(blog._id.toString()),
        }));
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        throw new Error("Failed to fetch blogs");
      }
    },

    blogBySlug: async (_, { slug }, context) => {
      try {
        const blog = await context.db.collection("blogs").findOne({ slug });

        if (!blog) {
          throw new Error("Blog not found");
        }

        const session = context.session;
        let isBookmarked = false;

        if (session?.user?.id) {
          const bookmark = await context.db.collection("bookmarks").findOne({
            userId: session.user.id,
            blogId: blog._id.toString(),
          });

          isBookmarked = !!bookmark;
        }

        return {
          ...blog,
          _id: blog._id.toString(),
          authorId: blog.authorId?.toString(),
          bookmarked: isBookmarked,
        };
      } catch (error) {
        console.error("Failed to fetch blog by slug:", error);
        throw new Error("Failed to fetch blog by slug");
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

    //getting blog of logged-in user
    getUserBlogs: async (_, __, context) => {
      const session = context.session;

      if (!session || !session.user?.id) {
        throw new Error("Unauthorized");
      }

      const userId = session.user.id;

      // Fetch user's bookmarks
      const bookmarks = await context.db
        .collection("bookmarks")
        .find({ userId: userId })
        .toArray();

      const bookmarkedIds = new Set(bookmarks.map((b) => b.blogId.toString()));

      // Fetch blogs authored by the user
      const blogs = await context.db
        .collection("blogs")
        .find({ authorId: new ObjectId(userId) })
        .sort({ createdAt: -1 })
        .toArray();

      return blogs.map((blog) => ({
        ...blog,
        _id: blog._id.toString(),
        authorId: blog.authorId?.toString(),
        bookmarked: bookmarkedIds.has(blog._id.toString()), // ✅ Include this field
      }));
    },

    // Search blogs by title
    searchBlogs: async (_, { title }, context) => {
      const session = context.session;
      const userId = session?.user?.id;

      try {
        const regex = new RegExp(title, "i"); // case-insensitive search

        // Fetch blogs matching the search
        const blogs = await context.db
          .collection("blogs")
          .find({ title: { $regex: regex } })
          .sort({ createdAt: -1 })
          .toArray();

        // If user is logged in, get their bookmarked blog IDs
        let bookmarkedIds = new Set();
        if (userId) {
          const bookmarks = await context.db
            .collection("bookmarks")
            .find({ userId: userId })
            .toArray();

          bookmarkedIds = new Set(bookmarks.map((b) => b.blogId.toString()));
        }

        return blogs.map((blog) => ({
          ...blog,
          _id: blog._id.toString(),
          authorId: blog.authorId?.toString(),
          bookmarked: bookmarkedIds.has(blog._id.toString()),
        }));
      } catch (error) {
        console.error("Error searching blogs:", error);
        throw new Error("Failed to search blogs");
      }
    },

    //bookmarked blogs of user
    bookmarkedBlogs: async (_, __, context) => {
      const session = context.session;

      if (!session?.user?.id) {
        throw new Error("Unauthorized");
      }

      const userId = session.user.id;

      // 🔹 Step 1: Get bookmarks for the user
      const bookmarks = await context.db
        .collection("bookmarks")
        .find({ userId }) // userId is string in DB
        .toArray();

      const blogIds = bookmarks.map((b) => new ObjectId(b.blogId));

      if (blogIds.length === 0) return [];

      // 🔹 Step 2: Fetch blogs by those IDs
      const blogs = await context.db
        .collection("blogs")
        .find({ _id: { $in: blogIds } })
        .sort({ createdAt: -1 })
        .toArray();

      return blogs.map((blog) => ({
        ...blog,
        _id: blog._id.toString(),
        authorId: blog.authorId?.toString(),
        bookmarked: true, // ✅ always true for reading list
      }));
    },
  },
};
