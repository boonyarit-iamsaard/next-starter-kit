import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/core/api/trpc";

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
    .query(async ({ input, ctx }) => {
      const { page = 0, pageSize = 10 } = input;

      return await ctx.services.userManagementService.getUsersPaginated({
        page,
        pageSize,
      });
    }),
});
