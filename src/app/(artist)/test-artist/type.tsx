import { Tables } from "@/types/DatabaseType";

type Track = Tables<"tracks">;
type Collection = Tables<"collections">;
type Profile = Tables<"profiles">;

export { type Track, type Collection, type Profile };
