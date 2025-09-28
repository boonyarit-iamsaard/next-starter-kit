import { Loader2 } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "~/common/helpers/cn";

type LoadingSpinnerProps = ComponentProps<"div">;

export function LoadingSpinner({
  className,
  children = "Loading...",
  ...props
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "flex h-24 items-center justify-center text-center",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 text-sm">
        <Loader2 className="h-4 w-4 animate-spin" />
        {children}
      </div>
    </div>
  );
}
