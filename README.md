# **Data base structure ⚙️**

# 1. Users Collection (users)
Stores user details, including authentication data, additional profile info, and timestamps.

{
-  _id: ObjectId,           // Unique user ID
 - name: String,            // Full name from uth provider
 - email: String,           // Email (unique)
 - image: String,    // Profile picture URL
 - provider: String,        // Auth provider (Google, GitHub, etc.)
 - website: String,         // Personal website URL (optional)
 - location: String,        // User location (optional)
 - bio: String,             // Short bio about user
 - brandColor: String,      // User's preferred UI color
 - joinedAt: Date,          // Timestamp when account was created
 - followers: [ObjectId],   // List of users following this user
 - following: [ObjectId],   // List of users this user follows
 - bookmarks: [ObjectId],   // List of bookmarked blog IDs
}

## 2. Blogs Collection (blogs)
Stores all blog posts created by users.

{
- _id: ObjectId,           // Unique blog ID
- title: String,           // Blog title
- description: String,     // Blog content
-  coverImage: String,      // Cover image URL (optional)
-  authorId: ObjectId,      // Reference to `users` collection
-  createdAt: Date,         // Timestamp when blog was created
-  updatedAt: Date,         // Timestamp when blog was last updated
-  likes: Number,           // Number of likes
-  commentsCount: Number,   // Number of comments
-  tags: [String],          // Tags for categorization
}


## 3. Comments Collection (comments)
Stores comments made on blogs.

{
  _id: ObjectId,           // Unique comment ID
  blogId: ObjectId,        // Reference to `blogs` collection
  userId: ObjectId,        // Reference to `users` collection
  content: String,         // Comment text
  createdAt: Date,         // Timestamp when comment was posted
}


# 4. Followers Collection (followers)
Stores relationships between users who follow each other.

{
 - _id: ObjectId,           // Unique ID for this   
 - follow relationship
 - followerId: ObjectId,    // User who follows
 - followingId: ObjectId,   // User being followed
 - createdAt: Date,         // Timestamp when follow happened
}


# 5. Bookmarks Collection (bookmarks)
Stores blog bookmarks for users.

{
-  _id: ObjectId,           // Unique bookmark ID
-  userId: ObjectId,        // Reference to `users` collection
-  blogId: ObjectId,        // Reference to `blogs` collection
-  createdAt: Date,         // Timestamp when blog was bookmarked
}

