"use client";

import type { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

import { DataTable } from "~/common/components/data-table";
import { columns } from "~/features/users/components/user-table/columns";
import { api } from "~/trpc/react";

export function UserTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [data] = api.user.getAll.useSuspenseQuery({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  return (
    <DataTable
      columns={columns}
      data={data?.data ?? []}
      pageCount={data?.pagination.pages}
      pagination={pagination}
      onPaginationChange={setPagination}
    />
  );
}
