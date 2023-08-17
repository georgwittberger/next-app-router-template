// @ts-check
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import path from "node:path";
import postgres from "postgres";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

if (!process.env.DB_MIGRATE_URL) {
  throw new Error(
    "Missing database connection string. Please set environment variable DB_MIGRATE_URL. Example: postgres://username:password@localhost:5432/database"
  );
}

const client = postgres(process.env.DB_MIGRATE_URL, { max: 1 });
const db = drizzle(client);

const main = async () => {
  await migrate(db, { migrationsFolder: "drizzle" });
};

console.info("Starting database migration.");
main()
  .then(() => {
    console.info("Database migration completed.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Database migration failed. Error:", error);
    process.exit(1);
  });
