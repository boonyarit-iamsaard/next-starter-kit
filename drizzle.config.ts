import { type Config } from "drizzle-kit";

import { env } from "~/env";

const config = {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["next-starter-kit_*"],
} satisfies Config;

export default config;
