import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from '@/lib/mongodb';

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const { blogId } = await req.json();

  if (!session || !blogId) {
    return NextResponse.json({ error: 'Unauthorized or missing blogId' }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();
  const bookmarks = db.collection('bookmarks');

  const existing = await bookmarks.findOne({
    userId: session.user.id,
    blogId,
  });

  if (existing) {
    return NextResponse.json({ message: 'Already bookmarked' }, { status: 200 });
  }

  await bookmarks.insertOne({
    userId: session.user.id,
    blogId,
    createdAt: new Date(),
  });

  return NextResponse.json({ message: 'Bookmarked' }, { status: 201 });
}

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  const { blogId } = await req.json();

  if (!session || !blogId) {
    return NextResponse.json({ error: 'Unauthorized or missing blogId' }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();
  const bookmarks = db.collection('bookmarks');

  await bookmarks.deleteOne({
    userId: session.user.id,
    blogId,
  });

  return NextResponse.json({ message: 'Bookmark removed' }, { status: 200 });
}

export async function GET(req) {
  const session = await getServerSession(authOptions);
  const blogId = new URL(req.url).searchParams.get('blogId');

  if (!session || !blogId) {
    return NextResponse.json({ bookmarked: false }, { status: 200 });
  }

  const client = await clientPromise;
  const db = client.db();
  const bookmarks = db.collection('bookmarks');

  const existing = await bookmarks.findOne({
    userId: session.user.id,
    blogId,
  });

  return NextResponse.json({ bookmarked: !!existing });
}
