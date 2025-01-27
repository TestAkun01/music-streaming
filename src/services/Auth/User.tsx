import { createClient as createClientBrowser } from "@/utils/supabase/client";
import { createClient } from "@/utils/supabase/server";

export async function getUser() {
  try {
    const supabase =
      typeof window === "undefined"
        ? await createClient()
        : createClientBrowser();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
}
