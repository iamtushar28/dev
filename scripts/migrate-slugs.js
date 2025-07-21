import { MongoClient } from 'mongodb';
import slugify from 'slugify';
import { nanoid } from 'nanoid';

const MONGO_URI = 'mongodb+srv://tusharsuryawanshi2232:4Y1wZoG5ZTu010Pt@cluster0.ovuyh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const DB_NAME = 'test';
const COLLECTION = 'blogs';

async function generateSlug(title) {
  const baseSlug = slugify(title, { lower: true, strict: true });
  const shortId = nanoid(5);
  return `${baseSlug}-${shortId}`;
}

async function migrateSlugs() {
  const client = await MongoClient.connect(MONGO_URI);
  const db = client.db(DB_NAME);
  const blogs = db.collection(COLLECTION);

  const cursor = blogs.find({ slug: { $exists: false } });

  let count = 0;

  while (await cursor.hasNext()) {
    const blog = await cursor.next();
    const slug = await generateSlug(blog.title);

    await blogs.updateOne(
      { _id: blog._id },
      { $set: { slug } }
    );

    console.log(`✅ Updated blog "${blog.title}" with slug: ${slug}`);
    count++;
  }

  console.log(`🎉 Migration complete. Total updated: ${count}`);
  client.close();
}

migrateSlugs().catch(console.error);
