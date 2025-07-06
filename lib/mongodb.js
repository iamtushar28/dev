import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) {
  throw new Error("Please add MONGODB_URI to your .env.local file");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// ✅ Helper for GraphQL and other users who want { db }
export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db(); // optionally pass db name here
  return { db, client };
}

// ✅ Keep default export for REST API compatibility
export default clientPromise;
