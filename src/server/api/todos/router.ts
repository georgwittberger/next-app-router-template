import { desc, eq } from "drizzle-orm";
import "server-only";

import { addToDoInputSchema } from "~/schemas/todos";
import { db } from "~/server/db/db";
import { todos } from "~/server/db/schema";
import { protectedProcedure, router } from "~/server/trpc";

export const todosRouter = router({
  list: protectedProcedure.query(async ({ ctx: { session } }) => {
    return await db.query.todos.findMany({
      where: eq(todos.userId, session.user.id),
      orderBy: [desc(todos.createdAt)],
    });
  }),
  add: protectedProcedure
    .input(addToDoInputSchema)
    .mutation(async ({ input, ctx: { session } }) => {
      await db
        .insert(todos)
        .values({ title: input.title, userId: session.user.id });
    }),
});
