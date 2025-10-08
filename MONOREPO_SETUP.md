# JACAMENO Monorepo Setup Guide

This document provides a comprehensive overview of the JACAMENO monorepo structure, build system, and best practices.

## 📦 Monorepo Architecture

JACAMENO uses **Yarn Workspaces** for monorepo management, enabling:
- Shared dependencies across packages
- Efficient package linking
- Unified build and test commands
- Independent versioning

## 🗂️ Directory Structure

```
jacameno-music/
├── apps/                          # Frontend Applications
│   ├── web/                       # Next.js 14 web portal
│   │   ├── src/
│   │   ├── package.json
│   │   └── next.config.js
│   └── mobile/                    # React Native + Expo
│       ├── App.tsx
│       ├── app.json
│       └── package.json
│
├── services/                      # Backend Services
│   ├── api/                       # Node.js + Express + GraphQL
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── graphql/
│   │   │   └── socket/
│   │   └── package.json
│   └── ai-microservices/          # Python + FastAPI
│       ├── main.py
│       └── requirements.txt
│
├── packages/                      # Shared Packages
│   ├── shared/                    # Shared types and utilities
│   │   ├── src/index.ts
│   │   └── package.json
│   ├── vst-interface/             # VST plugin interface
│   │   ├── src/index.ts
│   │   └── package.json
│   ├── audio-processing/          # Audio utilities
│   │   ├── src/index.ts
│   │   └── package.json
│   └── payment/                   # Payment SDK
│       ├── src/index.ts
│       └── package.json
│
├── infra/                         # Infrastructure
│   ├── db/                        # Database
│   │   ├── schema.prisma
│   │   └── README.md
│   ├── aws-s3/                    # S3 integration
│   │   ├── s3.ts
│   │   └── README.md
│   └── video-editing/             # Video editing
│       ├── index.js
│       └── package.json
│
├── marketplace/                   # Marketplace module
│   ├── index.js
│   └── package.json
│
├── docs/                          # Documentation
│
├── .github/                       # CI/CD
│   └── workflows/
│       ├── ci.yml
│       ├── pr-quality-checks.yml
│       └── vercel-build-test.yml
│
├── package.json                   # Root workspace config
├── tsconfig.base.json             # Base TypeScript config
├── yarn.lock                      # Locked dependencies
└── docker-compose.yml             # Local services
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- Yarn >= 1.22.0
- Python >= 3.9 (for AI services)
- PostgreSQL >= 14
- Redis >= 6

### Installation

```bash
# Clone repository
git clone https://github.com/joachimaross/JacamenoMusic.git
cd JacamenoMusic

# Install all dependencies
yarn install

# Setup environment files
cp apps/web/.env.example apps/web/.env.local
cp services/api/.env.example services/api/.env
```

### Development

```bash
# Start all services
yarn dev                  # Web app (port 3000)
yarn dev:mobile          # Mobile app
yarn dev:api            # API server (port 4000)

# AI services (separate terminal)
cd services/ai-microservices
pip install -r requirements.txt
python main.py          # AI services (port 8000)

# Database services
docker-compose up -d    # PostgreSQL, Redis
```

## 📦 Package Management

### Workspace Commands

```bash
# Install dependencies for all workspaces
yarn install

# Add dependency to specific workspace
yarn workspace @jacameno/web add package-name
yarn workspace @jacameno/api add -D package-name

# Run script in specific workspace
yarn workspace @jacameno/web build
yarn workspace @jacameno/api test

# Run script in all workspaces
yarn workspaces run build
yarn workspaces run test
yarn workspaces run lint
```

### Package Naming Convention

All packages use the `@jacameno/` scope:
- `@jacameno/web` - Web application
- `@jacameno/mobile` - Mobile application
- `@jacameno/api` - Backend API
- `@jacameno/shared` - Shared utilities
- `@jacameno/vst-interface` - VST interface
- `@jacameno/audio-processing` - Audio processing
- `@jacameno/payment` - Payment SDK

## 🔧 Building

### TypeScript Packages

```bash
# Build all TypeScript packages
cd packages/shared && yarn build
cd packages/vst-interface && yarn build
cd packages/audio-processing && yarn build
cd packages/payment && yarn build

# Or build all
yarn workspaces run build
```

### Web Application

```bash
cd apps/web
yarn build
yarn start  # Production server
```

### API Service

```bash
cd services/api
yarn build
yarn start  # Production server
```

## 📚 Package Descriptions

### apps/web
Next.js 14 web portal with:
- Studio interface with DAW controls
- Streaming platform
- User authentication
- Real-time collaboration UI
- VST plugin management UI

### apps/mobile
React Native + Expo mobile app with:
- Cross-platform (iOS/Android)
- Studio mode interface
- Offline project editing
- Push notifications
- Audio playback

### services/api
Node.js backend with:
- Express REST API
- Apollo GraphQL server
- Socket.io WebSocket server
- Authentication middleware
- Database integration

### services/ai-microservices
Python FastAPI service with:
- Lyrics generation (GPT integration)
- Vocal analysis (audio processing)
- AI mixing suggestions
- Mastering optimization
- VST plugin recommendations

### packages/shared
Shared TypeScript types:
- Project, Track, User interfaces
- VST plugin types
- API response types
- WebSocket event types
- Utility functions

### packages/vst-interface
VST plugin management:
- VST2/VST3 plugin loader interface
- Parameter management
- Preset handling
- Audio processing pipeline
- Plugin discovery

### packages/audio-processing
Audio utilities:
- Normalization
- Fade in/out
- Audio mixing
- Waveform generation
- Frequency analysis
- Tempo detection
- Key detection

### packages/payment
Payment processing:
- Stripe integration
- PayPal integration
- Subscription management
- Payment method handling
- Invoice generation
- Predefined subscription plans (Free, Pro, Studio)

### infra/db
Database schema:
- Prisma schema definition
- User and project models
- VST plugin catalog
- Payment and subscription models
- Marketplace models
- Migration scripts

### infra/aws-s3
S3 file storage:
- Upload/download operations
- Signed URL generation
- File metadata management
- Directory organization
- Multipart uploads

### infra/video-editing
Video editing:
- FFmpeg integration
- Timeline-based editing
- Audio visualizers
- Video format conversion
- Watermark support
- Music video generation

### marketplace
Marketplace and tutorials:
- Item management (presets, samples, templates)
- Purchase processing
- Tutorial platform
- Review system
- Search and filtering

## 🔨 Build System

### TypeScript Configuration

The monorepo uses a base TypeScript configuration in `tsconfig.base.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true
  }
}
```

Each package extends this with:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

### Build Order

1. **packages/shared** - Must build first (dependencies)
2. **packages/vst-interface** - Depends on shared
3. **packages/audio-processing** - Depends on shared
4. **packages/payment** - Depends on shared
5. **services/api** - Depends on packages
6. **apps/web** - Depends on packages

## 🧪 Testing

```bash
# Run all tests
yarn test

# Test specific workspace
yarn workspace @jacameno/web test
yarn workspace @jacameno/api test

# Watch mode
yarn workspace @jacameno/api test --watch
```

## 🔍 Linting

```bash
# Lint all workspaces
yarn lint

# Lint specific workspace
yarn workspace @jacameno/web lint

# Auto-fix issues
yarn workspace @jacameno/web lint --fix
```

## 🐳 Docker Support

```bash
# Start infrastructure services
docker-compose up -d

# Services include:
# - PostgreSQL (port 5432)
# - Redis (port 6379)
# - MinIO (S3-compatible storage, port 9000)
```

## 📝 Scripts Reference

### Root Scripts

```json
{
  "dev": "yarn workspace @jacameno/web dev",
  "dev:mobile": "yarn workspace @jacameno/mobile dev",
  "dev:api": "yarn workspace @jacameno/api dev",
  "build": "yarn workspaces run build",
  "test": "yarn workspaces run test",
  "lint": "yarn workspaces run lint",
  "clean": "yarn workspaces run clean && rm -rf node_modules"
}
```

## 🔐 Environment Variables

### apps/web (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_WS_URL=ws://localhost:4000
NEXT_PUBLIC_AI_SERVICE_URL=http://localhost:8000
```

### services/api (.env)
```env
PORT=4000
DATABASE_URL=postgresql://user:password@localhost:5432/jacameno
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_S3_BUCKET=jacameno-music
```

## 🚢 Deployment

### Web Application
- **Vercel** (recommended): Automatic deployments
- **Netlify**: Alternative static hosting
- **AWS S3 + CloudFront**: Custom CDN setup

### API Service
- **AWS EC2**: Traditional server deployment
- **Heroku**: Quick deployment
- **DigitalOcean**: Droplet deployment
- **Docker**: Containerized deployment

### AI Microservices
- **AWS Lambda**: Serverless deployment
- **Google Cloud Run**: Container-based
- **AWS EC2**: Dedicated server

### Mobile App
- **Expo EAS**: Build and submit to stores
- **App Store**: iOS distribution
- **Google Play**: Android distribution

## 🛠️ Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make Changes**
   - Edit code in appropriate workspace
   - Follow existing code style
   - Add tests for new features

3. **Test Locally**
   ```bash
   yarn test
   yarn lint
   yarn build
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/my-feature
   ```

## 📊 CI/CD Pipeline

### GitHub Actions Workflows

1. **ci.yml** - Main CI pipeline
   - Runs on push/PR
   - Tests all workspaces
   - Builds TypeScript packages
   - Runs linters

2. **pr-quality-checks.yml** - PR validation
   - Checks code quality
   - Validates commit messages
   - Ensures tests pass

3. **vercel-build-test.yml** - Vercel deployment
   - Builds Next.js app
   - Deploys to Vercel
   - Creates preview URLs

## 🎯 Best Practices

### Code Organization
- Keep packages focused and independent
- Share common code via `packages/shared`
- Use TypeScript for type safety
- Follow consistent naming conventions

### Dependency Management
- Pin versions in package.json
- Use workspaces for internal dependencies
- Keep dependencies up to date
- Minimize external dependencies

### Git Workflow
- Use conventional commits
- Create feature branches
- Keep PRs focused and small
- Write descriptive commit messages

### Testing
- Write unit tests for utilities
- Add integration tests for APIs
- Use E2E tests for critical flows
- Maintain test coverage > 80%

## 🔄 Updating Dependencies

```bash
# Check for updates
yarn outdated

# Update specific package
yarn upgrade package-name

# Update all packages (careful!)
yarn upgrade --latest

# Update workspace-specific
yarn workspace @jacameno/web upgrade package-name
```

## 🐛 Troubleshooting

### Build Issues
```bash
# Clean and rebuild
yarn clean
rm -rf node_modules yarn.lock
yarn install
yarn build
```

### Workspace Issues
```bash
# Clear Yarn cache
yarn cache clean

# Reinstall dependencies
rm -rf node_modules
yarn install
```

### TypeScript Issues
```bash
# Rebuild TypeScript packages
cd packages/shared && yarn build
cd packages/vst-interface && yarn build
cd packages/audio-processing && yarn build
cd packages/payment && yarn build
```

## 📖 Additional Resources

- [Yarn Workspaces Documentation](https://classic.yarnpkg.com/en/docs/workspaces/)
- [Monorepo Best Practices](https://monorepo.tools/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Expo Documentation](https://docs.expo.dev/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Prisma Documentation](https://www.prisma.io/docs)

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed contribution guidelines.

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

---

**Last Updated**: 2024
**Maintainer**: JACAMENO Team
