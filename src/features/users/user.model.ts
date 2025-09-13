import z from "zod";

import { type UserRole, userRoles } from "~/common/types/user-role";

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
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type UserModel = z.infer<typeof userModelSchema>;
