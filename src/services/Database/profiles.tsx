import { Tables } from "@/types/DatabaseType";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function getProfileById(
  id: string
): Promise<Tables<"profiles"> | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}
