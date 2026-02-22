import { useState } from 'react';
import { usePlayer } from '../contexts/PlayerContext';
import { ChevronDown, ChevronRight, Play } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useMockSongs } from '../hooks/useQueries';
import type { SongMetadata } from '../types';

export default function Artists() {
  const { playSong, currentSong } = usePlayer();
  const { data: songs } = useMockSongs();
  const [expandedArtists, setExpandedArtists] = useState<Set<string>>(new Set());

  const groupedByArtist = songs?.reduce((acc, song) => {
    if (!acc[song.artist]) {
      acc[song.artist] = {};
    }
    if (!acc[song.artist][song.album]) {
      acc[song.artist][song.album] = [];
    }
    acc[song.artist][song.album].push(song);
    return acc;
  }, {} as Record<string, Record<string, SongMetadata[]>>);

  const toggleArtist = (artist: string) => {
    setExpandedArtists((prev) => {
      const next = new Set(prev);
      if (next.has(artist)) {
        next.delete(artist);
      } else {
        next.add(artist);
      }
      return next;
    });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-chart-1 to-chart-2 bg-clip-text text-transparent">
          Artists & Albums
        </h1>
        <p className="text-muted-foreground">Explore music by artist and album</p>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedByArtist || {}).map(([artist, albums]) => {
          const isExpanded = expandedArtists.has(artist);
          const albumsTyped = albums as Record<string, SongMetadata[]>;
          return (
            <Card key={artist} className="overflow-hidden border-border/50">
              <button
                onClick={() => toggleArtist(artist)}
                className="w-full flex items-center justify-between p-6 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5 text-primary" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div className="text-left">
                    <h2 className="text-2xl font-bold text-foreground">{artist}</h2>
                    <p className="text-sm text-muted-foreground">
                      {Object.keys(albumsTyped).length} album{Object.keys(albumsTyped).length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 space-y-6">
                  {Object.entries(albumsTyped).map(([album, albumSongs]) => (
                    <div key={album} className="space-y-3">
                      <div className="flex items-center gap-4">
                        <img
                          src="/assets/generated/album-placeholder.dim_400x400.png"
                          alt={album}
                          className="w-20 h-20 rounded-lg object-cover shadow-lg"
                        />
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">{album}</h3>
                          <p className="text-sm text-muted-foreground">
                            {albumSongs.length} track{albumSongs.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 ml-24">
                        {albumSongs.map((song, index) => (
                          <div
                            key={song.id}
                            onClick={() => playSong(song)}
                            className={`group flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 cursor-pointer transition-all ${
                              currentSong?.id === song.id ? 'bg-primary/10' : ''
                            }`}
                          >
                            <span className="text-sm text-muted-foreground w-6">{index + 1}</span>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                                {song.title}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {song.mood}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {song.genre}
                                </Badge>
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">{formatDuration(song.duration)}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
