"use client";

import { DataTable } from "~/common/components/data-table";
import { columns } from "~/features/users/components/user-table/columns";
import { api } from "~/trpc/react";

export function UserTable() {
  const { data } = api.user.getAll.useQuery();

  return <DataTable columns={columns} data={data ?? []} />;
}
