"use client";

import { useSession } from "~/core/auth/client";

import { type CurrentSession, sessionUserSchema } from "../auth.model";

export function useCurrentSession(): CurrentSession | null {
  // TODO: introduce loading state
  const { data: session } = useSession();
  if (!session) {
    return null;
  }

  const { data, success } = sessionUserSchema.safeParse(session.user);
  if (!success) {
    return null;
  }

  return {
    session: session.session,
    user: data,
  };
}
