import z from "zod";

import type { UserRole } from "~/common/types/user-role";
import { userRoles } from "~/common/types/user-role";

export const userRoleLabels: Record<UserRole, string> = {
  user: "User",
  admin: "Administrator",
};

export const userModelSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nonempty(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  role: z.nativeEnum(userRoles),
  banned: z.boolean(),
  banReason: z.string().nullable(),
  banExpires: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type UserModel = z.infer<typeof userModelSchema>;
