import type { Principal } from "@icp-sdk/core/principal";

export interface SongMetadata {
  id: string;
  title: string;
  artist: string;
  album: string;
  mood: string;
  genre: string;
  audioUrl: string;
  audioFileId: string | null;
  duration: number;
  createdAt: number;
}

export interface backendInterface {
}
