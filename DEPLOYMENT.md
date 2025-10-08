# JACAMENO - Vercel Deployment Guide

This guide provides step-by-step instructions for deploying the JACAMENO Next.js web application (`apps/web`) to Vercel.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Vercel Setup](#vercel-setup)
- [Deployment Methods](#deployment-methods)
  - [Method 1: Vercel CLI (Recommended)](#method-1-vercel-cli-recommended)
  - [Method 2: Vercel Dashboard (Git Integration)](#method-2-vercel-dashboard-git-integration)
- [Environment Variables](#environment-variables)
- [Preview Deployments](#preview-deployments)
- [Troubleshooting](#troubleshooting)
- [Local Development](#local-development)
- [CI/CD Integration](#cicd-integration)

## Overview

The JACAMENO web application is a Next.js application located in the `apps/web` directory. This guide focuses on deploying this application to Vercel, which provides optimal support for Next.js applications.

## Prerequisites

Before deploying, ensure you have:

- **Node.js** >= 18.0.0
- **Yarn** >= 1.22.0 (or npm >= 9.0.0)
- **Git** installed and repository cloned
- **Vercel account** (free or paid) - [Sign up here](https://vercel.com/signup)
- Access to required environment variables (API keys, database URLs, etc.)

## Vercel Setup

### Install Vercel CLI

```bash
# Install globally using npm
npm install -g vercel

# Or using yarn
yarn global add vercel
```

### Login to Vercel

```bash
vercel login
```

This will open a browser window for authentication. Follow the prompts to log in.

## Deployment Methods

### Method 1: Vercel CLI (Recommended)

#### Production Deployment

1. **Navigate to the web app directory:**
   ```bash
   cd apps/web
   ```

2. **Deploy to production:**
   ```bash
   vercel --prod
   ```

3. **Follow the prompts:**
   - Set up and deploy: `Y`
   - Which scope: Select your account/team
   - Link to existing project: `N` (first time) or `Y` (subsequent)
   - Project name: `jacameno-web` (or your preferred name)
   - Directory: `./` (should be apps/web)
   - Override settings: `N` (unless you need custom configuration)

4. **Your application is now deployed!** The CLI will provide:
   - Production URL: `https://your-project.vercel.app`
   - Deployment URL: Unique URL for this specific deployment

#### Preview Deployment

For testing changes before production:

```bash
cd apps/web
vercel
```

This creates a preview deployment with a unique URL that you can share with your team for testing.

### Method 2: Vercel Dashboard (Git Integration)

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

2. **Click "Add New" → "Project"**

3. **Import your Git repository:**
   - Connect your GitHub/GitLab/Bitbucket account
   - Select the `JacamenoMusic` repository

4. **Configure the project:**
   - **Framework Preset:** Next.js
   - **Root Directory:** `apps/web`
   - **Build Command:** `yarn build` or `npm run build`
   - **Output Directory:** `.next` (default for Next.js)
   - **Install Command:** `yarn install` or `npm install`

5. **Add Environment Variables** (see section below)

6. **Click "Deploy"**

## Environment Variables

Configure the following environment variables in Vercel Dashboard → Project → Settings → Environment Variables:

### Required Variables

```env
# API Endpoints
NEXT_PUBLIC_API_URL=https://api.jacameno.com
NEXT_PUBLIC_WS_URL=wss://api.jacameno.com
NEXT_PUBLIC_AI_SERVICE_URL=https://ai.jacameno.com

# Environment
NODE_ENV=production
```

### Optional Variables

```env
# Analytics
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id

# Feature Flags
NEXT_PUBLIC_ENABLE_FEATURE_X=true
```

### Setting Environment Variables via CLI

```bash
# Set a variable for production
vercel env add NEXT_PUBLIC_API_URL production

# Set a variable for all environments
vercel env add NEXT_PUBLIC_API_URL
```

## Preview Deployments

Vercel automatically creates preview deployments for:
- Every push to non-production branches
- Every pull request

### Using Vercel CLI for Preview Deployments

```bash
# Create a preview deployment
cd apps/web
vercel

# Create a preview with custom alias
vercel --name my-feature-test

# List all deployments
vercel ls

# Get deployment details
vercel inspect <deployment-url>
```

### Debugging Preview Deployments

1. **Check build logs:**
   ```bash
   vercel logs <deployment-url>
   ```

2. **View deployment details:**
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on the specific deployment
   - View build logs, runtime logs, and deployment details

3. **Test locally with production build:**
   ```bash
   cd apps/web
   yarn build
   yarn start
   ```

## Troubleshooting

### Build Failures

#### Issue: "Module not found" errors

**Solution:**
1. Ensure all dependencies are in `package.json`
2. Clear Vercel build cache:
   ```bash
   vercel --force
   ```
3. Check that workspace dependencies are properly linked

#### Issue: "Build exceeded maximum duration"

**Solution:**
1. Optimize build process by removing unnecessary dependencies
2. Consider upgrading to a Vercel Pro plan for longer build times
3. Check for infinite loops or hanging processes in build scripts

### Runtime Errors

#### Issue: Environment variables not working

**Solution:**
1. Ensure variables are prefixed with `NEXT_PUBLIC_` for client-side access
2. Redeploy after adding/updating environment variables
3. Check variable spelling in both Vercel Dashboard and code

#### Issue: API connection errors

**Solution:**
1. Verify `NEXT_PUBLIC_API_URL` is set correctly
2. Check CORS settings on your API server
3. Ensure API server is running and accessible from Vercel's network

### Performance Issues

#### Issue: Slow page loads

**Solution:**
1. Enable Next.js Image Optimization (configured by default)
2. Implement code splitting and lazy loading
3. Use Vercel Analytics to identify bottlenecks
4. Enable Edge Functions for faster response times

### Monorepo-Specific Issues

#### Issue: Vercel can't find workspace dependencies

**Solution:**
1. Ensure `vercel.json` is properly configured:
   ```json
   {
     "buildCommand": "cd ../.. && yarn install && yarn build:web",
     "installCommand": "cd ../.. && yarn install"
   }
   ```

2. Or configure in Vercel Dashboard:
   - **Install Command:** `yarn install`
   - **Build Command:** `yarn build`
   - Ensure root directory is set to `apps/web`

## Local Development

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/joachimaross/JacamenoMusic.git
   cd JacamenoMusic
   ```

2. **Install dependencies:**
   ```bash
   # Using Yarn (recommended)
   yarn install

   # Or using npm
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   # Copy example environment file
   cp apps/web/.env.example apps/web/.env.local
   
   # Edit with your local values
   nano apps/web/.env.local
   ```

4. **Start development server:**
   ```bash
   # From root directory
   yarn dev

   # Or from apps/web directory
   cd apps/web
   yarn dev
   ```

5. **Open in browser:**
   - Navigate to [http://localhost:3000](http://localhost:3000)

### Local Development Environment Variables

Create `apps/web/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_WS_URL=ws://localhost:4000
NEXT_PUBLIC_AI_SERVICE_URL=http://localhost:8000
```

### Running Production Build Locally

Test production build before deploying:

```bash
cd apps/web
yarn build
yarn start
```

This will start the production server at [http://localhost:3000](http://localhost:3000).

## CI/CD Integration

### GitHub Actions Workflow

A GitHub Actions workflow (`.github/workflows/vercel-build-test.yml`) runs automatically to verify deployment readiness:

- **Triggers:** On push to main/develop branches and pull requests
- **Steps:**
  1. Install dependencies with `yarn install`
  2. Build the web app with `yarn build:web`
  3. Run tests with `yarn test:web` (if tests exist)

### Vercel Integration with GitHub

When you connect Vercel to your GitHub repository:

1. **Automatic Deployments:**
   - Commits to `main` → Production deployment
   - Pull requests → Preview deployments
   - Other branches → Preview deployments

2. **Deployment Checks:**
   - Vercel automatically comments on PRs with preview URLs
   - Build status is reported to GitHub
   - Failed builds prevent merging (if configured)

3. **Rollback:**
   - Go to Vercel Dashboard → Deployments
   - Find a previous successful deployment
   - Click "Promote to Production"

### Manual Deployment from CI/CD

Using Vercel CLI in your CI/CD pipeline:

```yaml
- name: Deploy to Vercel
  env:
    VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
    VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
    VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
  run: |
    cd apps/web
    vercel --prod --token=$VERCEL_TOKEN
```

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Vercel GitHub Integration](https://vercel.com/docs/concepts/git/vercel-for-github)
- [JACAMENO Main Documentation](./docs/deployment.md) - Full platform deployment guide

## Support

For issues or questions:
- **GitHub Issues:** [Create an issue](https://github.com/joachimaross/JacamenoMusic/issues)
- **Vercel Support:** [Vercel Help](https://vercel.com/help)
- **Team Contact:** See repository README

---

**Last Updated:** 2024
**Maintained by:** JACAMENO Team
