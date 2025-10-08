# JACAMENO Music Production Platform

> Next-generation AI music production, collaboration, and streaming ecosystem

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)
[![Python Version](https://img.shields.io/badge/python-%3E%3D3.9-blue)](https://python.org)

## 🎵 What is JACAMENO?

JACAMENO is an all-in-one music ecosystem that surpasses traditional DAWs by combining:

- **Professional DAW** with Virtual Studio Mode and AI Producer
- **AI-Powered Tools** for songwriting, mixing, mastering, and vocal coaching
- **VST Plugin Support** with AI-assisted management (VST2/VST3)
- **Real-time Collaboration** across devices and platforms
- **Streaming Service** with direct royalty payouts to artists
- **Video & Photo Editing** for album art and music videos
- **Fan-Artist Portal** for engagement and exclusive content
- **Performance Analytics** with AI-powered release strategies

## ✨ Key Features

### 🎹 Virtual Studio Mode
AI producer that guides your entire creative session with voice commands and real-time suggestions.

### 🎚️ Professional Mixing & Mastering
Multi-track mixing with AI EQ, compression, reverb, and genre-specific presets.

### ✍️ Songwriting & Vocal Coaching
AI writes lyrics, melodies, and provides real-time vocal analysis with personalized coaching.

### 🎛️ VST Plugin Support
- Load VST2/VST3 plugins directly in JACAMENO
- AI suggests plugin chains and tweaks parameters
- Save presets per project
- Export stems with applied effects or dry
- Integrated marketplace for discovering VSTs

### 🤝 Smart Collaboration
Real-time multi-user collaboration with synced stems, lyrics, voice chat, and version control.

### 📊 Performance Analytics
Track streams, fan engagement, and get AI-powered release strategies.

### 📱 Cross-Platform
Works seamlessly on web, iOS, and Android with offline creation mode.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0 or Yarn >= 1.22.0
- Python >= 3.9 (for AI services)

### Installation

```bash
# Clone the repository
git clone https://github.com/joachimaross/JacamenoMusic.git
cd JacamenoMusic

# Install dependencies
# Using Yarn (recommended for monorepo)
yarn install

# Or using npm
npm install

# Start web application
yarn dev   # or npm run dev

# Start mobile app (separate terminal)
yarn dev:mobile   # or npm run dev:mobile

# Start backend API (separate terminal)
yarn dev:api   # or npm run dev:api

# Start AI microservices (separate terminal)
cd services/ai-microservices
pip install -r requirements.txt
python main.py
```

### Access Points
- **Web Portal**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **GraphQL Playground**: http://localhost:4000/graphql
- **AI Microservices**: http://localhost:8000
- **Mobile App**: Expo DevTools

## 📁 Project Structure

```
jacameno-music/
├── apps/
│   ├── web/              # Next.js web portal
│   └── mobile/           # React Native + Expo mobile app
├── services/
│   ├── api/              # Node.js + Express backend
│   └── ai-microservices/ # Python + FastAPI AI services
├── packages/
│   ├── ui/               # Shared UI components
│   └── shared/           # Shared utilities
└── docs/                 # Documentation
```

## 🛠️ Tech Stack

- **Frontend**: Next.js, React Native, Expo, Tailwind CSS
- **Backend**: Node.js, Express, Socket.io, GraphQL
- **AI Services**: Python, FastAPI, PyTorch, Librosa
- **Database**: PostgreSQL, Redis
- **Storage**: AWS S3
- **Real-time**: Socket.io, WebRTC

## 📚 Documentation

Comprehensive documentation is available in the [docs](./docs) directory:

- [Full Documentation](./docs/README.md)
- [API Reference](./docs/api.md)
- [Architecture Guide](./docs/architecture.md)
- [Deployment Guide](./docs/deployment.md)
- [**Vercel Deployment Guide**](./DEPLOYMENT.md) - Quick guide for deploying to Vercel

## 🎯 Core Capabilities

### Audio Production
- Multi-track recording and editing
- Professional mixing console
- AI-powered mastering
- VST2/VST3 plugin support
- Genre-specific presets

### AI Features
- Lyrics generation
- Vocal coaching and analysis
- Automated mixing suggestions
- Mastering optimization
- Plugin recommendations

### Collaboration
- Real-time multi-user sessions
- Synced playback and editing
- Integrated voice/text chat
- Version control
- Project sharing

### Streaming Platform
- Native music streaming
- AI-curated playlists
- Direct royalty payouts
- Cross-platform publishing
- Analytics dashboard

## 🔌 API Endpoints

### REST API
```
GET    /health                     # Health check
POST   /api/v1/projects            # Create project
POST   /api/v1/tracks/upload       # Upload track
POST   /api/v1/ai/lyrics           # Generate lyrics
POST   /api/v1/ai/vocal-coaching   # Vocal analysis
POST   /api/v1/ai/mixing           # AI mixing
GET    /api/v1/vst/plugins         # List VST plugins
```

### GraphQL
```graphql
query {
  projects {
    id
    name
    tracks {
      id
      name
      vstChain {
        id
        name
        type
      }
    }
  }
}
```

### WebSocket Events
- `join-project` - Join collaboration session
- `track-update` - Real-time track changes
- `playback-control` - Sync playback
- `vst-loaded` - VST plugin updates

## 🧪 Testing

```bash
# Run all tests
yarn test   # or npm test

# Test specific workspace
yarn test:web   # or npm test --workspace=apps/web
yarn workspace @jacameno/api test   # or npm test --workspace=services/api
```

## 📦 Building

```bash
# Build all projects
yarn build   # or npm run build

# Build specific workspace
yarn build:web   # or npm run build --workspace=apps/web
```

## 🚀 Deployment

- **Web**: Deploy to Vercel (recommended), Netlify, or AWS
- **API**: Deploy to AWS EC2, Heroku, or DigitalOcean
- **AI Services**: Deploy to AWS Lambda or Google Cloud Run
- **Mobile**: Build with Expo EAS and submit to stores

See [Vercel Deployment Guide](./DEPLOYMENT.md) for quick Vercel deployment or [Full Deployment Guide](./docs/deployment.md) for all deployment options.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🆘 Support

- 📖 [Documentation](./docs)
- 🐛 [Issue Tracker](https://github.com/joachimaross/JacamenoMusic/issues)
- 💬 [Discussions](https://github.com/joachimaross/JacamenoMusic/discussions)

## 🎯 Roadmap

- [x] Project scaffolding and monorepo setup
- [x] Web portal with Studio Mode interface
- [x] Backend API with REST and GraphQL
- [x] AI microservices foundation
- [x] Mobile app structure
- [x] VST plugin interface
- [ ] Complete database schema
- [ ] Full authentication system
- [ ] AWS S3 integration
- [ ] Real VST plugin loading
- [ ] Production audio processing
- [ ] Video editing integration
- [ ] Payment processing
- [ ] Beta testing phase
- [ ] Production launch

## 🌟 Features Coming Soon

- Advanced audio effects processing
- Real-time vocal pitch correction
- AI-powered stem separation
- Collaborative playlist creation
- Live streaming capabilities
- Mobile-specific DAW features
- Plugin marketplace
- Educational content and tutorials

---

**Built with ❤️ for musicians, producers, and creators worldwide**

[Website](https://jacameno.com) • [Twitter](https://twitter.com/jacameno) • [Discord](https://discord.gg/jacameno)
