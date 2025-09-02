"use client";

import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback } from "~/common/components/ui/avatar";
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
import type { NavItem } from "~/common/types/navigation";
import { authClient } from "~/core/auth/client";
import { env } from "~/env";

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
];

const activeItemStyles =
  "text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100";

export function AppHeader() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

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
              {mainNavItems.map((item, index) => (
                <NavigationMenuItem
                  key={index}
                  className="relative flex h-full items-center"
                >
                  <Link
                    href={item.href}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === item.href && activeItemStyles,
                      "h-9 cursor-pointer px-3",
                    )}
                  >
                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                    {item.title}
                  </Link>
                  {pathname === item.href && (
                    <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white"></div>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="ml-auto flex items-center space-x-2">
          {/* TODO: add loading skeleton */}
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-10 rounded-full p-1">
                  <Avatar className="size-8 overflow-hidden rounded-full">
                    {/* TODO: add avatar image */}
                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                      {/* TODO: add initials name */}
                      NA
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <UserMenuContent user={session.user} />
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
