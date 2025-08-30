import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signIn, signUp } from "~/core/auth/client";
import { env } from "~/env";

const createAccountSchema = z.object({
  name: z.string().min(2, "Please enter at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type CreateAccountFormData = z.infer<typeof createAccountSchema>;

export function useCreateAccountForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function handleEmailCreateAccount(data: CreateAccountFormData) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response.error) {
        setError(
          response.error.message ??
            "Unable to create account. Please try again.",
        );
      } else {
        router.push("/");
        return;
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

  async function handleGoogleCreateAccount() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await signIn.social({
        provider: "google",
        callbackURL: env.NEXT_PUBLIC_APP_URL,
      });
      if (response.error) {
        setError(
          response.error.message ??
            "Google account creation failed. Please try again.",
        );
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Google account creation failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return {
    form,
    isLoading,
    error,
    handleEmailCreateAccount,
    handleGoogleCreateAccount,
  };
}
