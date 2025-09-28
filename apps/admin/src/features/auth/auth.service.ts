import { headers } from "next/headers";

import { auth } from "~/core/auth";

import { type CurrentSession, sessionUserSchema } from "./auth.model";

export async function getCurrentSession(
  requestHeaders?: Headers,
): Promise<CurrentSession | null> {
  const session = await auth.api.getSession({
    headers: requestHeaders ?? (await headers()),
  });
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
