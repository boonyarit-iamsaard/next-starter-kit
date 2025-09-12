"use client";

import { DataTable } from "~/common/components/data-table";
import { useURLPagination } from "~/common/hooks/use-url-pagination";
import { columns } from "~/features/users/components/user-table/columns";
import { api } from "~/trpc/react";

export function UserTable() {
  const { pagination, setPagination } = useURLPagination({
    defaultPageSize: 10,
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
