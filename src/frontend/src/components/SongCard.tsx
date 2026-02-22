import { Play, Music } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { SongMetadata } from '../types';

interface SongCardProps {
  song: SongMetadata;
  onPlay: (song: SongMetadata) => void;
  isPlaying?: boolean;
}

export default function SongCard({ song, onPlay, isPlaying }: SongCardProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 cursor-pointer border-border/50"
      onClick={() => onPlay(song)}
    >
      <div className="flex items-center gap-4 p-4">
        <div className="relative w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-chart-1/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
          <img
            src="/assets/generated/album-placeholder.dim_400x400.png"
            alt={song.album}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Play className="h-6 w-6 text-white" fill="white" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
            {song.title}
          </h3>
          <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="text-xs">
              {song.mood}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {song.genre}
            </Badge>
          </div>
        </div>

        <div className="text-sm text-muted-foreground flex-shrink-0">
          {formatDuration(song.duration)}
        </div>
      </div>

      {isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-chart-1 to-chart-2 animate-pulse" />
      )}
    </Card>
  );
}
