import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      const userExists = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });

      if (userExists) {
        session.user = {
          ...session.user,
          id: userExists.id,
          name: userExists.name,
          email: userExists.email,
          image: userExists.image,
          role: userExists.role, // Ensure role is added to the session
        };
      }

      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === "google") {
        const { name, email, image } = user;

        const userExists = await prisma.user.findUnique({
          where: { email },
        });

        if (!userExists) {
          await prisma.user.create({
            data: {
              email,
              name,
              image,
              role: email === process.env.DEV_EMAIL ? "DEV" : "USER",
            },
          });
        }

        return true;
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.role = user.role;
      }

      if (account) {
        token.accessToken = account.access_token; // Ensure accessToken is added to the token
      }

      return token;
    },
  },
};
