import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

if (!process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = "http://localhost:3000";
}

const providers: any[] = [
  CredentialsProvider({
    id: "demo",
    name: "Demo",
    credentials: {},
    async authorize() {
      return {
        id: "demo",
        name: "Motoviajero Demo",
        email: "demo@rodeapp.com",
        image: null,
      };
    },
  }),
];

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
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (url.startsWith(baseUrl)) return url;
      return `${baseUrl}/home`;
    },
  },
});

export { handler as GET, handler as POST };
