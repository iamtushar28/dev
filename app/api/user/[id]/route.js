import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    // Explicitly await params before accessing its properties
    const awaitedParams = await params; 
    const id = awaitedParams.id; 

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    // Fetch the user details
    const user = await db.collection("users").findOne(
      { _id: new ObjectId(id) },
      { projection: { name: 1, image: 1, bio:1, location:1, website:1, brandColor:1, joinedAt:1 } } // Fetch only necessary fields
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    console.error("GET /api/user/:id Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
