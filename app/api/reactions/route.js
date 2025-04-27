import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// Create index automatically (if not exists)
async function ensureIndex(db) {
  const reactions = db.collection('reactions');
  await reactions.createIndex({ blogId: 1 }, { unique: true });
}

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const reactionsCollection = db.collection('reactions');

    await ensureIndex(db);

    const body = await req.json();
    const { blogId, reactionType, userId } = body;

    if (!blogId || !reactionType || !userId) {
      return NextResponse.json({ error: 'Missing blogId, reactionType or userId' }, { status: 400 });
    }

    // Find reaction doc
    let reactionDoc = await reactionsCollection.findOne({ blogId });

    if (!reactionDoc) {
      // create document if not exists
      reactionDoc = {
        blogId,
        like: 0,
        unicorn: 0,
        excite: 0,
        fire: 0,
        star: 0,
        usersReacted: {},
      };
      await reactionsCollection.insertOne(reactionDoc);
    }

    const userReactedList = reactionDoc.usersReacted?.[reactionType] || [];
    const hasReacted = userReactedList.includes(userId);

    let update = {};

    if (hasReacted) {
      // If already reacted, remove reaction
      update = {
        $inc: { [reactionType]: -1 },
        $pull: { [`usersReacted.${reactionType}`]: userId },
      };
    } else {
      // If not reacted, add reaction
      update = {
        $inc: { [reactionType]: 1 },
        $push: { [`usersReacted.${reactionType}`]: userId },
      };
    }

    await reactionsCollection.updateOne({ blogId }, update);

    const updatedReactionDoc = await reactionsCollection.findOne({ blogId });

    return NextResponse.json({ message: 'Reaction updated', reactions: updatedReactionDoc }, { status: 200 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const reactionsCollection = db.collection('reactions');

    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get('blogId');

    if (!blogId) {
      return NextResponse.json({ error: 'Missing blogId' }, { status: 400 });
    }

    const reactionDoc = await reactionsCollection.findOne({ blogId });

    if (!reactionDoc) {
      return NextResponse.json({
        reactions: {
          like: 0,
          unicorn: 0,
          excite: 0,
          fire: 0,
          star: 0,
        }
      }, { status: 200 });
    }

    return NextResponse.json({ reactions: reactionDoc }, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
