import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signIn } from "~/core/auth/client";
import { env } from "~/env";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type SignInFormData = z.infer<typeof signInSchema>;

export function useSignInForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleEmailSignIn(data: SignInFormData) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await signIn.email({
        email: data.email,
        password: data.password,
      });

      if (response.error) {
        setError(
          response.error.message ?? "Unable to sign in. Please try again.",
        );
      } else {
        router.push("/");
        return;
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
      const response = await signIn.social({
        provider: "google",
        callbackURL: env.NEXT_PUBLIC_APP_URL,
      });
      if (response.error) {
        setError(
          response.error.message ?? "Google sign-in failed. Please try again.",
        );
      }
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

  return {
    form,
    isLoading,
    error,
    handleEmailSignIn,
    handleGoogleSignIn,
  };
}
