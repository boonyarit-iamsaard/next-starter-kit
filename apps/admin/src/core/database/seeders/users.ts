import { eq } from "drizzle-orm";

import { userRoles } from "~/common/types/user-role";
import { auth } from "~/core/auth";

import { user } from "../schema";
import type { SeederFactory } from "./types";

function formatUserNumber(index: number, count: number): string {
  const digits = count.toString().length;
  return (index + 1).toString().padStart(digits, "0");
}

export const createUsersSeeder: SeederFactory = ({ count = 10, db }) => {
  return {
    name: "users",
    seed: async () => {
      const adminEmail = "admin@example.com";
      await auth.api.signUpEmail({
        body: {
          name: "Admin",
          email: adminEmail,
          password: "password",
        },
      });

      await db
        .update(user)
        .set({
          emailVerified: true,
          role: userRoles.ADMIN,
        })
        .where(eq(user.email, adminEmail));

      for (let i = 0; i < count; i++) {
        const formattedNumber = formatUserNumber(i, count);
        const name = `User-${formattedNumber}`;
        const email = `user-${formattedNumber}@example.com`;
        const password = "password";

        await auth.api.signUpEmail({
          body: {
            name,
            email,
            password,
          },
        });

        await db
          .update(user)
          .set({
            emailVerified: true,
            role: userRoles.USER,
          })
          .where(eq(user.email, email));
      }
    },
  };
};
