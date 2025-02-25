import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../../lib/mongodb";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      const client = await clientPromise;
      const db = client.db();

      // Check if user exists in the database
      const existingUser = await db.collection("users").findOne({ email: user.email });

      if (existingUser) {
        // Check if the provider account already exists
        const existingAccount = await db.collection("accounts").findOne({
          userId: existingUser._id,
          provider: account.provider,
        });

        if (!existingAccount) {
          // If the provider account doesn't exist, link it
          await db.collection("accounts").insertOne({
            userId: existingUser._id,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            expires_at: account.expires_at,
            token_type: account.token_type,
            scope: account.scope,
          });
        }
      } else {
        // Create new user in database
        const newUser = await db.collection("users").insertOne({
          name: user.name,
          email: user.email,
          image: user.image,
          website: "",
          location: "",
          bio: "",
          brandColor: "#000000",
          joinedAt: new Date(),
        });

        // Link the new user's provider account
        await db.collection("accounts").insertOne({
          userId: newUser.insertedId,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
        });
      }

      return true;
    },

    async session({ session }) {
      const client = await clientPromise;
      const db = client.db();

      // Fetch user from database and include their ID in the session
      const dbUser = await db.collection("users").findOne({ email: session.user.email });

      if (dbUser) {
        session.user.id = dbUser._id.toString(); // Convert MongoDB ObjectId to string
      }

      return session;
    },

    async redirect({ url, baseUrl }) {
      return baseUrl; // Redirect user to home page after login
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
