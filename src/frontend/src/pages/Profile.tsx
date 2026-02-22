import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { usePlayer } from '../contexts/PlayerContext';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { User, Mail, Heart, Download, Edit2, Save, X, Music } from 'lucide-react';
import { useMockProfile, useMockSongs } from '../hooks/useQueries';

export default function Profile() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { playSong, currentSong } = usePlayer();
  const { data: profile } = useMockProfile();
  const { data: allSongs } = useMockSongs();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(profile?.displayName || '');
  const [contact, setContact] = useState(profile?.contact || '');

  const likedSongs = allSongs?.filter((song) => profile?.likedSongs.includes(song.id)) || [];
  const downloadedSongs = allSongs?.filter((song) => profile?.downloadedSongs.includes(song.id)) || [];

  const handleSave = () => {
    // In real app, call backend to update profile
    setIsEditing(false);
  };

  const handleRemoveLike = (songId: string) => {
    // In real app, call backend to remove from liked songs
    console.log('Remove like:', songId);
  };

  if (loginStatus === 'idle' && !identity) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <User className="h-24 w-24 text-muted-foreground/50 mb-6" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Sign in to view your profile</h2>
        <p className="text-muted-foreground mb-6">Connect with Internet Identity to access your music library</p>
        <Button onClick={login} size="lg" className="shadow-lg shadow-primary/25">
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-chart-1 to-chart-2 bg-clip-text text-transparent">
          My Profile
        </h1>
        <p className="text-muted-foreground">Manage your account and music preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-border/50 bg-gradient-to-br from-chart-1/10 to-chart-1/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="h-5 w-5 text-chart-1" />
              Liked Songs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-chart-1">{profile?.likedSongs.length || 0}</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-chart-2/10 to-chart-2/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Download className="h-5 w-5 text-chart-2" />
              Downloaded
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-chart-2">{profile?.downloadedSongs.length || 0}</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-chart-3/10 to-chart-3/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Music className="h-5 w-5 text-chart-3" />
              Total Library
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-chart-3">
              {(profile?.likedSongs.length || 0) + (profile?.downloadedSongs.length || 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Account Information</CardTitle>
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="principal">Principal ID</Label>
            <Input
              id="principal"
              value={identity?.getPrincipal().toString() || 'Not connected'}
              disabled
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              disabled={!isEditing}
              placeholder="Enter your display name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact Email</Label>
            <Input
              id="contact"
              type="email"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              disabled={!isEditing}
              placeholder="your.email@example.com"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" fill="currentColor" />
            Liked Songs
          </CardTitle>
        </CardHeader>
        <CardContent>
          {likedSongs.length > 0 ? (
            <div className="space-y-2">
              {likedSongs.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors group"
                >
                  <img
                    src="/assets/generated/album-placeholder.dim_400x400.png"
                    alt={song.album}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{song.title}</p>
                    <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{song.mood}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => playSong(song)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Play
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveLike(song.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No liked songs yet</p>
          )}
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            Downloaded Songs
          </CardTitle>
        </CardHeader>
        <CardContent>
          {downloadedSongs.length > 0 ? (
            <div className="space-y-2">
              {downloadedSongs.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors group"
                >
                  <img
                    src="/assets/generated/album-placeholder.dim_400x400.png"
                    alt={song.album}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{song.title}</p>
                    <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{song.genre}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => playSong(song)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Play
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No downloaded songs yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
