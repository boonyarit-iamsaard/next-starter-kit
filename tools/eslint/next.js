import { FlatCompat } from "@eslint/eslintrc";
import { baseConfig } from "./base.js";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

/**
 * Next.js specific ESLint configuration
 * Extends the base configuration with Next.js core web vitals rules
 */
export const nextConfig = [
  ...baseConfig,
  ...compat.extends("next/core-web-vitals"),
];

export default nextConfig;
