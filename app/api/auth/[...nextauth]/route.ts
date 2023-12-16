import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import TwitchProvider from "next-auth/providers/twitch";

const authOptions: NextAuthOptions = {
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID ?? "",
      clientSecret: process.env.TWITCH_SECRET ?? "",
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
