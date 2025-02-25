import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// ✅ Correct way to use getServerSession in Next.js App Router
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions); // No need to pass req & res manually
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection("users").findOne({ email: session.user.email });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user);
  } catch (error) {
    console.error("GET /api/user Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ✅ PUT: Update user profile
export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { website, location, bio, brandColor } = await req.json();

    const client = await clientPromise;
    const db = client.db();
    const updatedUser = await db.collection("users").findOneAndUpdate(
      { email: session.user.email },
      { $set: { website, location, bio, brandColor } },
      { returnDocument: "after" }
    );

    if (!updatedUser.value) return NextResponse.json({ error: "User update failed" }, { status: 400 });

    return NextResponse.json(updatedUser.value);
  } catch (error) {
    console.error("PUT /api/user Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
