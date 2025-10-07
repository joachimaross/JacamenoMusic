# JACAMENO Music Studio

<div align="center">

🎵 **AI-Powered Music Studio & Streaming Platform** 🎵

*Surpassing BandLab, FL Studio, and Output with cutting-edge AI capabilities*

</div>

## 🌟 Features

### 🎹 Virtual Studio Mode
- Multi-track recording and editing
- Professional mixing console
- VST plugin support
- Real-time audio processing
- Offline creation mode

### 🤖 AI-Powered Tools
- **AI Mixing & Mastering**: Professional-grade automatic mixing and mastering
- **AI Songwriting Assistant**: Generate lyrics, melodies, and chord progressions
- **AI Vocal Coaching**: Real-time feedback on vocal performance
- **AI Music Generation**: Integrate with Suno AI for instant music creation
- **AI Video Generation**: Create music videos with Kaiber AI integration

### 🎬 Media Editing
- Video editing tools
- Photo editing capabilities
- Audio-visual synchronization

### 👥 Smart Collaboration
- Real-time collaboration sessions
- Smart collaborator matching
- In-app communication
- Permission management
- Session recording

### 🎵 Streaming Platform
- Global music distribution
- Spotify integration
- Apple Music integration
- Custom playlists
- Offline playback

### 👨‍🎤 Fan Portal
- Artist profiles
- Fan engagement tools
- Subscription tiers
- Direct monetization
- Social features

### 📊 Analytics Dashboard
- Play count tracking
- Audience demographics
- Revenue analytics
- Engagement metrics
- Collaboration insights

### 💰 Monetization
- Stripe payment integration
- Subscription management
- Revenue tracking
- Fan support features

## 🏗️ Architecture

```
JACAMENO/
├── packages/
│   ├── mobile/          # React Native cross-platform app
│   ├── backend/         # Node.js + Express API server
│   └── ai-services/     # Python AI processing services
├── docker-compose.yml   # Container orchestration
└── README.md
```

### Technology Stack

- **Frontend**: React Native (iOS, Android, Web)
- **Backend**: Node.js, Express, PostgreSQL, Redis
- **AI Services**: Python, FastAPI, PyTorch, Librosa
- **Integrations**: OpenAI, Suno, Kaiber, Spotify, Apple Music, Stripe

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- Docker & Docker Compose (recommended)
- PostgreSQL 15+ (if not using Docker)
- Redis (if not using Docker)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/joachimaross/JacamenoMusic.git
cd JacamenoMusic
```

2. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your API keys and configuration
```

3. **Using Docker (Recommended)**
```bash
docker-compose up -d
```

4. **Manual Setup**

**Backend:**
```bash
cd packages/backend
npm install
npm start
```

**AI Services:**
```bash
cd packages/ai-services
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

**Mobile App:**
```bash
cd packages/mobile
npm install
npm start
```

## 📱 Mobile App

The mobile app runs on iOS, Android, and Web using React Native and Expo.

```bash
cd packages/mobile

# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

## 🔧 API Documentation

### Backend API (Port 3000)

- **Health Check**: `GET /health`
- **Authentication**: `POST /api/auth/register`, `POST /api/auth/login`
- **Studio**: `POST /api/studio/projects`, `GET /api/studio/projects`
- **AI Tools**: `POST /api/ai/mix-master`, `POST /api/ai/songwriting`, `POST /api/ai/vocal-coach`
- **Collaboration**: `POST /api/collaboration/sessions`, `GET /api/collaboration/sessions`
- **Streaming**: `POST /api/streaming/upload`, `GET /api/streaming/search`
- **Analytics**: `GET /api/analytics/user`, `GET /api/analytics/track/:id`
- **Fan Portal**: `POST /api/fan-portal/profile`, `GET /api/fan-portal/feed`

### AI Services API (Port 8000)

- **Health Check**: `GET /health`
- **Mixing & Mastering**: `POST /api/mix-master`
- **Songwriting**: `POST /api/songwriting`
- **Vocal Coaching**: `POST /api/vocal-coach`
- **Audio Analysis**: `POST /api/analyze-audio`

## 🔑 API Keys Required

To use all features, you'll need to obtain API keys for:

1. **OpenAI** - AI text generation and processing
2. **Suno** - AI music generation
3. **Kaiber** - AI video generation
4. **Spotify** - Music streaming integration
5. **Apple Music** - Music streaming integration
6. **Stripe** - Payment processing

Add these to your `.env` file.

## 🧪 Testing

```bash
# Backend tests
cd packages/backend
npm test

# AI services tests
cd packages/ai-services
pytest
```

## 🐳 Docker Deployment

```bash
# Build and run all services
docker-compose up --build

# Stop all services
docker-compose down

# View logs
docker-compose logs -f
```

## 📊 Memory-Based Personalization

JACAMENO uses Redis for memory-based personalization:
- User preferences and settings
- Recently used projects
- Collaboration history
- Listening patterns
- AI model fine-tuning data

## 🌐 Cross-Platform Support

- **iOS**: Native iOS app via React Native
- **Android**: Native Android app via React Native
- **Web**: Progressive Web App via React Native Web
- **Desktop**: Electron wrapper (coming soon)

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for details.

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- OpenAI for GPT integration
- Suno for music generation
- Kaiber for video generation
- Spotify and Apple Music for streaming APIs
- The open-source community

## 📧 Support

For support, email support@jacameno.com or open an issue on GitHub.

---

**Built with ❤️ for music creators worldwide** 
