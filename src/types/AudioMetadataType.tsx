export interface AudioMetadata {
  title: string;
  duration: number;
  audioUrl: string;
  genre: string | null;
  album: string;
  track?: number | null;
  imageUrl?: string;
}
