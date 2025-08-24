"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

import { Button } from "~/common/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/common/components/ui/form";
import { Input } from "~/common/components/ui/input";
import { signIn } from "~/core/auth/client";
import { env } from "~/env";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: env.NEXT_PUBLIC_APP_URL,
      });

      if (response.error) {
        setError(
          response.error.message ?? "Unable to sign in. Please try again.",
        );
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in. Please check your credentials and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setIsLoading(true);
    setError(null);

    try {
      await signIn.social({
        provider: "google",
        callbackURL: env.NEXT_PUBLIC_APP_URL,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Google sign-in failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Sign in to your account to continue
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or sign in with
            </span>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in with Google"}
          </Button>
        </div>

        {error && (
          <div className="text-destructive bg-destructive/10 border-destructive/20 rounded-md border p-3 text-sm">
            {error}
          </div>
        )}

        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="hover:text-primary font-medium underline underline-offset-4"
          >
            Create one here
          </Link>
        </div>
      </form>
    </Form>
  );
}
