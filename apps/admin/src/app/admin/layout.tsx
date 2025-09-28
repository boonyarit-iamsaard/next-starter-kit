"use client";

import type { ReactNode } from "react";

import { AppContent } from "~/common/components/app-content";
import { AppShell } from "~/common/components/app-shell";
import { AppSidebar } from "~/common/components/app-sidebar";
import { AppSidebarHeader } from "~/common/components/app-sidebar-header";
import { navConfig } from "~/core/configs/nav";

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: ProtectedLayoutProps) {
  return (
    <AppShell variant="sidebar">
      <AppSidebar navItems={navConfig.admin} />
      <AppContent variant="sidebar" className="overflow-x-hidden">
        <AppSidebarHeader />
        {children}
      </AppContent>
    </AppShell>
  );
}
