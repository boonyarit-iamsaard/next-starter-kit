import { Button } from "~/common/components/ui/button";
import { env } from "~/env";

export default async function Page() {
  return (
    <main className="flex min-h-svh flex-col justify-center">
      <section>
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 p-4">
          <h1 className="text-2xl font-bold">
            Welcome to the {env.NEXT_PUBLIC_APP_NAME}
          </h1>
          <Button type="button">Get Started</Button>
        </div>
      </section>
    </main>
  );
}
