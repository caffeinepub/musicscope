import { useQuery } from '@tanstack/react-query';
import type { SongMetadata, UserProfile, ListeningHistoryData } from '../types';

// Mock data for demonstration since backend is not implemented
const MOCK_SONGS: SongMetadata[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist: 'Luna Eclipse',
    album: 'Nocturnal Vibes',
    mood: 'Chill',
    genre: 'Electronic',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    audioFileId: null,
    duration: 234,
    createdAt: Date.now(),
  },
  {
    id: '2',
    title: 'Summer Breeze',
    artist: 'The Wanderers',
    album: 'Endless Roads',
    mood: 'Happy',
    genre: 'Pop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    audioFileId: null,
    duration: 198,
    createdAt: Date.now(),
  },
  {
    id: '3',
    title: 'Electric Storm',
    artist: 'Voltage',
    album: 'High Energy',
    mood: 'Energetic',
    genre: 'Rock',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    audioFileId: null,
    duration: 267,
    createdAt: Date.now(),
  },
  {
    id: '4',
    title: 'Rainy Day Blues',
    artist: 'The Wanderers',
    album: 'Melancholy Moments',
    mood: 'Sad',
    genre: 'Blues',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    audioFileId: null,
    duration: 312,
    createdAt: Date.now(),
  },
  {
    id: '5',
    title: 'Cosmic Journey',
    artist: 'Luna Eclipse',
    album: 'Nocturnal Vibes',
    mood: 'Chill',
    genre: 'Ambient',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    audioFileId: null,
    duration: 289,
    createdAt: Date.now(),
  },
  {
    id: '6',
    title: 'Dance All Night',
    artist: 'DJ Pulse',
    album: 'Club Anthems',
    mood: 'Energetic',
    genre: 'Dance',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    audioFileId: null,
    duration: 245,
    createdAt: Date.now(),
  },
  {
    id: '7',
    title: 'Acoustic Sunset',
    artist: 'The Wanderers',
    album: 'Endless Roads',
    mood: 'Calm',
    genre: 'Folk',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    audioFileId: null,
    duration: 223,
    createdAt: Date.now(),
  },
  {
    id: '8',
    title: 'Neon Lights',
    artist: 'Voltage',
    album: 'High Energy',
    mood: 'Energetic',
    genre: 'Electronic',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    audioFileId: null,
    duration: 256,
    createdAt: Date.now(),
  },
];

export function useMockSongs() {
  return useQuery<SongMetadata[]>({
    queryKey: ['songs'],
    queryFn: async () => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return MOCK_SONGS;
    },
  });
}

export function useMockProfile() {
  return useQuery<UserProfile>({
    queryKey: ['profile'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return {
        userId: 'mock-user-id',
        displayName: 'Music Lover',
        contact: 'user@example.com',
        likedSongs: ['1', '3', '5'],
        downloadedSongs: ['2', '4'],
        createdAt: Date.now(),
      };
    },
  });
}

export function useMockListeningHistory(timePeriod: 'day' | 'week' | 'month' | 'year') {
  return useQuery<ListeningHistoryData>({
    queryKey: ['listening-history', timePeriod],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 400));

      const getTimeData = () => {
        switch (timePeriod) {
          case 'day':
            return Array.from({ length: 24 }, (_, i) => ({
              label: `${i}:00`,
              count: Math.floor(Math.random() * 10),
            }));
          case 'week':
            return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => ({
              label: day,
              count: Math.floor(Math.random() * 30) + 5,
            }));
          case 'month':
            return Array.from({ length: 30 }, (_, i) => ({
              label: `${i + 1}`,
              count: Math.floor(Math.random() * 20) + 2,
            }));
          case 'year':
            return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(
              (month) => ({
                label: month,
                count: Math.floor(Math.random() * 100) + 20,
              })
            );
        }
      };

      return {
        timeData: getTimeData(),
        genreData: [
          { name: 'Electronic', value: 35 },
          { name: 'Pop', value: 25 },
          { name: 'Rock', value: 20 },
          { name: 'Blues', value: 12 },
          { name: 'Folk', value: 8 },
        ],
        moodData: [
          { name: 'Energetic', value: 45 },
          { name: 'Chill', value: 32 },
          { name: 'Happy', value: 28 },
          { name: 'Calm', value: 18 },
          { name: 'Sad', value: 12 },
        ],
        totalPlays: 235,
        uniqueSongs: 48,
        totalMinutes: 892,
      };
    },
  });
}
