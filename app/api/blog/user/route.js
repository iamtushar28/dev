import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const client = await clientPromise;
    const db = client.db();

    const blogs = await db.collection('blogs').aggregate([
      {
        $match: {
          authorId: new ObjectId(userId),
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'authorId',
          foreignField: '_id',
          as: 'author'
        }
      },
      {
        $unwind: {
          path: '$author',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          createdAt: 1,
          updatedAt: 1,
          creatorName: '$author.name',
          creatorProfile: '$author.image'
        }
      }
    ]).toArray();

    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("Error in GET /api/blog/user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
