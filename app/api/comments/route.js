import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

// adding comment
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { comment, user_id, blog_id } = await req.json();

    if (!comment || !user_id || !blog_id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const newComment = {
      comment,
      user_id: new ObjectId(user_id),
      blog_id: new ObjectId(blog_id),
      createdAt: new Date(),
    };

    const result = await db.collection("comments").insertOne(newComment);
    return NextResponse.json(
      { message: "Comment added successfully!", commentId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in API /api/comments:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


// getting comment
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const blog_id = searchParams.get("blog_id");

    if (!blog_id) {
      return NextResponse.json({ error: "blog_id is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const comments = await db
      .collection("comments")
      .find({ blog_id: new ObjectId(blog_id) }) // Filter comments for the blog
      .sort({ createdAt: -1 }) // Show newest comments first
      .toArray();

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}