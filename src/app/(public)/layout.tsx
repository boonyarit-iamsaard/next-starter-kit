import type { ReactNode } from "react";

import { AppContent } from "~/common/components/app-content";
import { AppHeader } from "~/common/components/app-header";
import { AppShell } from "~/common/components/app-shell";

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <AppShell>
      <AppHeader />
      <AppContent>{children}</AppContent>
    </AppShell>
  );
}
