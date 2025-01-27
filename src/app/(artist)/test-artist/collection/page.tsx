import CollectionsView from "../_component/CollectionView";
import { createClient } from "@/utils/supabase/server";

export default async function CollectionPage() {
  const supabase = await createClient();
  const { data: collections, error: collectionError } = await supabase
    .from("collections")
    .select("*")
    .limit(10);
  return <CollectionsView collections={collections ?? []} />;
}
