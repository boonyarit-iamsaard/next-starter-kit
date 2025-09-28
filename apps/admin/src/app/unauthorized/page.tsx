import Link from "next/link";

import { AppContent } from "~/common/components/app-content";
import { AppHeader } from "~/common/components/app-header";
import { AppShell } from "~/common/components/app-shell";
import { Button } from "~/common/components/ui/button";

export default function UnauthorizedPage() {
  return (
    // TODO: consider global error layout
    <AppShell>
      <AppHeader />
      <AppContent>
        <div className="grid min-h-[calc(100svh-4rem)] place-items-center">
          <div className="flex flex-col gap-4 text-center">
            <h1 className="text-2xl font-bold">Access Denied</h1>
            <p className="text-muted-foreground">
              You don&apos;t have permission to access this page.
            </p>
            <Button asChild>
              <Link href="/">Go back to home</Link>
            </Button>
          </div>
        </div>
      </AppContent>
    </AppShell>
  );
}
