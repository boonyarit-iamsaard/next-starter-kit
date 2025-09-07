import { createTRPCRouter, publicProcedure } from "~/core/api/trpc";
import { db } from "~/core/database";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return await db.query.user.findMany();
  }),
});
