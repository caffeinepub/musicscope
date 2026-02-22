import { usePlayer } from '../contexts/PlayerContext';
import SongCard from '../components/SongCard';
import { Music2 } from 'lucide-react';
import { useMockSongs } from '../hooks/useQueries';

export default function Home() {
  const { playSong, currentSong } = usePlayer();
  const { data: songs, isLoading } = useMockSongs();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Music2 className="h-12 w-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading songs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-chart-1 to-chart-2 bg-clip-text text-transparent">
          Discover Music
        </h1>
        <p className="text-muted-foreground">Browse and play your favorite songs</p>
      </div>

      <div className="grid gap-4">
        {songs?.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            onPlay={playSong}
            isPlaying={currentSong?.id === song.id}
          />
        ))}
      </div>
    </div>
  );
}
