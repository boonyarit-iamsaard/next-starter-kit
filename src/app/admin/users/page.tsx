import { Suspense } from "react";

import { LoadingSpinner } from "~/common/components/loading-spinner";
import { UserTable } from "~/features/users/components/user-table";

export default function AdminUserListPage() {
  return (
    <div className="space-y-4 p-4">
      <div className="text-2xl font-bold">Users</div>
      <Suspense fallback={<LoadingSpinner />}>
        <UserTable />
      </Suspense>
    </div>
  );
}
