"use client";

import { LayoutDashboard, Users } from "lucide-react";
import Link from "next/link";

import { NavMain } from "~/common/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/common/components/ui/sidebar";
import type { NavItem } from "~/common/types/navigation";
import { env } from "~/env";

import { NavFooter } from "./nav-footer";
import { NavUser } from "./nav-user";

interface AppSidebarProps {
  mainNavItems?: NavItem[];
  footerNavItems?: NavItem[];
}

const defaultMainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
];

const defaultFooterNavItems: NavItem[] = [];

export function AppSidebar({
  mainNavItems = defaultMainNavItems,
  footerNavItems = defaultFooterNavItems,
}: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              {/* TODO: fix logo icon not align with nav menu icon */}
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                <Link href="/" className="flex items-center gap-2 font-medium">
                  <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                    <LayoutDashboard className="size-4" />
                  </div>
                  {env.NEXT_PUBLIC_APP_NAME}
                </Link>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
