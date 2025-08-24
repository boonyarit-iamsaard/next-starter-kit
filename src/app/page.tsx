import { headers } from "next/headers";
import Link from "next/link";

import { Button } from "~/common/components/ui/button";
import { auth } from "~/core/auth";
import { env } from "~/env";

async function UserInfo() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">
          Welcome to the {env.NEXT_PUBLIC_APP_NAME}
        </h1>
        <div className="grid w-32 gap-4">
          <Button asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Welcome, {session.user.name}</h2>
        <p className="text-muted-foreground">{session.user.email}</p>
      </div>
      <form
        action={async () => {
          "use server";
          await auth.api.signOut({
            headers: await headers(),
          });
        }}
      >
        <Button type="submit" variant="outline">
          Sign Out
        </Button>
      </form>
    </div>
  );
}

export default function Page() {
  return (
    <main className="flex min-h-svh flex-col justify-center">
      <section>
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 p-4">
          <UserInfo />
        </div>
      </section>
    </main>
  );
}
