"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AppIcon } from "~/common/components/app-icon";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "~/common/components/ui/sidebar";
import type { NavItem } from "~/common/types/nav";

interface NavMainItemButtonProps {
  currentPath: string;
  item: NavItem;
}

function NavMainItemButton({ currentPath, item }: NavMainItemButtonProps) {
  const isActive = item.href === currentPath && !item.items?.length;

  return (
    <SidebarMenuButton
      asChild
      isActive={isActive}
      tooltip={{ children: item.title }}
    >
      <Link href={item.href}>
        <AppIcon icon={item.icon} />
        <span>{item.title}</span>
      </Link>
    </SidebarMenuButton>
  );
}

interface NavSubItemButtonProps {
  currentPath: string;
  item: NavItem;
}

function NavSubItemButton({ currentPath, item }: NavSubItemButtonProps) {
  const isActive = item.href === currentPath;

  return (
    <SidebarMenuSubButton asChild isActive={isActive}>
      <Link href={item.href}>
        <AppIcon icon={item.icon} />
        <span>{item.title}</span>
      </Link>
    </SidebarMenuSubButton>
  );
}

interface NavMainProps {
  items: NavItem[];
}

export function NavMain({ items }: NavMainProps) {
  const currentPath = usePathname();

  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarMenu>
        {items.map((item, index) => {
          const groupKey = `${item.title}-${index}`;
          return (
            <SidebarMenuItem key={groupKey}>
              <NavMainItemButton item={item} currentPath={currentPath} />

              {item.items?.length ? (
                <SidebarMenuSub>
                  {item.items.map((subItem, subIndex) => {
                    const subKey = `${groupKey}-${subItem.title}-${subIndex}`;

                    return (
                      <SidebarMenuSubItem key={subKey}>
                        <NavSubItemButton
                          item={subItem}
                          currentPath={currentPath}
                        />
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              ) : null}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
