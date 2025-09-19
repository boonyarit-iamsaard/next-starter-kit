import { count } from "drizzle-orm";

import type {
  PaginatedResult,
  PaginationParams,
} from "~/common/types/pagination";
import type { DrizzleInstance } from "~/core/database";
import { user } from "~/core/database/schema";

import type { UserModel } from "./user.model";

export interface UserRepository {
  getUsersPaginated: (
    params: PaginationParams,
  ) => Promise<PaginatedResult<UserModel>>;
}

export class DrizzleUserRepository implements UserRepository {
  constructor(private readonly db: DrizzleInstance) {}

  getUsersPaginated = async (
    params: PaginationParams,
  ): Promise<PaginatedResult<UserModel>> => {
    const { page, pageSize } = params;
    const offset = page * pageSize;

    const [users, totalResult] = await Promise.all([
      this.db.query.user.findMany({
        limit: pageSize,
        offset,
      }),
      this.db.select({ value: count() }).from(user),
    ]);

    const total = totalResult[0]?.value ?? 0;

    return {
      items: users as UserModel[],
      total,
    };
  };
}
