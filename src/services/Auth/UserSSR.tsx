import { createClient } from "@/utils/supabase/server";
import { cookies as cookie } from "next/headers";

export async function getUser(cookies: ReturnType<typeof cookie>) {
  const supabase = createClient(cookies);
  const { data, error } = await supabase.auth.getUser();

  if (error) return null;
  return data.user;
}
