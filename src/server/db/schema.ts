import { pgTable } from "drizzle-orm/pg-core";

export const user = pgTable("users", (d) => ({
  id: d.text().primaryKey(),
  name: d.text().notNull(),
  email: d.text().notNull().unique(),
  emailVerified: d
    .boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: d.text(),
  createdAt: d
    .timestamp("created_at", { mode: "date", withTimezone: true })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: d
    .timestamp("updated_at", { mode: "date", withTimezone: true })
    .$defaultFn(() => new Date())
    .notNull(),
}));

export const session = pgTable("sessions", (d) => ({
  id: d.text().primaryKey(),
  expiresAt: d
    .timestamp("expires_at", { mode: "date", withTimezone: true })
    .notNull(),
  token: d.text().notNull().unique(),
  createdAt: d
    .timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull(),
  updatedAt: d
    .timestamp("updated_at", { mode: "date", withTimezone: true })
    .notNull(),
  ipAddress: d.text("ip_address"),
  userAgent: d.text("user_agent"),
  userId: d
    .text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
}));

export const account = pgTable("accounts", (d) => ({
  id: d.text().primaryKey(),
  accountId: d.text("account_id").notNull(),
  providerId: d.text("provider_id").notNull(),
  userId: d
    .text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: d.text("access_token"),
  refreshToken: d.text("refresh_token"),
  idToken: d.text("id_token"),
  accessTokenExpiresAt: d.timestamp("access_token_expires_at", {
    mode: "date",
    withTimezone: true,
  }),
  refreshTokenExpiresAt: d.timestamp("refresh_token_expires_at", {
    mode: "date",
    withTimezone: true,
  }),
  scope: d.text(),
  password: d.text(),
  createdAt: d
    .timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull(),
  updatedAt: d
    .timestamp("updated_at", { mode: "date", withTimezone: true })
    .notNull(),
}));

export const verification = pgTable("verifications", (d) => ({
  id: d.text().primaryKey(),
  identifier: d.text().notNull(),
  value: d.text().notNull(),
  expiresAt: d
    .timestamp("expires_at", { mode: "date", withTimezone: true })
    .notNull(),
  createdAt: d
    .timestamp("created_at", { mode: "date", withTimezone: true })
    .$defaultFn(() => new Date()),
  updatedAt: d
    .timestamp("updated_at", { mode: "date", withTimezone: true })
    .$defaultFn(() => new Date()),
}));
