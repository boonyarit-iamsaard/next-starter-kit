import simpleImportSort from "eslint-plugin-simple-import-sort";
import { baseConfig } from "./base.js";

/**
 * Import sorting ESLint configuration
 * Extends the base configuration with simple import sort rules
 */
export const importSortConfig = [
  ...baseConfig,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
];

export default importSortConfig;
