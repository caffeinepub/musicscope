import { useState } from 'react';
import { usePlayer } from '../contexts/PlayerContext';
import { Search as SearchIcon, Music } from 'lucide-react';
import { Input } from '@/components/ui/input';
import SongCard from '../components/SongCard';
import { useMockSongs } from '../hooks/useQueries';
import { useDebounce } from '../hooks/useDebounce';

export default function Search() {
  const { playSong, currentSong } = usePlayer();
  const { data: songs } = useMockSongs();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 300);

  const filteredSongs = songs?.filter((song) => {
    const query = debouncedQuery.toLowerCase();
    return (
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      song.album.toLowerCase().includes(query) ||
      song.genre.toLowerCase().includes(query) ||
      song.mood.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-chart-1 to-chart-2 bg-clip-text text-transparent">
          Search Music
        </h1>
        <p className="text-muted-foreground">Find your favorite songs, artists, and albums</p>
      </div>

      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by title, artist, album, genre, or mood..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 text-lg border-border/50 focus:border-primary transition-colors"
        />
      </div>

      {searchQuery && (
        <p className="text-sm text-muted-foreground">
          Found {filteredSongs?.length || 0} result{filteredSongs?.length !== 1 ? 's' : ''}
        </p>
      )}

      <div className="grid gap-4">
        {filteredSongs && filteredSongs.length > 0 ? (
          filteredSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onPlay={playSong}
              isPlaying={currentSong?.id === song.id}
            />
          ))
        ) : searchQuery ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <img
              src="/assets/generated/music-note-icon.dim_128x128.png"
              alt="No results"
              className="w-24 h-24 opacity-50 mb-4"
            />
            <h3 className="text-xl font-semibold text-foreground mb-2">No songs found</h3>
            <p className="text-muted-foreground">Try searching with different keywords</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Music className="h-24 w-24 text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Start searching</h3>
            <p className="text-muted-foreground">Enter a song title, artist, or genre to begin</p>
          </div>
        )}
      </div>
    </div>
  );
}
