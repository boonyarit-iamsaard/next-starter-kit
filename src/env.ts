import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    APP_NAME: z.string(),
    DATABASE_URL: z.string().url(),
    MAIL_FROM_ADDRESS: z.string().email(),
    MAIL_FROM_NAME: z.string(),
    MAIL_HOST: z.string(),
    MAIL_PASSWORD: z.string(),
    MAIL_PORT: z.coerce.number().min(1).max(65535),
    MAIL_USER: z.string(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  client: {
    NEXT_PUBLIC_APP_NAME: z.string(),
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },

  runtimeEnv: {
    APP_NAME: process.env.APP_NAME,
    DATABASE_URL: process.env.DATABASE_URL,
    MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,
    MAIL_FROM_NAME: process.env.MAIL_FROM_NAME,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USER: process.env.MAIL_USER,
    NODE_ENV: process.env.NODE_ENV,

    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },

  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
  emptyStringAsUndefined: true,
});
