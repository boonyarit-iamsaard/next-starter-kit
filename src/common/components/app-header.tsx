import { LayoutDashboard } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

import { Button } from "~/common/components/ui/button";
import type { NavItem } from "~/common/types/navigation";
import { auth } from "~/core/auth";
import { env } from "~/env";

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
];

export async function AppHeader() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

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
          <nav className="flex h-full items-stretch">
            <ul className="flex h-full items-stretch space-x-2">
              {mainNavItems.map((item, index) => (
                <li key={index} className="relative flex h-full items-center">
                  <Link
                    href={item.href}
                    className="text-foreground hover:bg-accent hover:text-accent-foreground flex h-9 cursor-pointer items-center px-3 text-sm font-medium"
                  >
                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="ml-auto flex items-center space-x-2">
          {session ? (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">
                {session.user.name}
              </span>
              <form
                action={async () => {
                  "use server";
                  await auth.api.signOut({
                    headers: await headers(),
                  });
                }}
              >
                <Button type="submit" variant="ghost">
                  Sign Out
                </Button>
              </form>
            </div>
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
