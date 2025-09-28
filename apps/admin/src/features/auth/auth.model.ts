import z from "zod";

import { userRoles } from "~/common/types/user-role";
import type { Session } from "~/core/auth";

export const sessionUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nonempty(),
  email: z.string().email(),
  role: z.nativeEnum(userRoles),
  image: z.string().nullable(),
});

export type SessionUser = z.infer<typeof sessionUserSchema>;

export interface CurrentSession {
  session: Session["session"];
  user: SessionUser;
}
