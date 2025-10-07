#!/bin/bash

# JACAMENO Quick Start Script
# This script helps set up the development environment

echo "🎵 JACAMENO Music Platform - Quick Start"
echo "========================================"
echo ""

# Check Node.js version
echo "Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js >= 18.0.0"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be >= 18.0.0. Current version: $(node -v)"
    exit 1
fi
echo "✅ Node.js $(node -v) detected"

# Check npm version
echo "Checking npm version..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi
echo "✅ npm $(npm -v) detected"

# Check Python version (optional for AI services)
echo "Checking Python version..."
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo "✅ $PYTHON_VERSION detected"
else
    echo "⚠️  Python 3 not found. AI microservices will not be available."
fi

echo ""
echo "Setting up project..."
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"
echo ""

# Create environment files
echo "🔧 Setting up environment variables..."

if [ ! -f apps/web/.env.local ]; then
    echo "Creating apps/web/.env.local from template..."
    cp apps/web/.env.example apps/web/.env.local
    echo "✅ Created apps/web/.env.local"
else
    echo "⚠️  apps/web/.env.local already exists, skipping..."
fi

if [ ! -f services/api/.env ]; then
    echo "Creating services/api/.env from template..."
    cp services/api/.env.example services/api/.env
    echo "✅ Created services/api/.env"
else
    echo "⚠️  services/api/.env already exists, skipping..."
fi

echo ""
echo "🐳 Docker services..."
echo "To start PostgreSQL, Redis, and MinIO:"
echo "  docker-compose up -d"
echo ""

echo "✅ Setup complete!"
echo ""
echo "🚀 Quick Start Commands:"
echo "========================"
echo ""
echo "Start Web Application:"
echo "  npm run dev"
echo "  Then visit: http://localhost:3000"
echo ""
echo "Start Mobile Application:"
echo "  npm run dev:mobile"
echo ""
echo "Start Backend API:"
echo "  npm run dev:api"
echo "  Then visit: http://localhost:4000"
echo ""
echo "Start AI Microservices:"
echo "  cd services/ai-microservices"
echo "  pip install -r requirements.txt"
echo "  python main.py"
echo "  Then visit: http://localhost:8000"
echo ""
echo "Start all Docker services:"
echo "  docker-compose up -d"
echo ""
echo "📚 Documentation: ./docs/README.md"
echo "🤝 Contributing: ./CONTRIBUTING.md"
echo ""
echo "Happy coding! 🎵"
