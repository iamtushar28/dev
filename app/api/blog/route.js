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
  api_secret: process.env.CLOUDINARY_API_SECRET,
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
      const uploadedImage = await cloudinary.v2.uploader.upload(
        `data:image/jpeg;base64,${base64Image}`,
        {
          folder: "blogs", // Organize images in Cloudinary
        }
      );

      coverImageUrl = uploadedImage.secure_url; // Get Cloudinary image URL
    }

    // Save to MongoDB
    const client = await clientPromise;
    const db = client.db();
    const newBlog = {
      title,
      description,
      coverImage: coverImageUrl, // Store Cloudinary image URL in DB
      authorId: new ObjectId(session.user.id),
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: 0,
      commentsCount: 0,
      tags,
    };

    const result = await db.collection("blogs").insertOne(newBlog);
    return NextResponse.json(
      { message: "Blog published successfully! ✅", blogId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/blog Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
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
      return NextResponse.json(
        { error: "Blog update failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Blog updated successfully!",
      blog: updatedBlog.value,
    });
  } catch (error) {
    console.error("PUT /api/blog Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a blog by ID
export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { blogId } = body;

    if (!blogId) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Ensure the blog exists and belongs to the logged-in user
    const existingBlog = await db.collection("blogs").findOne({
      _id: new ObjectId(blogId),
      authorId: new ObjectId(session.user.id),
    });

    if (!existingBlog) {
      return NextResponse.json(
        { error: "Blog not found or unauthorized" },
        { status: 404 }
      );
    }

    // ⛔️ SKIPPING Cloudinary deletion for now

    await db.collection("blogs").deleteOne({ _id: new ObjectId(blogId) });

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/blog error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
