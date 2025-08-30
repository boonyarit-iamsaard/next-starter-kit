/** @type {import('lint-staged').Configuration} */
const config = {
  "*.{js,ts,jsx,tsx}": ["eslint", () => "tsc --noEmit"],
  "*": ["prettier --check --ignore-unknown"],
};

export default config;
