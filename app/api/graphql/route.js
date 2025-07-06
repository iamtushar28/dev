import { createYoga } from "graphql-yoga";
import { schema } from "@/graphql";
import { connectToDatabase } from "@/lib/mongodb";

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Request, Response },
  context: async () => {
    const { db } = await connectToDatabase(); // NOW this will work!
    return { db };
  },
});

export { yoga as GET, yoga as POST };
