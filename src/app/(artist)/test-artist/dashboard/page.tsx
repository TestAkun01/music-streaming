import Dashboard from "../_component/Dashboard";
import { createClient } from "@/utils/supabase/client";

export default async function page() {
  const supabase = createClient();
  const { data: initialTracks, error: tracksError } = await supabase
    .from("tracks")
    .select("*")
    .limit(10);
  const { data: initialCollections, error: collectionError } = await supabase
    .from("collections")
    .select("*")
    .limit(10);
  return (
    <Dashboard
      tracks={initialTracks ?? []}
      collections={initialCollections ?? []}
    />
  );
}
