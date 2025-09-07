import type { HTMLAttributes } from "react";

import type { IconComponent } from "~/common/components/icons";
import { Icons } from "~/common/components/icons";

interface AppIconProps extends HTMLAttributes<SVGElement> {
  icon?: IconComponent;
}

export function AppIcon({ icon, ...props }: AppIconProps) {
  const IconComponent = typeof icon === "string" ? Icons[icon] : icon;

  return IconComponent ? <IconComponent {...props} /> : null;
}
