import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts";
import { getUser } from "@/app/db";
import { authConfig } from "app/auth.config";
import { User } from "@/lib/definitions";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      authorize: async ({ email, password }: any) => {
        let user: User = await getUser(email);
        if (!user) return null;
        let passwordsMatch = await compare(password, user.password!);
        if (passwordsMatch) {
          return user as any;
        }
      },
    }),
  ],
});
