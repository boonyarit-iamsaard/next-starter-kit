import { LayoutDashboard, Settings, Users } from "lucide-react";

import type { NavGroup, NavItem } from "~/common/types/nav";

export const navConfig: Record<NavGroup, NavItem[]> = {
  public: [
    {
      title: "About",
      href: "/about",
      icon: LayoutDashboard,
    },
  ],
  protected: [
    {
      title: "Settings",
      href: "/settings/profile",
      icon: Settings,
      items: [
        {
          title: "Profile",
          href: "/settings/profile",
        },
        {
          title: "Appearance",
          href: "/settings/appearance",
        },
      ],
    },
  ],
  admin: [
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
  ],
};
