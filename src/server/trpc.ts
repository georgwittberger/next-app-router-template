import { TRPCError, initTRPC } from "@trpc/server";
import { getServerSession } from "next-auth";
import "server-only";
import superjson from "superjson";

import { authOptions } from "./auth";

export const createContext = async (_req: Request) => {
  const session = await getServerSession(authOptions);
  return { session };
};

const t = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const procedure = t.procedure;
export const middleware = t.middleware;

const authenticatedMiddleware = middleware(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Procedure requires authentication",
    });
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

export const protectedProcedure = procedure.use(authenticatedMiddleware);
