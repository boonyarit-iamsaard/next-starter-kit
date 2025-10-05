import { baseConfig } from "@next-solution/eslint/base";
import { drizzleConfig } from "@next-solution/eslint/drizzle";
import { importSortConfig } from "@next-solution/eslint/import-sort";
import { nextConfig } from "@next-solution/eslint/next";

/**
 * ESLint configuration for the admin app
 * Composes configurations from @next-solution/eslint:
 * - Base TypeScript rules
 * - Next.js specific rules
 * - Drizzle ORM rules
 * - Import sorting rules
 */
const config = [
  ...baseConfig,
  ...nextConfig,
  ...drizzleConfig,
  ...importSortConfig,
];

export default config;
