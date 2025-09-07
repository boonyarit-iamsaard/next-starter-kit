"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import type { SelectUser } from "~/core/database/schema";

export const columns: ColumnDef<SelectUser>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
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
