# JACAMENO API Documentation

## Overview

The JACAMENO API provides three main interfaces:
1. **REST API** - Traditional RESTful endpoints for standard operations
2. **GraphQL API** - Flexible query language for complex data fetching
3. **WebSocket API** - Real-time bidirectional communication

## Base URLs

- **REST API**: `http://localhost:4000/api/v1`
- **GraphQL**: `http://localhost:4000/graphql`
- **WebSocket**: `ws://localhost:4000`

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Obtaining a Token

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user123",
    "username": "musicproducer",
    "email": "user@example.com"
  }
}
```

## REST API Endpoints

### Health Check

```http
GET /health
```

Response:
```json
{
  "status": "ok",
  "service": "JACAMENO API"
}
```

### Projects

#### Create Project

```http
POST /api/v1/projects
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "My New Album",
  "bpm": 120,
  "key": "C major",
  "genre": "trap"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "project123",
    "name": "My New Album",
    "bpm": 120,
    "key": "C major",
    "genre": "trap",
    "tracks": [],
    "collaborators": [],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Get Project

```http
GET /api/v1/projects/:id
Authorization: Bearer <token>
```

#### Update Project

```http
PUT /api/v1/projects/:id
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "Updated Album Name",
  "bpm": 128
}
```

#### Delete Project

```http
DELETE /api/v1/projects/:id
Authorization: Bearer <token>
```

### Tracks

#### Upload Track

```http
POST /api/v1/tracks/upload
Content-Type: multipart/form-data
Authorization: Bearer <token>

{
  "file": <audio-file>,
  "projectId": "project123",
  "name": "Vocal Track 1"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "track123",
    "name": "Vocal Track 1",
    "audioUrl": "https://s3.amazonaws.com/.../track.wav",
    "duration": 180.5,
    "projectId": "project123"
  }
}
```

### AI Services

#### Generate Lyrics

```http
POST /api/v1/ai/lyrics
Content-Type: application/json
Authorization: Bearer <token>

{
  "style": "trap",
  "theme": "success",
  "mood": "confident",
  "artist": "Drake",
  "bpm": 120
}
```

Response:
```json
{
  "success": true,
  "data": {
    "lyrics": "[Verse 1]\nLiving life in the trap lane...",
    "rhymeScheme": "AABB",
    "suggestions": [
      "Consider adding a bridge section",
      "The flow matches well with the BPM"
    ]
  }
}
```

#### Vocal Coaching Analysis

```http
POST /api/v1/ai/vocal-coaching
Content-Type: multipart/form-data
Authorization: Bearer <token>

{
  "file": <audio-file>
}
```

Response:
```json
{
  "success": true,
  "data": {
    "pitch": "Good - 87.5% accuracy",
    "timing": "Excellent - 92.0%",
    "breath": "Good control",
    "recommendations": [
      "Work on sustaining notes longer",
      "Practice breath control exercises",
      "Consider vocal warm-ups before recording"
    ],
    "overallScore": 89.8
  }
}
```

#### AI Mixing

```http
POST /api/v1/ai/mixing
Content-Type: application/json
Authorization: Bearer <token>

{
  "trackId": "track123",
  "genre": "trap",
  "applyEq": true,
  "applyCompression": true,
  "reverbAmount": 0.3
}
```

Response:
```json
{
  "success": true,
  "data": {
    "suggestions": [
      "Reduce bass by 2dB at 80Hz",
      "Add slight reverb to vocals",
      "Apply compression to drums"
    ],
    "appliedEffects": [
      "EQ: Boosted 3kHz for presence",
      "Compression: Ratio 4:1",
      "Reverb: 30% wet"
    ],
    "downloadUrl": "/download/mixed_track123.wav"
  }
}
```

#### AI Mastering

```http
POST /api/v1/ai/mastering
Content-Type: application/json
Authorization: Bearer <token>

{
  "trackId": "track123",
  "targetLoudness": -14.0,
  "preset": "streaming"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "finalLoudness": -14.0,
    "downloadUrl": "/download/mastered_track123.wav"
  }
}
```

### VST Plugins

#### List Available Plugins

```http
GET /api/v1/vst/plugins
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "data": {
    "plugins": [
      {
        "id": "vst1",
        "name": "Compressor Pro",
        "type": "VST3",
        "category": "dynamics"
      },
      {
        "id": "vst2",
        "name": "Reverb Studio",
        "type": "VST2",
        "category": "effects"
      }
    ]
  }
}
```

#### Get VST Suggestions

```http
GET /api/v1/vst/suggestions?genre=trap&trackType=vocals
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "data": {
    "genre": "trap",
    "trackType": "vocals",
    "recommendedPlugins": [
      "Auto-Tune Pro",
      "Waves CLA Vocals",
      "FabFilter Pro-Q 3"
    ]
  }
}
```

## GraphQL API

### Schema

```graphql
type Query {
  projects: [Project!]!
  project(id: ID!): Project
  tracks: [Track!]!
  user(id: ID!): User
  vstPlugins: [VSTPlugin!]!
}

type Mutation {
  createProject(input: CreateProjectInput!): Project!
  updateProject(id: ID!, input: UpdateProjectInput!): Project!
  deleteProject(id: ID!): Boolean!
  createTrack(input: CreateTrackInput!): Track!
  generateLyrics(input: LyricsInput!): LyricsResult!
  analyzeVocals(audioUrl: String!): VocalAnalysis!
  mixTrack(trackId: ID!, settings: MixSettings!): MixResult!
  masterTrack(trackId: ID!, settings: MasterSettings!): MasterResult!
  loadVSTPlugin(pluginId: ID!, trackId: ID!): Boolean!
}

type Subscription {
  projectUpdated(projectId: ID!): Project!
  trackAdded(projectId: ID!): Track!
  collaboratorJoined(projectId: ID!): User!
}
```

### Example Queries

#### Get All Projects

```graphql
query GetProjects {
  projects {
    id
    name
    bpm
    genre
    tracks {
      id
      name
      volume
      vstChain {
        id
        name
        type
      }
    }
    collaborators {
      id
      username
    }
  }
}
```

#### Create Project

```graphql
mutation CreateProject {
  createProject(input: {
    name: "New Beat"
    bpm: 140
    genre: "trap"
  }) {
    id
    name
    bpm
    createdAt
  }
}
```

#### Generate Lyrics

```graphql
mutation GenerateLyrics {
  generateLyrics(input: {
    style: "trap"
    theme: "success"
    mood: "confident"
  }) {
    lyrics
    rhymeScheme
    suggestions
  }
}
```

## WebSocket API

### Connection

```javascript
import io from 'socket.io-client'

const socket = io('http://localhost:4000', {
  auth: {
    token: 'your-jwt-token'
  }
})
```

### Events

#### Join Project

**Client → Server**
```javascript
socket.emit('join-project', 'project123')
```

**Server → Client**
```javascript
socket.on('collaborator-joined', (data) => {
  console.log('User joined:', data.userId)
})
```

#### Track Update

**Client → Server**
```javascript
socket.emit('track-update', {
  projectId: 'project123',
  trackId: 'track456',
  changes: {
    volume: -3,
    muted: false
  }
})
```

**Server → Client**
```javascript
socket.on('track-updated', (data) => {
  console.log('Track updated:', data.trackId, data.changes)
})
```

#### Playback Control

**Client → Server**
```javascript
socket.emit('playback-control', {
  projectId: 'project123',
  action: 'play', // 'play', 'pause', 'stop', 'seek'
  position: 120 // seconds
})
```

**Server → Client**
```javascript
socket.on('playback-sync', (data) => {
  console.log('Playback synced:', data.action, data.position)
})
```

#### VST Plugin Loaded

**Client → Server**
```javascript
socket.emit('vst-loaded', {
  projectId: 'project123',
  trackId: 'track456',
  pluginId: 'vst789'
})
```

**Server → Client**
```javascript
socket.on('vst-plugin-loaded', (data) => {
  console.log('VST loaded:', data.pluginId)
})
```

#### Chat Messages

**Client → Server**
```javascript
socket.emit('chat-message', {
  projectId: 'project123',
  message: 'Great work on that vocal!'
})
```

**Server → Client**
```javascript
socket.on('chat-message-received', (data) => {
  console.log(`${data.userId}: ${data.message}`)
})
```

#### AI Suggestions

**Client → Server**
```javascript
socket.emit('ai-suggestion-request', {
  projectId: 'project123',
  context: 'mixing'
})
```

**Server → Client**
```javascript
socket.on('ai-suggestion', (data) => {
  console.log('AI suggests:', data.suggestion)
})
```

## Python AI Microservices API

Base URL: `http://localhost:8000`

### Generate Lyrics

```http
POST /api/lyrics
Content-Type: application/json

{
  "style": "trap",
  "theme": "success",
  "mood": "confident",
  "artist": "Drake",
  "bpm": 120
}
```

### Analyze Vocals

```http
POST /api/vocal-analysis
Content-Type: multipart/form-data

{
  "file": <audio-file>
}
```

### AI Mixing

```http
POST /api/mixing
Content-Type: application/json

{
  "track_id": "track123",
  "genre": "trap",
  "apply_eq": true,
  "apply_compression": true,
  "reverb_amount": 0.3
}
```

### AI Mastering

```http
POST /api/mastering
Content-Type: application/json

{
  "track_id": "track123",
  "target_loudness": -14.0,
  "preset": "streaming"
}
```

### Process Audio

```http
POST /api/audio/process
Content-Type: multipart/form-data

{
  "file": <audio-file>
}
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

### Common Error Codes

- `AUTH_REQUIRED` - Authentication required
- `INVALID_TOKEN` - Invalid or expired token
- `NOT_FOUND` - Resource not found
- `VALIDATION_ERROR` - Invalid input data
- `SERVER_ERROR` - Internal server error
- `RATE_LIMIT` - Too many requests

## Rate Limiting

- **Anonymous requests**: 100 requests per hour
- **Authenticated requests**: 1000 requests per hour
- **AI services**: 50 requests per hour per user

## Pagination

List endpoints support pagination:

```http
GET /api/v1/projects?page=1&limit=20
```

Response includes pagination metadata:

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

## Webhooks

Configure webhooks to receive real-time notifications:

```http
POST /api/v1/webhooks
Content-Type: application/json
Authorization: Bearer <token>

{
  "url": "https://your-domain.com/webhook",
  "events": ["project.created", "track.uploaded", "collaboration.invited"]
}
```

## SDK Examples

### JavaScript/TypeScript

```typescript
import { JacamenoClient } from '@jacameno/sdk'

const client = new JacamenoClient({
  apiKey: 'your-api-key',
  baseUrl: 'http://localhost:4000'
})

// Create project
const project = await client.projects.create({
  name: 'New Album',
  bpm: 120,
  genre: 'trap'
})

// Generate lyrics
const lyrics = await client.ai.generateLyrics({
  style: 'trap',
  theme: 'success'
})
```

### Python

```python
from jacameno import JacamenoClient

client = JacamenoClient(
    api_key='your-api-key',
    base_url='http://localhost:4000'
)

# Create project
project = client.projects.create(
    name='New Album',
    bpm=120,
    genre='trap'
)

# Analyze vocals
analysis = client.ai.analyze_vocals('path/to/audio.wav')
```

## Support

For API support and questions:
- Documentation: https://docs.jacameno.com
- GitHub Issues: https://github.com/joachimaross/JacamenoMusic/issues
- Email: api@jacameno.com
