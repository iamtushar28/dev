import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db();

  const bookmarks = await db
    .collection('bookmarks')
    .find({ userId: session.user.id }) // adjust if userId is ObjectId
    .toArray();

  const blogIds = bookmarks.map((b) => new ObjectId(b.blogId));

  const blogs = await db
    .collection('blogs')
    .find({ _id: { $in: blogIds } })
    .toArray();

  // Extract unique author IDs
  const authorIds = [...new Set(blogs.map((blog) => blog.authorId).filter(Boolean))];

  // Fetch author details in parallel
  const authorResponses = await Promise.all(
    authorIds.map((id) =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`).then((res) =>
        res.ok ? res.json() : null
      )
    )
  );

  // Map authorId -> author data
  const authorMap = authorResponses.reduce((acc, author, index) => {
    if (author) {
      acc[authorIds[index]] = author;
    }
    return acc;
  }, {});

  // Add creator details to each blog
  const blogsWithCreator = blogs.map((blog) => ({
    ...blog,
    creatorName: authorMap[blog.authorId]?.name || 'Unknown',
    creatorProfile: authorMap[blog.authorId]?.image || null,
  }));

  return NextResponse.json({ blogs: blogsWithCreator });
}
