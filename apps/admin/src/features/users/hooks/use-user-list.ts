"use client";

import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import type {
  PaginationParams,
  PaginationResponse,
} from "~/common/types/pagination";
import { authClient } from "~/core/auth/client";
import type { UserModel } from "~/features/users/user.model";
import { userModelSchema } from "~/features/users/user.model";

interface UseUserListReturn {
  data: UserModel[] | undefined;
  pagination: PaginationResponse<UserModel>["pagination"] | undefined;
  error: string | null;
  isLoading: boolean;
  isError: boolean;
}

export function useUserList({
  page,
  pageSize,
}: PaginationParams): UseUserListReturn {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["admin", "user-list", { page, pageSize }],
    queryFn: async (): Promise<PaginationResponse<UserModel>> => {
      const offset = page * pageSize;

      const { data, error } = await authClient.admin.listUsers({
        query: {
          limit: pageSize,
          offset,
        },
      });
      if (error) {
        throw new Error(error.message ?? "Failed to fetch users");
      }

      const total = data?.total ?? 0;
      const users = z.array(userModelSchema).parse(data?.users ?? []);
      const pages = Math.ceil(total / pageSize);

      return {
        data: users,
        pagination: {
          page,
          pageSize,
          total,
          pages,
        },
      };
    },
    // TODO: reconsider stale time and cache time
    staleTime: 30000,
    gcTime: 300000,
  });

  return {
    data: data?.data,
    pagination: data?.pagination,
    error: error?.message ?? null,
    isLoading,
    isError,
  };
}
