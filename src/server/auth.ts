import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import "server-only";

import { signInPagePath } from "~/auth";
import { env } from "~/env.mjs";
import { defaultLocale } from "~/i18n";
import { db } from "./db/db";

export const authOptions: AuthOptions = {
  // Note: Cast required to workaround issue https://github.com/nextauthjs/next-auth/issues/8283
  adapter: DrizzleAdapter(db) as AuthOptions["adapter"],
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: signInPagePath(defaultLocale),
  },
  callbacks: {
    session({ session, user }) {
      const sessionUser = session.user ?? {};
      sessionUser.id = user.id;
      session.user = sessionUser;
      return session;
    },
  },
};
