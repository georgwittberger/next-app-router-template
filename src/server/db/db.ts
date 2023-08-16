import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "server-only";

import { env } from "~/env.mjs";
import * as schema from "./schema";

const client = postgres(env.DB_URL);
export const db = drizzle(client, { schema });
