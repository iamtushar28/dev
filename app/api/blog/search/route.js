import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const searchQuery = url.searchParams.get("title");

    const client = await clientPromise;
    const db = client.db();

    // Build dynamic match condition
    const matchStage = searchQuery?.trim()
      ? { title: { $regex: searchQuery, $options: "i" } }
      : {}; // empty match to fetch all

    const blogs = await db.collection("blogs").aggregate([
      { $match: matchStage },
      {
        $addFields: {
          authorId: { $toObjectId: "$authorId" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: {
          path: "$author",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          createdAt: -1, // 🆕 Sort by newest date first
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          creatorName: "$author.name",
          creatorProfile: "$author.image",
          createdAt: 1,
        },
      },
    ]).toArray();

    return NextResponse.json(blogs, { status: 200 });

  } catch (error) {
    console.error("GET /api/blog/search Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
