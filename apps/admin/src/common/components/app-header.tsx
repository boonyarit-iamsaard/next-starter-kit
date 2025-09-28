"use client";

import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AppIcon } from "~/common/components/app-icon";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/common/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/common/components/ui/navigation-menu";
import { UserMenuContent } from "~/common/components/user-menu-content";
import { cn } from "~/common/helpers/cn";
import { getInitials } from "~/common/helpers/string";
import type { NavItem } from "~/common/types/nav";
import { navConfig } from "~/core/configs/nav";
import { env } from "~/env";
import { useCurrentSession } from "~/features/auth/hooks/use-current-session";

interface NavItemContentProps {
  currentPath: string;
  item: NavItem;
}

export function NavItemContent({ currentPath, item }: NavItemContentProps) {
  const isActive = item.href === currentPath;
  const activeItemStyles = isActive
    ? "text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100"
    : "";

  return (
    <>
      <Link
        href={item.href}
        className={cn(
          navigationMenuTriggerStyle(),
          activeItemStyles,
          "h-9 cursor-pointer px-3",
        )}
      >
        <AppIcon icon={item.icon} className="mr-2 h-4 w-4" />
        {item.title}
      </Link>
      {item.href === currentPath ? (
        <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white"></div>
      ) : null}
    </>
  );
}

export function AppHeader() {
  const currentPath = usePathname();
  const currentSession = useCurrentSession();

  return (
    <div className="border-sidebar-border/80 border-b">
      <div className="container mx-auto flex h-[calc(4rem-1px)] items-center px-4">
        <Link href="/" className="flex items-center gap-2 font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <LayoutDashboard className="size-4" />
          </div>
          {env.NEXT_PUBLIC_APP_NAME}
        </Link>

        <div className="ml-6 hidden h-full items-center space-x-6 lg:flex">
          <NavigationMenu className="flex h-full items-stretch">
            <NavigationMenuList className="flex h-full items-stretch space-x-2">
              {navConfig.public.map((item, index) => {
                const key = `${item.title}-${index}`;

                return (
                  <NavigationMenuItem
                    key={key}
                    className="relative flex h-full items-center"
                  >
                    <NavItemContent currentPath={currentPath} item={item} />
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="ml-auto flex items-center space-x-2">
          {/* TODO: add loading skeleton */}
          {currentSession ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open user menu"
                  variant="ghost"
                  className="size-10 rounded-full p-1"
                >
                  <Avatar className="size-8 overflow-hidden rounded-full">
                    {currentSession.user.image ? (
                      <AvatarImage
                        src={currentSession.user.image}
                        alt={currentSession.user.name}
                      />
                    ) : null}
                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                      {getInitials(currentSession.user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <UserMenuContent user={currentSession.user} />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost">
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/create-account">Create Account</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
