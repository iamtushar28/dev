import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb"; // ✅ Ensure correct DB connection import

export async function GET(req) {
  try {
    const url = new URL(req.url); 
    const id = url.pathname.split("/").pop(); // ✅ Extract `id` from URL path

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const blog = await db.collection("blogs").findOne({ _id: new ObjectId(id) });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });

  } catch (error) {
    console.error("GET /api/blog/[id] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
