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

        if (!blogId) return 0;

        const reaction = await context.db
          .collection("reactions")
          .findOne({ blogId });

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

    blog: async (_, { id }, context) => {
      try {
        const blog = await context.db
          .collection("blogs")
          .findOne({ _id: new ObjectId(id) });

        if (!blog) {
          throw new Error("Blog not found");
        }

        const session = context.session;
        let isBookmarked = false;

        if (session?.user?.id) {
          const bookmark = await context.db.collection("bookmarks").findOne({
            userId: session.user.id,
            blogId: id,
          });

          isBookmarked = !!bookmark;
        }

        return {
          ...blog,
          _id: blog._id.toString(),
          authorId: blog.authorId?.toString(),
          bookmarked: isBookmarked, // ✅ always return boolean
        };
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
