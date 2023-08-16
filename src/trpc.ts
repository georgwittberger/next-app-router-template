import { createTRPCReact } from "@trpc/react-query";

import type { ApiRouter } from "~/server/api/router";

export const trpc = createTRPCReact<ApiRouter>();
