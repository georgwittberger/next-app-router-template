import "server-only";

import { router } from "~/server/trpc";
import { todosRouter } from "./todos/router";

export const apiRouter = router({
  todos: todosRouter,
});

export type ApiRouter = typeof apiRouter;
