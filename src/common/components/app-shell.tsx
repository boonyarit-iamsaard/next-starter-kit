import type { ReactNode } from "react";

import { SidebarProvider } from "~/common/components/ui/sidebar";

interface AppShellProps {
  children: ReactNode;
  variant?: "header" | "sidebar";
}

export function AppShell({ children, variant = "header" }: AppShellProps) {
  if (variant === "header") {
    return <div className="flex min-h-svh flex-col">{children}</div>;
  }

  return <SidebarProvider defaultOpen={true}>{children}</SidebarProvider>;
}
