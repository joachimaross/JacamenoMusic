# JACAMENO Deployment Guide

This guide covers deployment strategies for all JACAMENO platform components.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Configuration](#environment-configuration)
3. [Web Application Deployment](#web-application-deployment)
4. [Backend API Deployment](#backend-api-deployment)
5. [AI Microservices Deployment](#ai-microservices-deployment)
6. [Mobile App Deployment](#mobile-app-deployment)
7. [Database Setup](#database-setup)
8. [CDN and Storage](#cdn-and-storage)
9. [Monitoring and Logging](#monitoring-and-logging)
10. [Scaling Strategy](#scaling-strategy)

## Prerequisites

- Node.js >= 18.0.0
- Python >= 3.9
- PostgreSQL >= 14
- Redis >= 6
- AWS account (or alternative cloud provider)
- Domain name with SSL certificate

## Environment Configuration

### Production Environment Variables

Create a `.env.production` file for each service:

**Web Application**
```env
NEXT_PUBLIC_API_URL=https://api.jacameno.com
NEXT_PUBLIC_WS_URL=wss://api.jacameno.com
NEXT_PUBLIC_AI_SERVICE_URL=https://ai.jacameno.com
NEXT_PUBLIC_FIREBASE_API_KEY=your-production-key
NODE_ENV=production
```

**Backend API**
```env
NODE_ENV=production
PORT=4000
DATABASE_URL=postgresql://user:pass@prod-db.amazonaws.com:5432/jacameno
REDIS_URL=redis://prod-redis.amazonaws.com:6379
JWT_SECRET=your-production-secret
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
CORS_ORIGIN=https://jacameno.com,https://www.jacameno.com
```

**AI Microservices**
```env
ENVIRONMENT=production
DATABASE_URL=postgresql://user:pass@prod-db.amazonaws.com:5432/jacameno
OPENAI_API_KEY=your-production-key
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
```

## Web Application Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd apps/web
   vercel --prod
   ```

4. **Configure Environment Variables**
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add all required variables

### Option 2: AWS Amplify

1. **Install Amplify CLI**
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   ```

2. **Initialize Amplify**
   ```bash
   cd apps/web
   amplify init
   ```

3. **Deploy**
   ```bash
   amplify publish
   ```

### Option 3: Docker + AWS ECS

**Dockerfile** (`apps/web/Dockerfile`):
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

**Build and Push**:
```bash
docker build -t jacameno-web .
docker tag jacameno-web:latest your-ecr-repo/jacameno-web:latest
docker push your-ecr-repo/jacameno-web:latest
```

## Backend API Deployment

### Option 1: AWS EC2

1. **Launch EC2 Instance**
   - AMI: Ubuntu 22.04 LTS
   - Instance Type: t3.medium (minimum)
   - Security Group: Allow ports 4000, 22, 443

2. **SSH into Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

3. **Install Dependencies**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo apt-get install -y nginx
   ```

4. **Clone and Setup**
   ```bash
   git clone https://github.com/joachimaross/JacamenoMusic.git
   cd JacamenoMusic/services/api
   npm install
   npm run build
   ```

5. **Configure PM2**
   ```bash
   sudo npm install -g pm2
   pm2 start dist/index.js --name jacameno-api
   pm2 startup
   pm2 save
   ```

6. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name api.jacameno.com;

       location / {
           proxy_pass http://localhost:4000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d api.jacameno.com
   ```

### Option 2: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Create App**
   ```bash
   cd services/api
   heroku create jacameno-api
   ```

3. **Add PostgreSQL and Redis**
   ```bash
   heroku addons:create heroku-postgresql:standard-0
   heroku addons:create heroku-redis:premium-0
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### Option 3: Docker + AWS ECS

**Dockerfile** (`services/api/Dockerfile`):
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 4000
CMD ["node", "dist/index.js"]
```

## AI Microservices Deployment

### Option 1: AWS Lambda + API Gateway

1. **Install Serverless Framework**
   ```bash
   npm install -g serverless
   ```

2. **Create `serverless.yml`**
   ```yaml
   service: jacameno-ai

   provider:
     name: aws
     runtime: python3.9
     region: us-east-1

   functions:
     ai-service:
       handler: main.handler
       events:
         - http:
             path: /{proxy+}
             method: ANY
   ```

3. **Deploy**
   ```bash
   cd services/ai-microservices
   serverless deploy
   ```

### Option 2: Google Cloud Run

1. **Create `Dockerfile`**
   ```dockerfile
   FROM python:3.9-slim

   WORKDIR /app
   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt

   COPY . .

   CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
   ```

2. **Build and Deploy**
   ```bash
   gcloud builds submit --tag gcr.io/your-project/jacameno-ai
   gcloud run deploy jacameno-ai \
     --image gcr.io/your-project/jacameno-ai \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

### Option 3: AWS EC2 with GPU

For production AI workloads with GPU:

1. **Launch GPU Instance**
   - Instance Type: g4dn.xlarge or higher
   - AMI: Deep Learning AMI (Ubuntu)

2. **Setup**
   ```bash
   ssh -i your-key.pem ubuntu@your-gpu-instance
   cd /home/ubuntu
   git clone https://github.com/joachimaross/JacamenoMusic.git
   cd JacamenoMusic/services/ai-microservices
   pip install -r requirements.txt
   ```

3. **Run with Gunicorn**
   ```bash
   gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
   ```

## Mobile App Deployment

### iOS

1. **Install Expo EAS CLI**
   ```bash
   npm install -g eas-cli
   eas login
   ```

2. **Configure EAS**
   ```bash
   cd apps/mobile
   eas build:configure
   ```

3. **Build iOS App**
   ```bash
   eas build --platform ios
   ```

4. **Submit to App Store**
   ```bash
   eas submit --platform ios
   ```

### Android

1. **Build Android App**
   ```bash
   eas build --platform android
   ```

2. **Submit to Google Play**
   ```bash
   eas submit --platform android
   ```

## Database Setup

### PostgreSQL on AWS RDS

1. **Create RDS Instance**
   ```bash
   aws rds create-db-instance \
     --db-instance-identifier jacameno-db \
     --db-instance-class db.t3.medium \
     --engine postgres \
     --master-username admin \
     --master-user-password YourSecurePassword \
     --allocated-storage 100
   ```

2. **Run Migrations**
   ```bash
   # Use your preferred migration tool (Sequelize, TypeORM, etc.)
   npm run migrate
   ```

### Redis on AWS ElastiCache

1. **Create Redis Cluster**
   ```bash
   aws elasticache create-cache-cluster \
     --cache-cluster-id jacameno-redis \
     --cache-node-type cache.t3.medium \
     --engine redis \
     --num-cache-nodes 1
   ```

## CDN and Storage

### AWS S3 Setup

1. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://jacameno-music
   ```

2. **Configure CORS**
   ```json
   {
     "CORSRules": [{
       "AllowedOrigins": ["https://jacameno.com"],
       "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
       "AllowedHeaders": ["*"]
     }]
   }
   ```

3. **Enable CloudFront CDN**
   ```bash
   aws cloudfront create-distribution \
     --origin-domain-name jacameno-music.s3.amazonaws.com
   ```

## Monitoring and Logging

### Application Monitoring

1. **Sentry for Error Tracking**
   ```bash
   npm install @sentry/nextjs @sentry/node
   ```

2. **Configure Sentry**
   ```javascript
   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     environment: 'production'
   })
   ```

### Performance Monitoring

1. **New Relic**
   ```bash
   npm install newrelic
   ```

2. **DataDog**
   ```bash
   npm install dd-trace
   ```

### Log Aggregation

**CloudWatch Logs** (AWS):
```bash
aws logs create-log-group --log-group-name /jacameno/api
aws logs create-log-stream --log-group-name /jacameno/api --log-stream-name production
```

## Scaling Strategy

### Horizontal Scaling

1. **Auto Scaling Group (AWS)**
   ```bash
   aws autoscaling create-auto-scaling-group \
     --auto-scaling-group-name jacameno-api-asg \
     --launch-configuration-name jacameno-api-lc \
     --min-size 2 \
     --max-size 10 \
     --desired-capacity 2 \
     --target-group-arns arn:aws:elasticloadbalancing:...
   ```

2. **Load Balancer**
   ```bash
   aws elbv2 create-load-balancer \
     --name jacameno-alb \
     --subnets subnet-xxx subnet-yyy \
     --security-groups sg-xxx
   ```

### Database Scaling

1. **Read Replicas**
   ```bash
   aws rds create-db-instance-read-replica \
     --db-instance-identifier jacameno-db-replica \
     --source-db-instance-identifier jacameno-db
   ```

2. **Connection Pooling**
   ```javascript
   const pool = new Pool({
     max: 20,
     idleTimeoutMillis: 30000,
     connectionTimeoutMillis: 2000
   })
   ```

## CI/CD Pipeline

### GitHub Actions

**`.github/workflows/deploy.yml`**:
```yaml
name: Deploy Production

on:
  push:
    branches: [main]

jobs:
  deploy-web:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build --workspace=apps/web
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'

  deploy-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to EC2
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ubuntu
          key: ${{ secrets.EC2_KEY }}
          script: |
            cd JacamenoMusic
            git pull
            cd services/api
            npm install
            npm run build
            pm2 restart jacameno-api
```

## Rollback Strategy

1. **Keep Previous Version**
   ```bash
   pm2 save
   cp -r dist dist.backup
   ```

2. **Quick Rollback**
   ```bash
   pm2 stop jacameno-api
   rm -rf dist
   mv dist.backup dist
   pm2 start jacameno-api
   ```

## Security Checklist

- [ ] Enable HTTPS/SSL certificates
- [ ] Configure firewall rules
- [ ] Use secrets manager (AWS Secrets Manager, etc.)
- [ ] Enable database encryption at rest
- [ ] Implement rate limiting
- [ ] Setup WAF (Web Application Firewall)
- [ ] Regular security audits
- [ ] Keep dependencies updated
- [ ] Enable 2FA for admin access
- [ ] Implement CORS properly

## Performance Optimization

1. **Enable Caching**
   - Redis for API responses
   - CDN for static assets
   - Browser caching headers

2. **Database Optimization**
   - Create proper indexes
   - Use connection pooling
   - Enable query caching

3. **Code Optimization**
   - Minify and compress assets
   - Lazy load components
   - Use code splitting

## Backup Strategy

1. **Database Backups**
   ```bash
   # Automated daily backups
   aws rds modify-db-instance \
     --db-instance-identifier jacameno-db \
     --backup-retention-period 7
   ```

2. **S3 Versioning**
   ```bash
   aws s3api put-bucket-versioning \
     --bucket jacameno-music \
     --versioning-configuration Status=Enabled
   ```

## Support and Troubleshooting

For deployment issues:
- Check logs: `pm2 logs` or CloudWatch
- Monitor metrics: CPU, memory, disk usage
- Review error tracking: Sentry dashboard
- Check health endpoints: `/health`

## Additional Resources

- [AWS Best Practices](https://aws.amazon.com/architecture/well-architected/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
