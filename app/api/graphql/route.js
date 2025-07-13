import { createYoga } from "graphql-yoga";
import { schema } from "@/graphql";
import { connectToDatabase } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust path if needed

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Request, Response },
  context: async ({ request }) => {
    const session = await getServerSession(authOptions); // Get user session
    const { db } = await connectToDatabase();

    return {
      db,
      session, // Makes session available to resolvers
    };
  },
});

export { yoga as GET, yoga as POST };
