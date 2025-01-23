import NextAuth from "next-auth";
import { prisma } from "@/prisma";
import Credentials from "next-auth/providers/credentials";
import compareHash from "@/utils/auth/compareHash";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user) {
            throw new Error("Invalid credentials");
          }

          const userPassword = credentials.password as string;
          const storedHash = user.password as string;

          if (!compareHash(userPassword, storedHash)) {
            throw new Error("Invalid credentials");
          }

          return user;
        } catch (error) {
          console.error(error);
          throw new Error("Unknown error occurred");
        }
      },
    }),
  ],
});
