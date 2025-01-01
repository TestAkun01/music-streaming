export interface Track {
  id: number;
  title: string;
  artist_id: string;
  genre: string;
  tags: string[];
  file_url: string;
  cover_url: string | null;
  duration: number;
  uploaded_at: string;
  visibility: "PUBLIC" | "PRIVATE";
}

export interface Collection {
  id: number;
  user_id: string;
  name: string;
  description: string | null;
  type: "Playlist" | "Single" | "Ep" | "Album";
  is_public: boolean | null;
  created_at: string;
  cover_url: string | null;
  collection_tracks?: CollectionTrack[];
}

export interface CollectionTrack {
  id: number;
  collection_id: number;
  added_at: string | null;
  tracks: Track[];
}

export interface Profile {
  id: string;
  email: string | null;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string | null;
}
