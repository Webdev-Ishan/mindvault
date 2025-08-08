import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, User } from "next-auth";
import { prisma } from "./DB";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email or passwordf is wrong");
        }

        try {
          const existUser = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
          if (!existUser) {
            throw new Error("User not exist");
          }

          const samePassword = await bcrypt.compare(
            existUser.password,
            credentials.password
          );

          if (!samePassword) {
            throw new Error("Email or passwordf is wrong");
          }

          return {
            id: existUser.id.toString(),
            email: existUser.email,
            username: existUser.username,
            success: true,
          } as User;
        } catch (error) {
          if (error instanceof Error) {
            console.log("Auth Error:", error.message);
            return null;
          }
        }
        return null;
      },
    }),
  ],

  pages: {
    signIn: "/signin",
    signOut: "/signout",
    error: "/error",
  },
  session: {
    strategy: "jwt",

    maxAge: 30 * 24 * 60 * 60, // 30 days

    updateAge: 24 * 60 * 60, // 24 hours
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user && user.email) {
        const dbUser = await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });
        if (!dbUser) {
          // Add a custom flag to token
          token.registerRedirect = true;
          return token;
        }

        token.id = dbUser.id.toString();
        token.username = dbUser.username;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user.id = token.id), (session.user.username = token.username);
      }
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
};
