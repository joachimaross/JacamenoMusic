# JACAMENO Platform Architecture

## System Overview

JACAMENO is built as a modern, scalable microservices architecture with a monorepo structure. The platform consists of multiple interconnected services:

```
┌─────────────────────────────────────────────────────────────┐
│                        Clients                               │
├──────────────┬──────────────┬───────────────┬───────────────┤
│   Web App    │  Mobile iOS  │ Mobile Android│   Desktop     │
│   (Next.js)  │    (Expo)    │    (Expo)     │   (Future)    │
└──────┬───────┴──────┬───────┴───────┬───────┴────────┬──────┘
       │              │               │                 │
       └──────────────┴───────────────┴─────────────────┘
                             │
       ┌─────────────────────┴─────────────────────┐
       │          Load Balancer / CDN              │
       └─────────────────────┬─────────────────────┘
                             │
       ┌─────────────────────┴─────────────────────┐
       │                                           │
   ┌───▼────────────┐                    ┌────────▼──────┐
   │  Backend API   │◄───────────────────┤  WebSocket    │
   │  (Node.js)     │                    │  Server       │
   └───┬────────────┘                    └───────────────┘
       │
       ├────────────┬─────────────┬──────────────┬────────┐
       │            │             │              │        │
   ┌───▼────┐  ┌───▼─────┐  ┌───▼──────┐  ┌───▼────┐  │
   │GraphQL │  │  REST   │  │WebSocket │  │ Auth   │  │
   │  API   │  │   API   │  │ Handler  │  │Service │  │
   └────────┘  └─────────┘  └──────────┘  └────────┘  │
                                                        │
       ┌────────────────────────────────────────────────┘
       │
   ┌───▼──────────────────────────────────────────┐
   │        AI Microservices (Python)             │
   ├──────────┬──────────┬──────────┬─────────────┤
   │  Lyrics  │  Vocal   │  Mixing  │  Mastering  │
   │ Generator│ Coaching │  Engine  │   Engine    │
   └──────────┴──────────┴──────────┴─────────────┘
       │
       └────────────────┬──────────────────┐
                        │                  │
              ┌─────────▼───────┐   ┌─────▼──────┐
              │   PostgreSQL    │   │   Redis    │
              │   Database      │   │   Cache    │
              └─────────────────┘   └────────────┘
                        │
              ┌─────────▼───────┐
              │     AWS S3      │
              │  File Storage   │
              └─────────────────┘
```

## Architecture Layers

### 1. Presentation Layer

#### Web Application (Next.js)
- **Technology**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Features**:
  - Server-side rendering for SEO
  - App router for optimized routing
  - API routes for serverless functions
  - Static page generation where possible

#### Mobile Application (React Native + Expo)
- **Technology**: React Native, Expo SDK
- **Navigation**: React Navigation
- **Features**:
  - Native iOS and Android apps
  - Offline-first architecture
  - Push notifications
  - Background audio processing

### 2. API Layer

#### Backend API Service (Node.js + Express)
- **REST API**: Traditional REST endpoints for CRUD operations
- **GraphQL API**: Flexible querying for complex data relationships
- **WebSocket Server**: Real-time collaboration and updates
- **Responsibilities**:
  - Authentication and authorization
  - Project and track management
  - User profile management
  - File upload orchestration
  - Integration with AI services

**Key Endpoints**:
```
REST API:
  POST   /api/v1/projects
  GET    /api/v1/projects/:id
  POST   /api/v1/tracks/upload
  POST   /api/v1/ai/lyrics
  POST   /api/v1/ai/mixing
  GET    /api/v1/vst/plugins

GraphQL:
  /graphql

WebSocket:
  /socket.io
```

### 3. AI Microservices Layer

#### Python FastAPI Services
Specialized microservices for AI-powered features:

1. **Lyrics Generation Service**
   - NLP models for lyric generation
   - Style transfer and adaptation
   - Rhyme scheme analysis
   - Integration with OpenAI GPT

2. **Vocal Coaching Service**
   - Audio analysis with Librosa
   - Pitch detection and correction
   - Timing analysis
   - Breath control assessment

3. **Mixing Engine**
   - Audio processing with PyDub
   - EQ, compression, reverb
   - Genre-specific presets
   - Automated gain staging

4. **Mastering Engine**
   - Loudness normalization
   - Dynamic range control
   - Stereo imaging
   - Final limiting

5. **Video Processing Service** (Future)
   - Album art generation
   - Music video creation
   - Auto-captioning

### 4. Data Layer

#### PostgreSQL Database
- **Schema**:
  - Users table
  - Projects table
  - Tracks table
  - VST plugins table
  - Collaborations table
  - Analytics events table

#### Redis Cache
- Session storage
- Real-time collaboration state
- Job queue for async processing
- Rate limiting

#### AWS S3 Storage
- Audio files (.wav, .mp3, .flac)
- Project files
- User uploads
- Generated content
- CDN integration for fast delivery

#### Vector Database (Pinecone/Weaviate)
- AI memory for personalization
- Project embeddings
- User preference vectors
- Style recommendations

## Data Flow

### 1. Project Creation Flow
```
User (Web/Mobile)
  │
  ├─► POST /api/v1/projects
  │     │
  │     ├─► Validate input
  │     ├─► Create database record
  │     ├─► Initialize S3 folder
  │     └─► Return project ID
  │
  └─► WebSocket: join-project event
        │
        └─► Subscribe to real-time updates
```

### 2. Track Upload Flow
```
User uploads audio file
  │
  ├─► POST /api/v1/tracks/upload
  │     │
  │     ├─► Store in S3
  │     ├─► POST /api/audio/process (AI Service)
  │     │     │
  │     │     ├─► Extract metadata
  │     │     ├─► Generate waveform
  │     │     └─► Analyze audio features
  │     │
  │     ├─► Save to database
  │     └─► Notify collaborators via WebSocket
  │
  └─► Display in DAW interface
```

### 3. AI Lyrics Generation Flow
```
User requests lyrics
  │
  ├─► GraphQL mutation: generateLyrics
  │     │
  │     ├─► POST /api/lyrics (AI Service)
  │     │     │
  │     │     ├─► Load user style preferences
  │     │     ├─► Call OpenAI API
  │     │     ├─► Apply style transfer
  │     │     └─► Generate rhyme scheme
  │     │
  │     ├─► Cache in Redis
  │     └─► Return to client
  │
  └─► Display in editor
```

### 4. Real-time Collaboration Flow
```
User A edits track
  │
  ├─► WebSocket: track-update event
  │     │
  │     ├─► Validate permissions
  │     ├─► Update database
  │     ├─► Broadcast to room
  │     │     │
  │     │     └─► User B receives update
  │     │           │
  │     │           └─► Apply changes to UI
  │     │
  │     └─► Save to version history
```

## Security Architecture

### Authentication
- JWT tokens for stateless authentication
- Firebase/Supabase for user management
- Refresh token rotation
- OAuth integration (Google, GitHub, etc.)

### Authorization
- Role-based access control (RBAC)
- Project-level permissions
- Collaboration invites
- API key management for integrations

### Data Protection
- HTTPS/TLS for all communications
- Encrypted data at rest (S3, database)
- Secure WebSocket connections (WSS)
- API rate limiting
- CORS configuration

## Scalability Considerations

### Horizontal Scaling
- Stateless API servers
- Load balancer distribution
- Redis for shared state
- Database connection pooling

### Performance Optimization
- CDN for static assets
- Asset compression and minification
- Database indexing
- Query optimization
- Lazy loading and code splitting

### Monitoring & Observability
- Application logging (Winston, Pino)
- Error tracking (Sentry)
- Performance monitoring (New Relic, DataDog)
- Health check endpoints
- Metrics dashboard

## Technology Choices Rationale

### Why Next.js?
- SEO-friendly server-side rendering
- Excellent developer experience
- Built-in API routes
- Automatic code splitting
- Strong TypeScript support

### Why React Native + Expo?
- Cross-platform development
- Native performance
- Over-the-air updates
- Large ecosystem
- Easy deployment

### Why Node.js?
- JavaScript everywhere
- Non-blocking I/O for real-time features
- Large package ecosystem
- WebSocket support
- Fast development

### Why Python for AI?
- Best ML/AI library support
- Librosa for audio processing
- PyTorch for deep learning
- FastAPI for modern Python APIs
- Strong data science ecosystem

### Why PostgreSQL?
- ACID compliance
- Complex queries and relationships
- JSON support for flexible schemas
- Full-text search
- Excellent performance

### Why Redis?
- Sub-millisecond latency
- Pub/sub for real-time features
- Session storage
- Job queue support
- Caching layer

## Future Architecture Enhancements

1. **Kubernetes Deployment**
   - Container orchestration
   - Auto-scaling
   - Self-healing
   - Rolling updates

2. **Event-Driven Architecture**
   - Apache Kafka for event streaming
   - Event sourcing for audit trails
   - CQRS pattern for complex queries

3. **Edge Computing**
   - Edge functions for low-latency
   - CDN integration
   - Regional deployments

4. **Machine Learning Pipeline**
   - Model training infrastructure
   - A/B testing for AI features
   - Continuous model improvement
   - Feature store

5. **Multi-Region Deployment**
   - Geographic distribution
   - Data replication
   - Disaster recovery
   - Compliance with data regulations

## Development Workflow

1. **Local Development**
   - Docker Compose for local services
   - Hot module reloading
   - Local S3 (MinIO)
   - Local databases

2. **CI/CD Pipeline**
   - GitHub Actions
   - Automated testing
   - Code quality checks
   - Automated deployment

3. **Deployment Strategy**
   - Blue-green deployment
   - Canary releases
   - Feature flags
   - Rollback capabilities
