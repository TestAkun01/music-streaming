export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      analytics: {
        Row: {
          id: number
          location: string | null
          played_at: string | null
          track_id: number
          user_id: string | null
        }
        Insert: {
          id?: number
          location?: string | null
          played_at?: string | null
          track_id: number
          user_id?: string | null
        }
        Update: {
          id?: number
          location?: string | null
          played_at?: string | null
          track_id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_track_id_analytics"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "tracks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_user_id_analytics"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      collection_tracks: {
        Row: {
          added_at: string | null
          collection_id: number
          id: number
          track_id: number
        }
        Insert: {
          added_at?: string | null
          collection_id: number
          id?: number
          track_id: number
        }
        Update: {
          added_at?: string | null
          collection_id?: number
          id?: number
          track_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_collection_id"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_track_id"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      collections: {
        Row: {
          cover_url: string | null
          created_at: string | null
          description: string | null
          id: number
          is_public: boolean | null
          name: string
          type: Database["public"]["Enums"]["collection_type_enum"]
          user_id: string
        }
        Insert: {
          cover_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          is_public?: boolean | null
          name: string
          type: Database["public"]["Enums"]["collection_type_enum"]
          user_id: string
        }
        Update: {
          cover_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          is_public?: boolean | null
          name?: string
          type?: Database["public"]["Enums"]["collection_type_enum"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_user_id_collection"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string
          id: number
          timestamp: string | null
          track_id: number
          user_id: string
        }
        Insert: {
          content: string
          id?: number
          timestamp?: string | null
          track_id: number
          user_id: string
        }
        Update: {
          content?: string
          id?: number
          timestamp?: string | null
          track_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_track_id_comment"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "tracks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_user_id_comment"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      followers: {
        Row: {
          followed_at: string | null
          following_id: string
          id: number
          user_id: string
        }
        Insert: {
          followed_at?: string | null
          following_id: string
          id?: number
          user_id: string
        }
        Update: {
          followed_at?: string | null
          following_id?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_following_id"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_user_id_follow"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          id: number
          liked_at: string | null
          track_id: number
          user_id: string
        }
        Insert: {
          id?: number
          liked_at?: string | null
          track_id: number
          user_id: string
        }
        Update: {
          id?: number
          liked_at?: string | null
          track_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_track_id_like"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "tracks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_user_id_like"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          display_name: string | null
          email: string | null
          id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          end_date: string
          id: number
          plan: string
          start_date: string
          user_id: string
        }
        Insert: {
          end_date: string
          id?: number
          plan: string
          start_date: string
          user_id: string
        }
        Update: {
          end_date?: string
          id?: number
          plan?: string
          start_date?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_user_id_subscription"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tracks: {
        Row: {
          artist_id: string
          cover_url: string | null
          duration: number
          file_url: string
          genre: string | null
          id: number
          tags: string[] | null
          title: string
          uploaded_at: string | null
          visibility: Database["public"]["Enums"]["visibility_enum"]
        }
        Insert: {
          artist_id: string
          cover_url?: string | null
          duration: number
          file_url: string
          genre?: string | null
          id?: number
          tags?: string[] | null
          title: string
          uploaded_at?: string | null
          visibility?: Database["public"]["Enums"]["visibility_enum"]
        }
        Update: {
          artist_id?: string
          cover_url?: string | null
          duration?: number
          file_url?: string
          genre?: string | null
          id?: number
          tags?: string[] | null
          title?: string
          uploaded_at?: string | null
          visibility?: Database["public"]["Enums"]["visibility_enum"]
        }
        Relationships: [
          {
            foreignKeyName: "fk_artist_id"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      collection_type_enum: "Playlist" | "Single" | "Ep" | "Album"
      visibility_enum: "PUBLIC" | "PRIVATE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
