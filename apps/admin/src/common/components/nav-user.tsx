"use client";

import { ChevronsUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/common/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/common/components/ui/sidebar";
import { UserInfo } from "~/common/components/user-info";
import { UserMenuContent } from "~/common/components/user-menu-content";
import { useIsMobile } from "~/common/hooks/use-mobile";
import { useCurrentSession } from "~/features/auth/hooks/use-current-session";

export function NavUser() {
  const isMobile = useIsMobile();
  const { state } = useSidebar();
  const currentSession = useCurrentSession();

  return currentSession ? (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="group text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent"
            >
              <UserInfo user={currentSession.user} />
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="end"
            side={
              isMobile ? "bottom" : state === "collapsed" ? "left" : "bottom"
            }
          >
            <UserMenuContent user={currentSession.user} />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  ) : null;
}
