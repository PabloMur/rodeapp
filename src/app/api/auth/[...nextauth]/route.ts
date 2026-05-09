import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET ?? "dev-secret-placeholder",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as any,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as any,
    }),
  ],
});

export { handler as GET, handler as POST };
