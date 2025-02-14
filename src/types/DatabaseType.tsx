export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      analytics: {
        Row: {
          id: number;
          location: string | null;
          played_at: string | null;
          track_id: number;
          user_id: string | null;
        };
        Insert: {
          id?: number;
          location?: string | null;
          played_at?: string | null;
          track_id: number;
          user_id?: string | null;
        };
        Update: {
          id?: number;
          location?: string | null;
          played_at?: string | null;
          track_id?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_track_id_analytics";
            columns: ["track_id"];
            isOneToOne: false;
            referencedRelation: "distinct_tracks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_track_id_analytics";
            columns: ["track_id"];
            isOneToOne: false;
            referencedRelation: "tracks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_track_id_analytics";
            columns: ["track_id"];
            isOneToOne: false;
            referencedRelation: "tracks_view";
            referencedColumns: ["track_id"];
          },
          {
            foreignKeyName: "fk_user_id_analytics";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_user_id_analytics";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "tracks_view";
            referencedColumns: ["collection_artist_id"];
          },
          {
            foreignKeyName: "fk_user_id_analytics";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "tracks_view";
            referencedColumns: ["track_artist_id"];
          }
        ];
      };
      collection_artists: {
        Row: {
          artist_id: string;
          collection_id: number;
          created_at: string | null;
          id: number;
        };
        Insert: {
          artist_id: string;
          collection_id: number;
          created_at?: string | null;
          id?: number;
        };
        Update: {
          artist_id?: string;
          collection_id?: number;
          created_at?: string | null;
          id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "fk_artist";
            columns: ["artist_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_artist";
            columns: ["artist_id"];
            isOneToOne: false;
            referencedRelation: "tracks_view";
            referencedColumns: ["collection_artist_id"];
          },
          {
            foreignKeyName: "fk_artist";
            columns: ["artist_id"];
            isOneToOne: false;
            referencedRelation: "tracks_view";
            referencedColumns: ["track_artist_id"];
          },
          {
            foreignKeyName: "fk_collection";
            columns: ["collection_id"];
            isOneToOne: false;
            referencedRelation: "collections";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_collection";
            columns: ["collection_id"];
            isOneToOne: false;
            referencedRelation: "tracks_view";
            referencedColumns: ["collection_id"];
          }
        ];
      };
      collection_tracks: {
        Row: {
          added_at: string | null;
          collection_id: number;
          id: number;
          track_id: number;
          track_order: number | null;
        };
        Insert: {
          added_at?: string | null;
          collection_id: number;
          id?: number;
          track_id: number;
          track_order?: number | null;
        };
        Update: {
          added_at?: string | null;
          collection_id?: number;
          id?: number;
          track_id?: number;
          track_order?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_collection_id";
            columns: ["collection_id"];
            isOneToOne: false;
            referencedRelation: "collections";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_collection_id";
            columns: ["collection_id"];
            isOneToOne: false;
            referencedRelation: "tracks_view";
            referencedColumns: ["collection_id"];
          },
          {
            foreignKeyName: "fk_track_id";
            columns: ["track_id"];
            isOneToOne: false;
            referencedRelation: "distinct_tracks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_track_id";
            columns: ["track_id"];
            isOneToOne: false;
            referencedRelation: "tracks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_track_id";
            columns: ["track_id"];
            isOneToOne: false;
            referencedRelation: "tracks_view";
            referencedColumns: ["track_id"];
          }
        ];
      };
      collections: {
        Row: {
          cover_url: string | null;
          created_at: string | null;
          description: string | null;
          id: number;
          is_public: boolean | null;
          name: string;
          type: Database["public"]["Enums"]["collection_type_enum"];
        };
        Insert: {
          cover_url?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: number;
          is_public?: boolean | null;
          name: string;
          type: Database["public"]["Enums"]["collection_type_enum"];
        };
        Update: {
          cover_url?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: number;
          is_public?: boolean | null;
          name?: string;
          type?: Database["public"]["Enums"]["collection_type_enum"];
        };
        Relationships: [];
      };
      comments: {
        Row: {
          content: string;
          id: number;
          timestamp: string | null;
          track_id: number;
          user_id: string;
        };
        Insert: {
          content: string;
          id?: number;
          timestamp?: string | null;
          track_id: number;
          user_id: string;
        };
        Update: {
          content?: string;
          id?: number;
          timestamp?: string | null;
          track_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_track_id_comment";
            columns: ["track_id"];
            isOneToOne: false;
            referencedRelation: "distinct_tracks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_track_id_comment";
            columns: ["track_id"];
            isOneToOne: false;
            referencedRelation: "tracks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_track_id_comment";
            columns: ["track_id"];
            isOneToOne: false;
            referencedRelation: "tracks_view";
            referencedColumns: ["track_id"];
          },
          {
            foreignKeyName: "fk_user_id_comment";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_user_id_comment";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "tracks_view";
            referencedColumns: ["collection_artist_id"];
          },
          {
            foreignKeyName: "fk_user_id_comment";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "tracks_view";
            referencedColumns: ["track_artist_id"];
          }
        ];
      };
      followers: {
        Row: {
          followed_at: string | null;
          following_id: string;
          id: number;
          user_id: string;
        };
        Insert: {
          followed_at?: string | null;
          following_id: string;
          id?: number;
          user_id: string;
        };
        Update: {
          followed_at?: string | null;
          following_id?: string;
          id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_following_id";
            columns: ["following_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_following_id";
            columns: ["following_id"];
            isOneToOne: false;
            referencedRelation: "tracks_view";
            referencedColumns: ["collection_artist_id"];
          },
          {
            foreignKeyName: "fk_following_id";
            columns: ["following_id"];
            isOneToOne: false;
            referencedRelation: "tracks_view";
            referencedColumns: ["track_artist_id"];
          },
          {
            foreignKeyName: "fk_user_id_follow";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_user_id_follow";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "tracks_view";
            referencedColumns: ["collection_artist_id"];
          },
          {
            foreignKeyName: "fk_user_id_follow";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "tracks_view";
            referencedColumns: ["track_artist_id"];
          }
        ];
      };
      likes: {
        Row: {
          id: number;
          liked_at: string | null;
          track_id: number;
          user_id: string;
        };
        Insert: {
          id?: number;
          liked_at?: string | null;
          track_id: number;
          user_id: string;
        };
        Update: {
          id?: number;
          liked_at?: string | null;
          track_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_track_id_like";
            columns: ["track_id"];
            isOneToOne: false;
            referencedRelation: "distinct_tracks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_track_id_like";
            columns: ["track_id"];
            isOneToOne: false;
            referencedRelation: "tracks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_track_id_like";
            columns: ["track_id"];
            isOneToOne: false;
            referencedRelation: "tracks_view";
            referencedColumns: ["track_id"];
          },
          {
            foreignKeyName: "fk_user_id_like";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_user_id_like";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "tracks_view";
            referencedColumns: ["collection_artist_id"];
          },
          {
            foreignKeyName: "fk_user_id_like";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "tracks_view";
            referencedColumns: ["track_artist_id"];
          }
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          created_at: string | null;
          display_name: string | null;
          email: string | null;
          genre: string | null;
          id: string;
          is_verified: boolean | null;
          role: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string | null;
          display_name?: string | null;
          email?: string | null;
          genre?: string | null;
          id: string;
          is_verified?: boolean | null;
          role?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string | null;
          display_name?: string | null;
          email?: string | null;
          genre?: string | null;
          id?: string;
          is_verified?: boolean | null;
          role?: string | null;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          end_date: string;
          id: number;
          plan: string;
          start_date: string;
          user_id: string;
        };
        Insert: {
          end_date: string;
          id?: number;
          plan: string;
          start_date: string;
          user_id: string;
        };
        Update: {
          end_date?: string;
          id?: number;
          plan?: string;
          start_date?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_user_id_subscription";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_user_id_subscription";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "tracks_view";
            referencedColumns: ["collection_artist_id"];
          },
          {
            foreignKeyName: "fk_user_id_subscription";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "tracks_view";
            referencedColumns: ["track_artist_id"];
          }
        ];
      };
      tracks: {
        Row: {
          artist_id: string;
          cover_url: string | null;
          duration: number;
          file_url: string;
          genre: string | null;
          id: number;
          tags: string[] | null;
          title: string;
          uploaded_at: string | null;
          visibility: Database["public"]["Enums"]["visibility_enum"];
        };
        Insert: {
          artist_id: string;
          cover_url?: string | null;
          duration: number;
          file_url: string;
          genre?: string | null;
          id?: number;
          tags?: string[] | null;
          title: string;
          uploaded_at?: string | null;
          visibility?: Database["public"]["Enums"]["visibility_enum"];
        };
        Update: {
          artist_id?: string;
          cover_url?: string | null;
          duration?: number;
          file_url?: string;
          genre?: string | null;
          id?: number;
          tags?: string[] | null;
          title?: string;
          uploaded_at?: string | null;
          visibility?: Database["public"]["Enums"]["visibility_enum"];
        };
        Relationships: [
          {
            foreignKeyName: "fk_artist_id";
            columns: ["artist_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_artist_id";
            columns: ["artist_id"];
            isOneToOne: false;
            referencedRelation: "tracks_view";
            referencedColumns: ["collection_artist_id"];
          },
          {
            foreignKeyName: "fk_artist_id";
            columns: ["artist_id"];
            isOneToOne: false;
            referencedRelation: "tracks_view";
            referencedColumns: ["track_artist_id"];
          }
        ];
      };
    };
    Views: {
      distinct_tracks: {
        Row: {
          artist_id: string | null;
          cover_url: string | null;
          duration: number | null;
          file_url: string | null;
          genre: string | null;
          id: number | null;
          tags: string[] | null;
          title: string | null;
          uploaded_at: string | null;
          visibility: Database["public"]["Enums"]["visibility_enum"] | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_artist_id";
            columns: ["artist_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_artist_id";
            columns: ["artist_id"];
            isOneToOne: false;
            referencedRelation: "tracks_view";
            referencedColumns: ["collection_artist_id"];
          },
          {
            foreignKeyName: "fk_artist_id";
            columns: ["artist_id"];
            isOneToOne: false;
            referencedRelation: "tracks_view";
            referencedColumns: ["track_artist_id"];
          }
        ];
      };
      tracks_view: {
        Row: {
          collection_artist_avatar_url: string | null;
          collection_artist_id: string | null;
          collection_artist_name: string | null;
          collection_cover_url: string | null;
          collection_description: string | null;
          collection_id: number | null;
          collection_name: string | null;
          track_artist_avatar_url: string | null;
          track_artist_id: string | null;
          track_artist_name: string | null;
          track_cover_url: string | null;
          track_duration: number | null;
          track_file_url: string | null;
          track_genre: string | null;
          track_id: number | null;
          track_order: number | null;
          track_title: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      collection_type_enum: "Playlist" | "Single" | "Ep" | "Album";
      role: "User" | "Artist";
      visibility_enum: "Public" | "Private";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
