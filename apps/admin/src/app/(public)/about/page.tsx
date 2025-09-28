import { env } from "~/env";

export default function AboutPage() {
  return (
    <div className="grid min-h-[calc(100svh-4rem)] place-items-center">
      <h1 className="text-2xl font-bold">
        This is the about page of {env.NEXT_PUBLIC_APP_NAME}
      </h1>
    </div>
  );
}
