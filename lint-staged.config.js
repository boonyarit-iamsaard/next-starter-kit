/** @type {import('lint-staged').Configuration} */
const config = {
  "*.{js,jsx}": ["eslint"],
  "*.{ts,tsx}": ["eslint", "tsc --noEmit"],
  "*": ["prettier --check --ignore-unknown"],
};

export default config;
