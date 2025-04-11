import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import path from "path";
import fs from "fs/promises";
import { ObjectId } from "mongodb";
import cloudinary from "cloudinary";


// POST: Create a new blog with image upload
cloudinary.v2.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); 
    }

    const formData = await req.formData();
    const title = formData.get("title") || "Untitled";
    const description = formData.get("description") || "";
    const tags = formData.get("tags") ? formData.get("tags").split(",") : [];
    
    let coverImageUrl = "";

    // Handle Image Upload
    const file = formData.get("coverImage");
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = buffer.toString("base64");

      // Upload to Cloudinary
      const uploadedImage = await cloudinary.v2.uploader.upload(`data:image/jpeg;base64,${base64Image}`, {
        folder: "blogs",  // Organize images in Cloudinary
      });

      coverImageUrl = uploadedImage.secure_url; // Get Cloudinary image URL
    }

    // Save to MongoDB
    const client = await clientPromise;
    const db = client.db();
    const newBlog = {
      title,
      description,
      coverImage: coverImageUrl,  // Store Cloudinary image URL in DB
      authorId: new ObjectId(session.user.id),
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: 0,
      commentsCount: 0,
      tags,
    };

    const result = await db.collection("blogs").insertOne(newBlog);
    return NextResponse.json({ message: "Blog published successfully!", blogId: result.insertedId }, { status: 201 });

  } catch (error) {
    console.error("POST /api/blog Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


// GET: Fetch blogs
// GET: Fetch blogs with author info
export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter") || "latest";
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 25;

    const sortOptions = {
      latest: { createdAt: -1 },
      "top-week": { likes: -1 },
      "top-month": { likes: -1 },
      "top-year": { likes: -1 },
      "top-infinity": { likes: -1 },
    };

    const sortBy = sortOptions[filter] || { createdAt: -1 };

    const blogs = await db.collection("blogs").aggregate([
      // Sort and paginate
      { $sort: sortBy },
      { $skip: (page - 1) * limit },
      { $limit: limit },

      // Lookup author info from "users" collection
      {
        $lookup: {
          from: "users",          // Your users collection
          localField: "authorId", // Blog's authorId
          foreignField: "_id",    // Users' _id
          as: "author"
        }
      },
      {
        $unwind: {
          path: "$author",
          preserveNullAndEmptyArrays: true
        }
      },

      // Optional: clean/rename fields
      {
        $project: {
          title: 1,
          content: 1,
          createdAt: 1,
          coverImage: 1,
          authorId: 1,
          creatorName: "$author.name",
          creatorProfile: "$author.image"
        }
      }
    ]).toArray();

    return NextResponse.json({ blogs: blogs || [] }, { status: 200 });

  } catch (error) {
    console.error("GET /api/blog Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}



// PUT: Update an existing blog
export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const blogId = formData.get("blogId");
    const title = formData.get("title") || "";
    const description = formData.get("description") || "";
    const tags = formData.get("tags") ? formData.get("tags").split(",") : [];

    let coverImageUrl = formData.get("existingCoverImage") || "";

    // Handle Image Upload (Only if a new image is provided)
    const file = formData.get("coverImage");
    if (file && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${file.name}`;
      const uploadPath = path.join(process.cwd(), "public/uploads", fileName);
      await fs.writeFile(uploadPath, buffer);
      coverImageUrl = `/uploads/${fileName}`;
    }

    // Update in MongoDB
    const client = await clientPromise;
    const db = client.db();
    const updatedBlog = await db.collection("blogs").findOneAndUpdate(
      { _id: new ObjectId(blogId), authorId: new ObjectId(session.user.id) },
      {
        $set: {
          title,
          description,
          coverImage: coverImageUrl,
          tags,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    if (!updatedBlog.value) {
      return NextResponse.json({ error: "Blog update failed" }, { status: 400 });
    }

    return NextResponse.json({ message: "Blog updated successfully!", blog: updatedBlog.value });

  } catch (error) {
    console.error("PUT /api/blog Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE: Remove a blog post
export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { blogId } = await req.json();

    const client = await clientPromise;
    const db = client.db();

    const deletedBlog = await db.collection("blogs").findOneAndDelete({
      _id: new ObjectId(blogId),
      authorId: new ObjectId(session.user.id),
    });

    if (!deletedBlog.value) {
      return NextResponse.json({ error: "Blog not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted successfully!" });

  } catch (error) {
    console.error("DELETE /api/blog Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
