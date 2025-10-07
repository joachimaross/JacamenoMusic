# JACAMENO Music Studio - Deployment Guide

## Prerequisites

- Docker & Docker Compose (recommended)
- Node.js 18+ (for manual deployment)
- Python 3.11+ (for manual deployment)
- PostgreSQL 15+ (if not using Docker)
- Redis (if not using Docker)

## Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Update the `.env` file with your configuration:
   - Database credentials
   - JWT secret
   - API keys (OpenAI, Suno, Kaiber, Spotify, Apple Music, Stripe)
   - Service URLs

## Docker Deployment (Recommended)

### Development

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Services will be available at:
- Backend API: http://localhost:3000
- AI Services: http://localhost:8000
- PostgreSQL: localhost:5432
- Redis: localhost:6379

### Production

1. Update `docker-compose.yml` for production:
   - Set `NODE_ENV=production`
   - Use production database credentials
   - Add SSL certificates
   - Configure reverse proxy (nginx)

2. Build and deploy:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Manual Deployment

### Backend API

```bash
cd packages/backend

# Install dependencies
npm install

# Set environment variables
export NODE_ENV=production
export DATABASE_URL=your-database-url
export REDIS_URL=your-redis-url
export JWT_SECRET=your-secret

# Start the server
npm start
```

### AI Services

```bash
cd packages/ai-services

# Install dependencies
pip install -r requirements.txt

# Start the service
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Mobile App

#### Building for Production

**iOS:**
```bash
cd packages/mobile
expo build:ios
```

**Android:**
```bash
cd packages/mobile
expo build:android
```

**Web:**
```bash
cd packages/mobile
npm run build
```

## Database Setup

### Using Docker

The database is automatically set up when using `docker-compose up`.

### Manual Setup

1. Create database:
```sql
CREATE DATABASE jacameno;
```

2. Run migrations (when implemented):
```bash
cd packages/backend
npm run migrate
```

## SSL/TLS Configuration

For production, configure SSL certificates:

1. Obtain SSL certificates (Let's Encrypt recommended)
2. Update nginx configuration
3. Redirect HTTP to HTTPS

## Monitoring & Logging

### Docker Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f ai-services
```

### Application Logs

- Backend: Logs are output to stdout
- AI Services: Logs are output to stdout

## Scaling

### Horizontal Scaling

1. Load balance multiple backend instances
2. Use Redis for session management
3. Configure PostgreSQL for read replicas

### Vertical Scaling

- Increase container resources in `docker-compose.yml`
- Optimize database queries
- Enable caching with Redis

## Backup & Recovery

### Database Backup

```bash
# Backup
docker-compose exec db pg_dump -U postgres jacameno > backup.sql

# Restore
docker-compose exec -T db psql -U postgres jacameno < backup.sql
```

### Redis Backup

Redis automatically creates snapshots in the configured data directory.

## Health Checks

Monitor service health:

```bash
# Backend
curl http://localhost:3000/health

# AI Services
curl http://localhost:8000/health
```

## Troubleshooting

### Backend won't start

1. Check environment variables
2. Verify database connection
3. Check Redis connection
4. Review logs: `docker-compose logs backend`

### AI Services won't start

1. Check Python dependencies
2. Verify CUDA availability (if using GPU)
3. Review logs: `docker-compose logs ai-services`

### Mobile app build fails

1. Clear cache: `expo start -c`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check Expo configuration in `app.json`

## Security Considerations

1. **Never commit `.env` files**
2. **Use strong JWT secrets**
3. **Enable HTTPS in production**
4. **Regularly update dependencies**
5. **Use environment-specific configurations**
6. **Implement rate limiting**
7. **Enable CORS only for trusted domains**
8. **Sanitize user inputs**

## Performance Optimization

1. **Enable Redis caching**
2. **Use CDN for static assets**
3. **Optimize database indexes**
4. **Enable compression middleware**
5. **Implement pagination for large datasets**
6. **Use connection pooling**

## Monitoring Tools (Recommended)

- **Application Performance**: New Relic, DataDog
- **Error Tracking**: Sentry
- **Logging**: ELK Stack, CloudWatch
- **Uptime Monitoring**: Pingdom, UptimeRobot
