"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type AuthResponse = {
  error?: string;
  success?: string;
};

export async function signInWithEmail(
  formData: FormData
): Promise<AuthResponse> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}

export async function signUpWithEmail(
  formData: FormData
): Promise<AuthResponse> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: "Registration successful" };
}

export async function resetPassword(formData: FormData): Promise<AuthResponse> {
  const supabase = await createClient();

  const email = formData.get("email") as string;

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    return { error: error.message };
  }

  return { success: "Password reset link sent to your email" };
}

export async function signInWithOAuth(
  provider: "google" | "github"
): Promise<{ error?: string }> {
  console.log("Starting OAuth sign-in for provider:", provider);
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/?next=/dashboard`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  redirect(data.url);
}
