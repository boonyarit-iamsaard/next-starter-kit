// @ts-ignore -- no types for this plugin
import drizzle from "eslint-plugin-drizzle";
import { baseConfig } from "./base.js";

/**
 * Drizzle ORM specific ESLint configuration
 * Extends the base configuration with Drizzle database rules
 */
export const drizzleConfig = [
  ...baseConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      drizzle,
    },
    rules: {
      "drizzle/enforce-delete-with-where": [
        "error",
        { drizzleObjectName: ["db", "ctx.db"] },
      ],
      "drizzle/enforce-update-with-where": [
        "error",
        { drizzleObjectName: ["db", "ctx.db"] },
      ],
    },
  },
];

export default drizzleConfig;
