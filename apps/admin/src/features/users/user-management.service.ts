import type {
  PaginationParams,
  PaginationResponse,
} from "~/common/types/pagination";

import type { UserModel } from "./user.model";
import type { UserRepository } from "./user.repository";

export interface UserService {
  getUsersPaginated: (
    params: PaginationParams,
  ) => Promise<PaginationResponse<UserModel>>;
}

export class UserManagementService implements UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getUsersPaginated = async (
    params: PaginationParams,
  ): Promise<PaginationResponse<UserModel>> => {
    const { page, pageSize } = params;
    const result = await this.userRepository.getUsersPaginated(params);

    const pages = Math.ceil(result.total / pageSize);

    return {
      data: result.items,
      pagination: {
        page,
        pageSize,
        total: result.total,
        pages,
      },
    };
  };
}
