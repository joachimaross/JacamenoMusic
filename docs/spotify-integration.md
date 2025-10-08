# Spotify API Integration Guide

## Overview

This guide explains how to integrate Spotify API with JACAMENO for music streaming, playlist management, and analytics features.

## Prerequisites

1. **Spotify Developer Account**: Sign up at https://developer.spotify.com/
2. **Create Spotify App**: Register your application to get credentials
3. **Set Redirect URIs**: Add your callback URLs

## Setup

### 1. Register Spotify Application

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click "Create an App"
3. Fill in application details:
   - **App Name**: JACAMENO
   - **App Description**: AI-powered music production and streaming platform
   - **Redirect URIs**: 
     - `http://localhost:3000/api/auth/callback/spotify` (development)
     - `https://jacameno.com/api/auth/callback/spotify` (production)

4. Save your credentials:
   - **Client ID**: Your app's client ID
   - **Client Secret**: Your app's client secret

### 2. Environment Variables

Add to your `.env.local` file:

```env
# Spotify API Configuration
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/callback/spotify

# Scopes required for JACAMENO features
SPOTIFY_SCOPES=user-read-private,user-read-email,user-library-read,user-top-read,playlist-read-private,playlist-modify-public,playlist-modify-private
```

## OAuth 2.0 Authentication Flow

### Step 1: Authorization Request

Redirect users to Spotify's authorization page:

```typescript
// app/api/auth/spotify/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const scopes = [
    'user-read-private',
    'user-read-email',
    'user-library-read',
    'user-top-read',
    'playlist-read-private',
    'playlist-modify-public',
    'playlist-modify-private',
  ].join(' ')

  const params = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    response_type: 'code',
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
    scope: scopes,
    show_dialog: 'true',
  })

  return NextResponse.redirect(
    `https://accounts.spotify.com/authorize?${params.toString()}`
  )
}
```

### Step 2: Handle Callback

Exchange authorization code for access token:

```typescript
// app/api/auth/callback/spotify/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect('/login?error=spotify_auth_failed')
  }

  if (!code) {
    return NextResponse.redirect('/login?error=no_code')
  }

  try {
    // Exchange code for access token
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
      }),
    })

    const data = await response.json()

    if (data.error) {
      throw new Error(data.error_description)
    }

    // Store tokens securely (use session/database)
    const { access_token, refresh_token, expires_in } = data

    // TODO: Store tokens in database associated with user
    // TODO: Set secure HTTP-only cookie for session

    return NextResponse.redirect('/dashboard?spotify_connected=true')
  } catch (error) {
    console.error('Spotify auth error:', error)
    return NextResponse.redirect('/login?error=spotify_token_exchange_failed')
  }
}
```

### Step 3: Refresh Access Token

Access tokens expire after 1 hour. Implement refresh logic:

```typescript
// lib/spotify.ts
export async function refreshSpotifyToken(refreshToken: string) {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  })

  const data = await response.json()

  if (data.error) {
    throw new Error(data.error_description)
  }

  return {
    accessToken: data.access_token,
    expiresIn: data.expires_in,
  }
}
```

## Spotify API Features

### 1. Get User Profile

```typescript
export async function getSpotifyUserProfile(accessToken: string) {
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return await response.json()
}
```

### 2. Get User's Top Tracks

```typescript
export async function getUserTopTracks(
  accessToken: string,
  timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term',
  limit: number = 20
) {
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  return await response.json()
}
```

### 3. Create Playlist

```typescript
export async function createPlaylist(
  accessToken: string,
  userId: string,
  name: string,
  description: string,
  isPublic: boolean = false
) {
  const response = await fetch(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        public: isPublic,
      }),
    }
  )

  return await response.json()
}
```

### 4. Add Tracks to Playlist

```typescript
export async function addTracksToPlaylist(
  accessToken: string,
  playlistId: string,
  trackUris: string[]
) {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris: trackUris,
      }),
    }
  )

  return await response.json()
}
```

### 5. Search Tracks

```typescript
export async function searchTracks(
  accessToken: string,
  query: string,
  limit: number = 20
) {
  const params = new URLSearchParams({
    q: query,
    type: 'track',
    limit: limit.toString(),
  })

  const response = await fetch(
    `https://api.spotify.com/v1/search?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  return await response.json()
}
```

### 6. Get Track Audio Features

```typescript
export async function getTrackAudioFeatures(
  accessToken: string,
  trackId: string
) {
  const response = await fetch(
    `https://api.spotify.com/v1/audio-features/${trackId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  return await response.json()
}
```

## JACAMENO-Specific Features

### Auto-Playlist Creation

When a user completes a track in JACAMENO, automatically create a Spotify playlist:

```typescript
// services/spotify-integration.ts
export async function publishToSpotify(
  accessToken: string,
  userId: string,
  track: {
    title: string
    artist: string
    spotifyUri?: string
  }
) {
  // 1. Create playlist if it doesn't exist
  const playlist = await createPlaylist(
    accessToken,
    userId,
    `JACAMENO - ${track.artist}`,
    'Created with JACAMENO AI Music Platform',
    true
  )

  // 2. Add track to playlist (if track is already on Spotify)
  if (track.spotifyUri) {
    await addTracksToPlaylist(accessToken, playlist.id, [track.spotifyUri])
  }

  return playlist
}
```

### Analyze User's Music Taste

```typescript
export async function analyzeUserTaste(accessToken: string) {
  // Get top tracks and artists
  const topTracks = await getUserTopTracks(accessToken, 'medium_term', 50)
  
  // Get audio features for top tracks
  const trackIds = topTracks.items.map((track: any) => track.id)
  const audioFeatures = await Promise.all(
    trackIds.map((id: string) => getTrackAudioFeatures(accessToken, id))
  )

  // Calculate average features
  const avgFeatures = {
    tempo: 0,
    energy: 0,
    danceability: 0,
    valence: 0,
  }

  audioFeatures.forEach((features: any) => {
    avgFeatures.tempo += features.tempo
    avgFeatures.energy += features.energy
    avgFeatures.danceability += features.danceability
    avgFeatures.valence += features.valence
  })

  Object.keys(avgFeatures).forEach((key) => {
    avgFeatures[key as keyof typeof avgFeatures] /= audioFeatures.length
  })

  return {
    topGenres: topTracks.items.map((t: any) => t.album.genres).flat(),
    averageFeatures: avgFeatures,
  }
}
```

### AI Recommendations Based on Spotify Data

```typescript
export async function getAIRecommendations(accessToken: string) {
  const userTaste = await analyzeUserTaste(accessToken)
  
  // Use JACAMENO AI to suggest:
  // - Production techniques matching user's taste
  // - VST plugins for similar sounds
  // - Lyrics style based on favorite artists
  // - BPM and key suggestions

  return {
    recommendedBPM: Math.round(userTaste.averageFeatures.tempo),
    recommendedKey: 'C major', // Based on analysis
    productionStyle: userTaste.topGenres[0] || 'pop',
    suggestedPlugins: ['Serum', 'FabFilter Pro-Q 3', 'Valhalla VintageVerb'],
  }
}
```

## Rate Limits

Spotify API rate limits:
- **Standard**: Varies by endpoint, generally 180 requests per minute
- **Web API**: Rate-limited per user and endpoint
- **Recommendations**: Handle 429 (Too Many Requests) responses with exponential backoff

## Error Handling

```typescript
export async function spotifyApiCall<T>(
  url: string,
  accessToken: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (response.status === 401) {
      throw new Error('SPOTIFY_TOKEN_EXPIRED')
    }

    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After')
      throw new Error(`RATE_LIMITED:${retryAfter}`)
    }

    if (!response.ok) {
      throw new Error(`SPOTIFY_API_ERROR:${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Spotify API call failed:', error)
    throw error
  }
}
```

## Security Best Practices

1. **Never expose credentials**: Use environment variables
2. **Store tokens securely**: Use encrypted database storage
3. **Use HTTPS**: Always use secure connections
4. **Validate redirect URIs**: Whitelist allowed redirect URIs in Spotify Dashboard
5. **Implement CSRF protection**: Use state parameter in OAuth flow
6. **Token rotation**: Refresh tokens before they expire
7. **Minimal scopes**: Only request necessary permissions

## Database Schema

Store Spotify integration data:

```sql
CREATE TABLE spotify_accounts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  spotify_user_id VARCHAR(255) NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  token_expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_spotify_user_id ON spotify_accounts(user_id);
```

## Testing

### Mock Spotify API for Development

```typescript
// lib/__mocks__/spotify.ts
export const mockSpotifyAPI = {
  getUserProfile: jest.fn().mockResolvedValue({
    id: 'test_user',
    display_name: 'Test User',
    email: 'test@example.com',
  }),
  getUserTopTracks: jest.fn().mockResolvedValue({
    items: [
      { id: '1', name: 'Test Track 1' },
      { id: '2', name: 'Test Track 2' },
    ],
  }),
}
```

## Resources

- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api)
- [OAuth 2.0 Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/)
- [API Reference](https://developer.spotify.com/documentation/web-api/reference/)
- [Rate Limits](https://developer.spotify.com/documentation/web-api/concepts/rate-limits)

## Support

For Spotify integration issues:
- Email: spotify-support@jacameno.com
- GitHub Issues: Tag with `integration:spotify`
- Spotify Developer Forum: https://community.spotify.com/

## Roadmap

**Planned Features:**
- [ ] Automatic track upload to Spotify (when available)
- [ ] Spotify Canvas integration (video loops for tracks)
- [ ] Advanced analytics dashboard
- [ ] Collaborative playlist creation
- [ ] Direct royalty tracking
