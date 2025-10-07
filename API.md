# API Documentation

## Base URL

- Backend API: `http://localhost:3000/api`
- AI Services: `http://localhost:8000/api`

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "username": "username"
}
```

Response:
```json
{
  "message": "User registered successfully",
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "username"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Virtual Studio

#### Create Project
```http
POST /api/studio/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "My Project",
  "template": "electronic",
  "bpm": 128,
  "key": "Am"
}
```

#### Get Projects
```http
GET /api/studio/projects
Authorization: Bearer <token>
```

#### Add Track to Project
```http
POST /api/studio/projects/:id/tracks
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Lead Vocals",
  "type": "audio",
  "vstPlugin": "Auto-Tune"
}
```

### AI Services

#### AI Mixing & Mastering
```http
POST /api/ai/mix-master
Authorization: Bearer <token>
Content-Type: application/json

{
  "projectId": 123,
  "tracks": [
    {"id": 1, "name": "Vocals"},
    {"id": 2, "name": "Beat"}
  ],
  "preferences": {
    "genre": "pop",
    "intensity": "medium",
    "targetLoudness": -14
  }
}
```

#### AI Songwriting
```http
POST /api/ai/songwriting
Authorization: Bearer <token>
Content-Type: application/json

{
  "prompt": "Write a love song",
  "genre": "pop",
  "mood": "romantic",
  "structure": ["verse", "chorus", "verse", "chorus", "bridge", "chorus"]
}
```

#### AI Vocal Coaching
```http
POST /api/ai/vocal-coach
Authorization: Bearer <token>
Content-Type: application/json

{
  "audioUrl": "https://example.com/vocal.mp3",
  "targetStyle": "pop"
}
```

### Collaboration

#### Create Session
```http
POST /api/collaboration/sessions
Authorization: Bearer <token>
Content-Type: application/json

{
  "projectId": 123,
  "collaborators": ["user2@example.com"],
  "permissions": {
    "user2@example.com": ["read", "write"]
  }
}
```

#### Join Session
```http
POST /api/collaboration/sessions/:id/join
Authorization: Bearer <token>
```

### Streaming

#### Upload Track
```http
POST /api/streaming/upload
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Song",
  "artist": "Artist Name",
  "album": "Album Name",
  "genre": "Pop",
  "audioUrl": "https://example.com/track.mp3",
  "coverArt": "https://example.com/cover.jpg"
}
```

#### Search Tracks
```http
GET /api/streaming/search?query=love&genre=pop&artist=Artist
```

#### Create Playlist
```http
POST /api/streaming/playlists
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "My Playlist",
  "description": "Description",
  "tracks": [1, 2, 3],
  "isPublic": true
}
```

### Analytics

#### Get User Analytics
```http
GET /api/analytics/user
Authorization: Bearer <token>
```

Response:
```json
{
  "analytics": {
    "userId": 1,
    "totalPlays": 1000,
    "totalLikes": 50,
    "totalFollowers": 100,
    "topTracks": [],
    "revenueStats": {
      "total": 500.00,
      "thisMonth": 100.00,
      "currency": "USD"
    },
    "audienceStats": {
      "topCountries": ["US", "UK", "CA"],
      "ageGroups": [],
      "genderDistribution": []
    }
  }
}
```

#### Get Track Analytics
```http
GET /api/analytics/track/:id
Authorization: Bearer <token>
```

### Fan Portal

#### Create Artist Profile
```http
POST /api/fan-portal/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "bio": "Artist bio",
  "profileImage": "https://example.com/profile.jpg",
  "socialLinks": {
    "instagram": "@artist",
    "twitter": "@artist"
  },
  "genres": ["Pop", "R&B"]
}
```

#### Post Update
```http
POST /api/fan-portal/updates
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "New song coming soon!",
  "media": ["https://example.com/image.jpg"],
  "type": "image"
}
```

#### Create Subscription Tier
```http
POST /api/fan-portal/monetization/tiers
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Premium Fan",
  "price": 9.99,
  "benefits": [
    "Exclusive content",
    "Early access to new releases",
    "Behind-the-scenes videos"
  ]
}
```

## Error Responses

All endpoints may return the following error response:

```json
{
  "error": {
    "message": "Error description"
  }
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Internal Server Error
