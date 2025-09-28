"use client";

import { AlertCircleIcon } from "lucide-react";

import { DataTable } from "~/common/components/data-table";
import { LoadingSpinner } from "~/common/components/loading-spinner";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "~/common/components/ui/alert";
import { useURLPagination } from "~/common/hooks/use-url-pagination";
import { columns } from "~/features/users/components/user-table/columns";
import { useUserList } from "~/features/users/hooks/use-user-list";

export function UserTable() {
  const { pagination, setPagination } = useURLPagination({
    defaultPageSize: 10,
  });

  const {
    data,
    pagination: paginationData,
    error,
    isLoading,
    isError,
  } = useUserList({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  if (isLoading) {
    return <LoadingSpinner>Retrieving users...</LoadingSpinner>;
  }

  if (isError || error) {
    return (
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Unable to retrieve users.</AlertTitle>
        <AlertDescription>Please try again later.</AlertDescription>
      </Alert>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={data ?? []}
      pageCount={paginationData?.pages}
      pagination={pagination}
      onPaginationChange={setPagination}
    />
  );
}
