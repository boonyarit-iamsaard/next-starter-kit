import { LayoutDashboard, Settings, Users } from "lucide-react";

import type { NavGroup, NavItem } from "~/common/types/nav";

export const navConfig: Record<NavGroup, NavItem[]> = {
  public: [],
  protected: [
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
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
