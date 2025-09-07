import type { IconComponent } from "~/common/components/icons";

export type NavGroup = "public" | "protected" | "admin";

export interface NavItem {
  title: string;
  href: string;
  icon?: IconComponent;
  items?: NavItem[];
}
