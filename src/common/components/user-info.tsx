import { Avatar, AvatarFallback } from "~/common/components/ui/avatar";
import type { Session } from "~/core/auth";

interface UserInfoProps {
  user: Session["user"];
}

export function UserInfo({ user }: UserInfoProps) {
  return (
    <>
      <Avatar className="h-8 w-8 overflow-hidden rounded-full">
        {/* TODO: add avatar image */}
        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
          {/* TODO: add initials name */}
          NA
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{user.name}</span>
        <span className="text-muted-foreground truncate text-xs">
          {user.email}
        </span>
      </div>
    </>
  );
}
