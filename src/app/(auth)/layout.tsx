import { type PropsWithChildren } from "react";

import { AuthLayout } from "~/common/components/layouts/auth-layout";

export default function AuthGroupLayout({ children }: PropsWithChildren) {
  return <AuthLayout>{children}</AuthLayout>;
}
