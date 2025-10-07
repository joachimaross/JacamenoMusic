# JACAMENO Music Production Platform

## 🎵 Overview

JACAMENO is a next-generation AI music production and streaming platform that combines professional-grade DAW capabilities, AI-powered songwriting and mixing, real-time collaboration, and a native streaming service—all in one unified ecosystem.

## 🚀 Features

### 1. Virtual Studio Mode (AI Producer/Engineer)
- AI runs entire sessions with interactive guidance
- Voice commands for hands-free control
- Real-time suggestions during recording and playback
- Automated organization of stems and lyrics

### 2. Professional Mixing & Mastering
- Multi-track mixing with AI EQ, compression, reverb
- Genre-specific presets (trap, R&B, drill, EDM, pop, rock)
- Export in WAV, MP3, FLAC formats
- Real-time mixing suggestions

### 3. Songwriting & Vocal Coaching
- AI-generated lyrics tailored to beat and artist style
- Flow guides for rap/singing delivery
- Vocal pitch, timing, and breath analysis
- Personalized warm-ups and exercises

### 4. Video & Photo Editing
- Album art generation
- Music video creation and editing
- Auto-captioning and social media content
- Trailer creation

### 5. Fan-Artist Portal
- Share WIPs, demos, and snippets
- Fan comments, votes, and remixes
- Exclusive content drops
- Behind-the-scenes access

### 6. Smart Collaboration
- Real-time multi-user collaboration
- Synced stems, lyrics, and version control
- Integrated voice and chat
- Cross-device compatibility (iOS, Android, Web)

### 7. Performance Analytics
- Track streams, engagement, downloads
- AI-suggested release strategies
- Monetization dashboard
- Royalty tracking

### 8. Offline Creation Mode
- Full DAW workflow offline
- Automatic sync when back online
- Local storage management

### 9. JACAMENO Streaming Service
- Native in-app music streaming
- Direct royalty payouts to artists
- AI-curated playlists
- Cross-publishing to major platforms

### 10. VST Plugin Support
- Load VST2/VST3 plugins
- AI-assisted plugin management
- Save presets per project
- Export with/without effects
- Integrated VST marketplace

## 🛠️ Tech Stack

### Frontend
- **Web**: Next.js 14, React 18, Tailwind CSS
- **Mobile**: React Native, Expo
- **State Management**: Zustand
- **Real-time**: Socket.io Client

### Backend
- **API**: Node.js, Express, TypeScript
- **Real-time**: Socket.io
- **GraphQL**: Apollo Server
- **Database**: PostgreSQL + Sequelize
- **Cache**: Redis
- **Storage**: AWS S3

### AI Services
- **Framework**: Python, FastAPI
- **Audio Processing**: Librosa, PyDub, FFmpeg
- **ML/AI**: PyTorch, Transformers
- **APIs**: OpenAI GPT, Whisper AI

### Infrastructure
- **Authentication**: Firebase/Supabase
- **Vector DB**: Pinecone/Weaviate
- **Payments**: Stripe, PayPal
- **CDN**: CloudFront

## 📁 Project Structure

```
jacameno-music/
├── apps/
│   ├── web/                 # Next.js web application
│   │   ├── src/
│   │   │   ├── app/        # App router pages
│   │   │   ├── components/ # React components
│   │   │   ├── lib/        # Utilities
│   │   │   └── styles/     # Global styles
│   │   └── package.json
│   └── mobile/             # React Native mobile app
│       ├── App.tsx
│       ├── app.json
│       └── package.json
├── services/
│   ├── api/                # Node.js backend API
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── graphql/
│   │   │   └── socket/
│   │   └── package.json
│   └── ai-microservices/   # Python AI services
│       ├── main.py
│       ├── audio/
│       ├── lyrics/
│       ├── vocal/
│       ├── mixing/
│       └── video/
├── packages/
│   ├── ui/                 # Shared UI components
│   └── shared/             # Shared utilities
├── docs/                   # Documentation
└── package.json            # Root workspace config
```

## 🚦 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- Python >= 3.9
- PostgreSQL >= 14

### Installation

1. Clone the repository:
```bash
git clone https://github.com/joachimaross/JacamenoMusic.git
cd JacamenoMusic
```

2. Install dependencies:
```bash
npm install
```

3. Install Python dependencies:
```bash
cd services/ai-microservices
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
# Create .env files for each service
cp apps/web/.env.example apps/web/.env.local
cp services/api/.env.example services/api/.env
```

5. Start development servers:

**Web Application:**
```bash
npm run dev
```

**Mobile Application:**
```bash
npm run dev:mobile
```

**Backend API:**
```bash
npm run dev:api
```

**AI Microservices:**
```bash
cd services/ai-microservices
python main.py
```

## 🌐 API Endpoints

### REST API (Port 4000)
- `GET /health` - Health check
- `POST /api/v1/projects` - Create project
- `POST /api/v1/tracks/upload` - Upload track
- `POST /api/v1/ai/lyrics` - Generate lyrics
- `POST /api/v1/ai/vocal-coaching` - Vocal analysis
- `POST /api/v1/ai/mixing` - AI mixing
- `GET /api/v1/vst/plugins` - List VST plugins

### GraphQL (Port 4000)
- Endpoint: `http://localhost:4000/graphql`
- Playground: Available in development

### AI Microservices (Port 8000)
- `POST /api/lyrics` - Generate lyrics
- `POST /api/vocal-analysis` - Analyze vocals
- `POST /api/mixing` - AI mixing
- `POST /api/mastering` - AI mastering
- `POST /api/audio/process` - Process audio files

### WebSocket (Port 4000)
- Real-time collaboration
- Track updates
- Chat messages
- Playback synchronization

## 🎯 Key Features by Component

### Web Portal (`apps/web`)
- Landing page with feature showcase
- Virtual Studio Mode with DAW interface
- Streaming service with player
- Analytics dashboard
- User profile and settings

### Mobile App (`apps/mobile`)
- Native iOS/Android experience
- Studio mode for mobile production
- Streaming player
- Offline creation support
- Push notifications

### Backend API (`services/api`)
- RESTful endpoints
- GraphQL API
- WebSocket real-time communication
- Authentication & authorization
- File upload handling

### AI Microservices (`services/ai-microservices`)
- Lyrics generation
- Vocal analysis and coaching
- Audio processing
- Mixing suggestions
- Mastering automation
- VST recommendations

## 🔌 Integration Points

### Music AI
- Suno API
- Meta AudioCraft (MusicGen)
- OpenAI GPT for lyrics
- Whisper AI for transcription

### Video & Visuals
- Stable Diffusion for album art
- RunwayML for video editing
- Canva API integration

### External Services
- Spotify API
- Apple Music API
- YouTube API
- TikTok integration
- Stripe for payments

## 🧪 Testing

Run tests across all workspaces:
```bash
npm test
```

Test specific workspace:
```bash
npm test --workspace=apps/web
npm test --workspace=services/api
```

## 📦 Building

Build all projects:
```bash
npm run build
```

Build specific workspace:
```bash
npm run build --workspace=apps/web
```

## 🚀 Deployment

### Web Application
- Deploy to Vercel, Netlify, or AWS
- Environment variables required

### Backend API
- Deploy to AWS EC2, Heroku, or DigitalOcean
- Configure PostgreSQL connection
- Set up Redis instance

### AI Microservices
- Deploy to AWS Lambda, Google Cloud Run
- Configure GPU instance for ML models

### Mobile Apps
- Build with Expo EAS
- Submit to App Store and Google Play

## 📝 Environment Variables

### Web App
```
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_WS_URL=ws://localhost:4000
NEXT_PUBLIC_AI_SERVICE_URL=http://localhost:8000
```

### Backend API
```
PORT=4000
DATABASE_URL=postgresql://user:pass@localhost:5432/jacameno
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
S3_BUCKET_NAME=jacameno-music
```

### AI Microservices
```
OPENAI_API_KEY=your-key
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
DATABASE_URL=postgresql://user:pass@localhost:5432/jacameno
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - See LICENSE file for details

## 🆘 Support

- Documentation: `/docs`
- Issues: GitHub Issues
- Discussions: GitHub Discussions

## 🎯 Roadmap

- [x] Initial project scaffolding
- [x] Web portal with Studio Mode
- [x] Backend API with GraphQL
- [x] AI microservices foundation
- [x] Mobile app structure
- [ ] Database schema implementation
- [ ] Authentication system
- [ ] AWS S3 integration
- [ ] Real VST plugin support
- [ ] Production audio processing
- [ ] Video editing integration
- [ ] Streaming service implementation
- [ ] Payment processing
- [ ] Mobile app completion
- [ ] Beta testing
- [ ] Production launch

---

**Built with ❤️ by the JACAMENO team**
