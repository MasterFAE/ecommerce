import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";
import Credentials from "next-auth/providers/credentials";
import argon2 from "argon2";
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    jwt({ token, user }) {
      if (token && user) {
        delete token?.password;
        delete token?.emailVerified;
        token.user = user;
      }
      return token;
    },
    session({ session, token }) {
      if (token && token.user) {
        session.user = token.user;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    //Change discord redirect in with vercel link
    //https://discord.com/developers/applications
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    Credentials({
      name: "Log In",
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user = await prisma.user.findFirst({ where: { name: email } });
        if (!user) return null;
        const result = await argon2.verify(user.password, password);
        if (!result) return null;
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
    // ...add more providers here
  ],
  // pages: {
  //   // signIn: "/auth/login",
  // },
};

export default NextAuth(authOptions);
