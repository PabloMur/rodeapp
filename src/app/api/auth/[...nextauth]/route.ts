import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Ensure NextAuth can resolve its own endpoints in all environments
if (!process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = "http://localhost:3000";
}

const providers = [];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET ?? "dev-secret-placeholder",
  providers,
});

export { handler as GET, handler as POST };
