import { drizzle } from "drizzle-orm/postgres-js";
import { reset } from "drizzle-seed";
import postgres from "postgres";

import * as schema from "~/core/database/schema";
import { env } from "~/env";

async function main() {
  console.info("🔄 Resetting database...");

  const client = postgres(env.DATABASE_URL, { max: 1 });
  const db = drizzle(client, { schema });

  try {
    await reset(db, schema);
    console.info("✅ Database reset completed");
  } catch (error) {
    console.error("❌ Database reset failed:", error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error("❌ Script failed:", error);
  process.exit(1);
});
