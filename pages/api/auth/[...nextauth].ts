import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '../../../prisma/client';
import SessionWithId from '../../../src/utils/types/SessionWithId';

export default NextAuth({
  providers: [
    Providers.Credentials({
      credentials: {
        email: { label: "E-mail", type: "text", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(_credentials, _req) {
        return null;
      },
    })
  ],
  callbacks: {
    async session(session, user) {
      const newSession = session as SessionWithId;
      newSession.id = user.sub as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    signingKey: process.env.JWT_SIGNING_KEY,
  },
});
