export const userRoles = {
  USER: "user",
  ADMIN: "admin",
} as const;

export type UserRole = (typeof userRoles)[keyof typeof userRoles];
