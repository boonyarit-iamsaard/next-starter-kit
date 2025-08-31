"use client";

import Link from "next/link";

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
import { useCreateAccountForm } from "~/features/auth/hooks/use-create-account-form";

export function CreateAccountForm() {
  const {
    form,
    loadingAction,
    error,
    handleEmailCreateAccount,
    handleGoogleCreateAccount,
  } = useCreateAccountForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleEmailCreateAccount)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create account</h1>
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

          <Button
            type="submit"
            className="w-full"
            disabled={loadingAction !== null}
          >
            {loadingAction === "credential"
              ? "Creating account..."
              : "Create Account"}
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or create account with
            </span>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleCreateAccount}
            disabled={loadingAction !== null}
          >
            {loadingAction === "google"
              ? "Creating account..."
              : "Create Account with Google"}
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
            href="/sign-in"
            className="hover:text-primary font-medium underline underline-offset-4"
          >
            Sign In
          </Link>
        </div>
      </form>
    </Form>
  );
}
