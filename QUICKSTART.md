# Quick Start Guide

Get JACAMENO up and running in 5 minutes!

## Prerequisites

Choose one of the following options:

### Option 1: Docker (Easiest) ✅ Recommended
- Docker Desktop installed
- 4GB+ RAM available

### Option 2: Local Development
- Node.js 18+
- Python 3.11+
- PostgreSQL 15+
- Redis

## Quick Start with Docker

### Step 1: Clone the Repository
```bash
git clone https://github.com/joachimaross/JacamenoMusic.git
cd JacamenoMusic
```

### Step 2: Set Up Environment
```bash
cp .env.example .env
```

Edit `.env` and add your API keys (optional for basic testing):
```env
JWT_SECRET=your-super-secret-key-here
# Add other API keys as needed
```

### Step 3: Start All Services
```bash
docker-compose up -d
```

This will start:
- Backend API on `http://localhost:3000`
- AI Services on `http://localhost:8000`
- PostgreSQL on `localhost:5432`
- Redis on `localhost:6379`

### Step 4: Verify Services
```bash
# Check backend
curl http://localhost:3000/health

# Check AI services
curl http://localhost:8000/health
```

Expected response:
```json
{"status": "ok", "service": "JACAMENO Backend"}
```

### Step 5: Start Mobile App
```bash
cd packages/mobile
npm install
npm start
```

Open the Expo app on your phone and scan the QR code, or press:
- `i` for iOS simulator
- `a` for Android emulator
- `w` for web browser

## Quick Start without Docker

### Step 1: Clone and Setup
```bash
git clone https://github.com/joachimaross/JacamenoMusic.git
cd JacamenoMusic
cp .env.example .env
```

### Step 2: Start PostgreSQL and Redis
```bash
# Using Homebrew (macOS)
brew services start postgresql
brew services start redis

# Or using system package manager
sudo systemctl start postgresql
sudo systemctl start redis
```

### Step 3: Create Database
```bash
psql postgres
CREATE DATABASE jacameno;
\q
```

### Step 4: Start Backend
```bash
cd packages/backend
npm install
npm start
```

Backend running at `http://localhost:3000`

### Step 5: Start AI Services (in new terminal)
```bash
cd packages/ai-services
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

AI Services running at `http://localhost:8000`

### Step 6: Start Mobile App (in new terminal)
```bash
cd packages/mobile
npm install
npm start
```

## First Steps in the App

### 1. Register an Account
- Open the app
- Go to Profile tab
- Create an account with email and password

### 2. Create Your First Project
- Go to Virtual Studio tab
- Tap "Create Project"
- Enter project name and settings
- Start creating!

### 3. Try AI Features
- Go to AI Assistant tab
- Try AI Songwriting:
  - Enter a prompt like "Write a love song"
  - Select genre and mood
  - Get AI-generated lyrics and chords
- Try AI Mixing:
  - Select your tracks
  - Choose mixing preferences
  - Let AI optimize your mix

### 4. Explore Collaboration
- Go to Collaboration tab
- Create a new session
- Invite collaborators
- Work together in real-time

## Testing the API

### Register a User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "username": "testuser"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the returned JWT token for authenticated requests.

### Create a Project
```bash
curl -X POST http://localhost:3000/api/studio/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "My First Track",
    "bpm": 120,
    "key": "C"
  }'
```

### Get AI Songwriting Suggestions
```bash
curl -X POST http://localhost:8000/api/songwriting \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Summer love song",
    "genre": "pop",
    "mood": "happy"
  }'
```

## Common Issues

### Docker containers won't start
```bash
# Check Docker status
docker ps

# View logs
docker-compose logs

# Restart
docker-compose down
docker-compose up -d
```

### Port already in use
```bash
# Check what's using port 3000
lsof -i :3000
# Kill the process or change port in .env
```

### Backend can't connect to database
```bash
# Check DATABASE_URL in .env
# Ensure PostgreSQL is running
docker-compose ps

# Or for local setup
brew services list
```

### Mobile app won't connect to API
```bash
# Make sure backend is running
curl http://localhost:3000/health

# For mobile device, use your computer's IP
# Update API_URL in mobile app
```

## Next Steps

1. **Read the Documentation**
   - [API Documentation](API.md)
   - [Architecture](ARCHITECTURE.md)
   - [Deployment Guide](DEPLOYMENT.md)

2. **Explore Features**
   - Virtual Studio Mode
   - AI Tools
   - Collaboration
   - Streaming

3. **Customize**
   - Add your API keys for external services
   - Configure branding
   - Adjust settings

4. **Contribute**
   - Check [CONTRIBUTING.md](CONTRIBUTING.md)
   - Report issues
   - Submit pull requests

## Getting Help

- 📖 [Full Documentation](README.md)
- 🐛 [Report Issues](https://github.com/joachimaross/JacamenoMusic/issues)
- 💬 [Discussions](https://github.com/joachimaross/JacamenoMusic/discussions)
- 📧 Email: support@jacameno.com

## Development Tips

### Hot Reload
- Backend: Uses nodemon (auto-restarts on changes)
- AI Services: Uses uvicorn --reload (auto-restarts)
- Mobile: Expo hot reload (instant updates)

### Debugging
```bash
# Backend logs
docker-compose logs -f backend

# AI services logs
docker-compose logs -f ai-services

# Database access
docker-compose exec db psql -U postgres jacameno

# Redis CLI
docker-compose exec redis redis-cli
```

### Running Tests
```bash
# Backend tests
cd packages/backend && npm test

# AI services tests
cd packages/ai-services && pytest

# Watch mode
npm test -- --watch
pytest --watch
```

---

**🎉 Congratulations!** You're now ready to create amazing music with JACAMENO!
