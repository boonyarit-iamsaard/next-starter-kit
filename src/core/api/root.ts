import {
  createCallerFactory,
  createTRPCRouter,
  publicProcedure,
} from "~/core/api/trpc";
import { userRouter } from "~/features/users/user.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  root: publicProcedure.query(() => ({ status: "ok" })),
  // TODO: consider nesting under "admin"
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
