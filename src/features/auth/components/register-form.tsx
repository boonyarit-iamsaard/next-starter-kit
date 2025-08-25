"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { signIn, signUp } from "~/core/auth/client";
import { env } from "~/env";

const registerSchema = z.object({
  name: z.string().min(2, "Please enter at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: RegisterFormData) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: env.NEXT_PUBLIC_APP_URL,
      });

      if (response.error) {
        setError(
          response.error.message ??
            "Unable to create account. Please try again.",
        );
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create account. Please check your details and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await signIn.social({
        provider: "google",
        callbackURL: env.NEXT_PUBLIC_APP_URL,
      });

      if (response.error) {
        setError(
          response.error.message ?? "Google sign-up failed. Please try again.",
        );
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Google sign-up failed. Please try again.",
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
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Join us today - it only takes a minute
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    placeholder="Create a secure password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or sign up with
            </span>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Sign up with Google"}
          </Button>
        </div>

        {error && (
          <div className="text-destructive bg-destructive/10 border-destructive/20 rounded-md border p-3 text-sm">
            {error}
          </div>
        )}

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="hover:text-primary font-medium underline underline-offset-4"
          >
            Sign in here
          </Link>
        </div>
      </form>
    </Form>
  );
}
