"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import type { UserModel } from "~/features/users/user.model";
import { userRoleLabels } from "~/features/users/user.model";

export const columns: ColumnDef<UserModel>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Role",
    accessorKey: "role",
    cell: ({ row }) => {
      return userRoleLabels[row.original.role];
    },
  },
  {
    header: "Since",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      // TODO: reconsider what format to use
      return format(row.original.createdAt, "PPP");
    },
  },
];
