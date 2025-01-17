import { createClient } from "@/utils/supabase/client";

const supabase = createClient();
export async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;

  return data.user;
}
