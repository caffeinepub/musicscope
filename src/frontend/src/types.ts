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

export interface UserProfile {
  userId: string;
  displayName: string;
  contact: string;
  likedSongs: string[];
  downloadedSongs: string[];
  createdAt: number;
}

export interface ListeningHistoryData {
  timeData: Array<{ label: string; count: number }>;
  genreData: Array<{ name: string; value: number }>;
  moodData: Array<{ name: string; value: number }>;
  totalPlays: number;
  uniqueSongs: number;
  totalMinutes: number;
}
