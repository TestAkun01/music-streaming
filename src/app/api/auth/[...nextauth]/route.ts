import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth", // Halaman kustom login
    error: "/auth", // Halaman error login (jika ada)
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (
          account &&
          (account.provider === "google" || account.provider === "github")
        ) {
          await connectToDatabase();
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              username: profile?.name || user.name,
              email: user.email,
              profile_picture: profile?.image || "",
              account_type: "free",
              created_at: new Date(),
            });
            await newUser.save();
          }
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error during signIn callback", error);
        return false;
      }
    },
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user?: any;
      account?: any;
    }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.image = token.image;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url === baseUrl || url === "/") {
        return "/dashboard";
      }
      return url;
    },
  },
});

export { handler as GET, handler as POST };
