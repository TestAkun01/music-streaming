import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/DatabaseType";
export const createClient = () =>
  createBrowserClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );
