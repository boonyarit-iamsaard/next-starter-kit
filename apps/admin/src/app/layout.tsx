import "~/styles/globals.css";

import type { Metadata } from "next";
import { Noto_Sans_Thai as FontSans } from "next/font/google";
import type { ReactNode } from "react";

import { cn } from "~/common/helpers/cn";
import { env } from "~/env";
import { TRPCReactProvider } from "~/trpc/react";

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: env.NEXT_PUBLIC_APP_NAME,
  description: "A Next.js starter kit with TRPC, Drizzle, and Tailwind CSS",
  authors: [
    {
      name: "Boonyarit Iamsa-ard",
      url: "https://boonyarit.me",
    },
  ],
};

const fontSans = FontSans({
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "text-foreground bg-background min-h-svh font-sans antialiased",
          fontSans.variable,
        )}
      >
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
