"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { VariantProps } from "class-variance-authority";
import { format } from "date-fns";

import type { badgeVariants } from "~/common/components/ui/badge";
import { Badge } from "~/common/components/ui/badge";
import type { UserRole } from "~/common/types/user-role";
import type { UserModel } from "~/features/users/user.model";
import { userRoleLabels } from "~/features/users/user.model";

const userRoleBadgeVariants: Record<
  UserRole,
  VariantProps<typeof badgeVariants>["variant"]
> = {
  admin: "default",
  user: "secondary",
};

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
      const badgeVariant = userRoleBadgeVariants[row.original.role];
      const badgeLabel = userRoleLabels[row.original.role];

      return <Badge variant={badgeVariant}>{badgeLabel}</Badge>;
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
