import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const blog_id = searchParams.get("blog_id");

    if (!blog_id) {
      return NextResponse.json({ error: "blog_id is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const commentsCount = await db
      .collection("comments")
      .countDocuments({ blog_id: new ObjectId(blog_id) });

    return NextResponse.json({ count: commentsCount }, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments count:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
