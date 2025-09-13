import { pgEnum, pgTable } from "drizzle-orm/pg-core";

import { type UserRole, userRoles } from "~/common/types/user-role";

export const userRoleEnum = pgEnum("role", [userRoles.USER, userRoles.ADMIN]);
export type { UserRole };

export const user = pgTable("users", (t) => ({
  id: t
    .text()
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  name: t.text().notNull(),
  email: t.text().notNull().unique(),
  emailVerified: t
    .boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: t.text(),
  role: userRoleEnum(),
  createdAt: t
    .timestamp("created_at", { mode: "date", withTimezone: true })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: t
    .timestamp("updated_at", { mode: "date", withTimezone: true })
    .$onUpdateFn(() => new Date())
    .notNull(),
}));

export const session = pgTable("sessions", (t) => ({
  id: t
    .text()
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  expiresAt: t
    .timestamp("expires_at", { mode: "date", withTimezone: true })
    .notNull(),
  token: t.text().unique().notNull(),
  createdAt: t
    .timestamp("created_at", { mode: "date", withTimezone: true })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: t
    .timestamp("updated_at", { mode: "date", withTimezone: true })
    .$onUpdateFn(() => new Date())
    .notNull(),
  ipAddress: t.text("ip_address"),
  userAgent: t.text("user_agent"),
  userId: t
    .text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
}));

export const account = pgTable("accounts", (t) => ({
  id: t
    .text()
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  accountId: t.text("account_id").notNull(),
  providerId: t.text("provider_id").notNull(),
  userId: t
    .text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: t.text("access_token"),
  refreshToken: t.text("refresh_token"),
  idToken: t.text("id_token"),
  accessTokenExpiresAt: t.timestamp("access_token_expires_at", {
    mode: "date",
    withTimezone: true,
  }),
  refreshTokenExpiresAt: t.timestamp("refresh_token_expires_at", {
    mode: "date",
    withTimezone: true,
  }),
  scope: t.text(),
  password: t.text(),
  createdAt: t
    .timestamp("created_at", { mode: "date", withTimezone: true })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: t
    .timestamp("updated_at", { mode: "date", withTimezone: true })
    .$onUpdateFn(() => new Date())
    .notNull(),
}));

export const verification = pgTable("verifications", (t) => ({
  id: t
    .text()
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  identifier: t.text().notNull(),
  value: t.text().notNull(),
  expiresAt: t
    .timestamp("expires_at", { mode: "date", withTimezone: true })
    .notNull(),
  createdAt: t
    .timestamp("created_at", { mode: "date", withTimezone: true })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: t
    .timestamp("updated_at", { mode: "date", withTimezone: true })
    .$onUpdateFn(() => new Date())
    .notNull(),
}));
