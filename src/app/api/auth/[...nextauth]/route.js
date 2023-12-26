import prisma from "../../../../../lib/prisma";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Quality Forum",
      credentials: {
        email: {
          label: "CollegeID",
          type: "email",
          placeholder: "A2021CSE7714@imsec.ac.in",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            collegeId: credentials.email,
          },
        });
        if (!user) {
          return null;
        }
        const correctPassword = await bcryptjs.compare(
          credentials.password,
          user.password
        );
        console.log(correctPassword);
        if (correctPassword) {
          return {
            id: user.id,
            collegeId: user.collegeId,
            role: user.role,
            name: user.name,
          };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session = {
        ...session,
        user: {
          id: token.user.id,
          role: token.user.role,
          collegeId: token.user.collegeId,
          ...session.user,
        },
      };
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
