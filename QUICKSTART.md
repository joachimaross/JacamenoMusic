# 🚀 Quick Start Guide

Get JACAMENO running locally in under 5 minutes!

## Prerequisites

- ✅ Node.js 18+ installed
- ✅ Yarn 1.22+ installed  
- ✅ Git installed

Optional (for full stack):
- Python 3.9+ (for AI services)
- Docker (for databases)

## Installation

### 1. Clone and Install

```bash
# Clone repository
git clone https://github.com/joachimaross/JacamenoMusic.git
cd JacamenoMusic

# Install all dependencies (takes 1-2 minutes)
yarn install
```

### 2. Setup Environment

```bash
# Copy environment templates
cp apps/web/.env.example apps/web/.env.local
cp services/api/.env.example services/api/.env

# Optional: Start databases with Docker
docker-compose up -d
```

### 3. Start Development Servers

Open 3-4 terminal windows:

**Terminal 1: Web App**
```bash
yarn dev
# Opens at http://localhost:3000
```

**Terminal 2: Backend API**
```bash
yarn dev:api
# Opens at http://localhost:4000
# GraphQL: http://localhost:4000/graphql
```

**Terminal 3: Mobile App** (optional)
```bash
yarn dev:mobile
# Opens Expo DevTools
```

**Terminal 4: AI Services** (optional)
```bash
cd services/ai-microservices
pip install -r requirements.txt
python main.py
# Opens at http://localhost:8000
```

## 🎯 Access Points

| Service | URL | Description |
|---------|-----|-------------|
| Web Portal | http://localhost:3000 | Main web interface |
| Backend API | http://localhost:4000 | REST API |
| GraphQL | http://localhost:4000/graphql | GraphQL playground |
| AI Services | http://localhost:8000 | AI microservices |
| API Docs | http://localhost:8000/docs | FastAPI docs |

## ⚡ Quick Commands

```bash
# Development
yarn dev              # Start web app
yarn dev:api          # Start API server
yarn dev:mobile       # Start mobile app

# Building
yarn build            # Build all packages
yarn build:web        # Build web app only

# Testing
yarn test             # Run all tests
yarn test:web         # Test web app only

# Linting
yarn lint             # Lint all packages
```

## 🏗️ Project Structure

```
jacameno-music/
├── apps/
│   ├── web/          ← Next.js web app
│   └── mobile/       ← React Native app
├── services/
│   ├── api/          ← Node.js API
│   └── ai-microservices/ ← Python AI
├── packages/
│   ├── shared/       ← Shared types
│   ├── vst-interface/ ← VST plugins
│   ├── audio-processing/ ← Audio utils
│   └── payment/      ← Payment SDK
├── infra/
│   ├── db/           ← Database schema
│   ├── aws-s3/       ← S3 integration
│   └── video-editing/ ← Video editing
└── marketplace/      ← Marketplace module
```

## 🎨 Key Features to Try

1. **Studio Mode** - http://localhost:3000/studio
   - Multi-track interface
   - VST plugin management
   - Real-time collaboration

2. **AI Lyrics Generation** - POST to http://localhost:8000/api/lyrics
   ```bash
   curl -X POST http://localhost:8000/api/lyrics \
     -H "Content-Type: application/json" \
     -d '{"style": "trap", "theme": "success"}'
   ```

3. **GraphQL Queries** - http://localhost:4000/graphql
   ```graphql
   query {
     projects {
       id
       name
       tracks {
         id
         name
       }
     }
   }
   ```

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or change port
PORT=3001 yarn dev
```

### Dependencies Issues
```bash
# Clean install
rm -rf node_modules yarn.lock
yarn install
```

### Build Errors
```bash
# Clean and rebuild
yarn clean
yarn install
yarn build
```

## 📚 Next Steps

1. Read [MONOREPO_SETUP.md](./MONOREPO_SETUP.md) for detailed architecture
2. Check [docs/README.md](./docs/README.md) for full documentation
3. See [CONTRIBUTING.md](./CONTRIBUTING.md) to start contributing
4. Review [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment guides

## 💡 Tips

- Use `yarn workspace <name> <command>` to run commands in specific workspace
- Check `package.json` scripts for available commands
- Use Docker for databases: `docker-compose up -d`
- Keep dependencies updated: `yarn outdated`

## 🆘 Need Help?

- 📖 [Full Documentation](./docs)
- 🐛 [Report Issues](https://github.com/joachimaross/JacamenoMusic/issues)
- 💬 [Discussions](https://github.com/joachimaross/JacamenoMusic/discussions)

## 🎵 Happy Coding!

You're all set! Start building amazing music production features.

---

**Time to productivity**: ~5 minutes ⚡
