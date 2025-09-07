"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AppIcon } from "~/common/components/app-icon";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/common/components/ui/sidebar";
import type { NavItem } from "~/common/types/nav";

interface NavMainProps {
  items: NavItem[];
}

export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname();

  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={item.href === pathname}
              tooltip={{ children: item.title }}
            >
              <Link href={item.href} prefetch>
                <AppIcon icon={item.icon} />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
