import { count } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/core/api/trpc";
import { db } from "~/core/database";
import { user } from "~/core/database/schema";

import { userModelSchema } from "./user.model";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z
        .object({
          page: z.number().min(0).default(0),
          pageSize: z.number().min(1).max(100).default(10),
        })
        .optional()
        .default({}),
    )
    .query(async ({ input }) => {
      const { page = 0, pageSize = 10 } = input;
      const offset = page * pageSize;

      // TODO: introduce service and repository pattern
      const [users, totalResult] = await Promise.all([
        db.query.user.findMany({
          limit: pageSize,
          offset,
        }),
        db.select({ value: count() }).from(user),
      ]);

      const total = totalResult[0]?.value ?? 0;
      const pages = Math.ceil(total / pageSize);

      // TODO: introduce error response

      return {
        // TODO: introduce data transform pattern
        data: z.array(userModelSchema).parse(users),
        pagination: {
          page,
          pageSize,
          total,
          pages,
        },
      };
    }),
});
