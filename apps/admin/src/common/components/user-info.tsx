import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { getInitials } from "~/common/helpers/string";
import type { SessionUser } from "~/features/auth/auth.model";

interface UserInfoProps {
  user: SessionUser;
}

export function UserInfo({ user }: UserInfoProps) {
  return (
    <>
      <Avatar className="h-8 w-8 overflow-hidden rounded-full">
        {user.image ? <AvatarImage src={user.image} alt={user.name} /> : null}
        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
          {getInitials(user.name)}
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
