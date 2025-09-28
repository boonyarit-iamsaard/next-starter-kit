import type { NextConfig } from "next";

const config = {
  eslint: {
    ignoreDuringBuilds: true,
  },
} satisfies NextConfig;

export default config;
