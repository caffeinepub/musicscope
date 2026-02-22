# Specification

## Summary
**Goal:** Build MusicScope, a mood-based music streaming app with listening history visualization and auto-queue recommendations.

**Planned changes:**
- Create backend data models for Song (with mood, genre, audio URL), UserProfile (with liked/downloaded songs), and ListeningHistory
- Implement backend methods for song management (add, retrieve all, filter by artist/album, search)
- Implement backend methods for user profile operations (create/update, get profile, manage liked/downloaded songs)
- Implement backend methods for listening history tracking and retrieval with time period filters
- Implement mood-based recommendation algorithm that predicts next songs based on current song mood
- Create Home page displaying all songs in a scrollable list with playback on click
- Create Artists/Albums page with expandable sections grouped by artist and album
- Create Search page with real-time filtering as user types
- Create Dashboard page with colorful bar and line charts showing listening history (filterable by day/week/month/year)
- Create Profile page displaying user ID, contact, liked/downloaded song counts and lists
- Implement persistent music player component with play/pause, previous/next, progress bar, and volume controls that works across all pages
- Implement auto-queue functionality that fetches mood-based recommendations when song ends and auto-plays next song
- Design vibrant, interactive UI with smooth animations, hover effects, gradient accents, and colorful components

**User-visible outcome:** Users can browse, search, and play songs across multiple pages while the music player persists. The app automatically recommends and queues songs based on mood. Users can like/download songs, view their profile stats, and visualize their listening history with colorful charts filtered by time periods.
