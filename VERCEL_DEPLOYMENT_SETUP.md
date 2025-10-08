# Vercel Deployment Setup - Summary

This document summarizes the changes made to enable automated Vercel deployment for the JacamenoMusic monorepo.

## Changes Made

### 1. Added `vercel.json` Configuration File

Created a `vercel.json` file at the repository root with the following configuration:

```json
{
  "buildCommand": "cd apps/web && npm run build",
  "outputDirectory": "apps/web/.next",
  "devCommand": "cd apps/web && npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "git": {
    "deploymentEnabled": {
      "main": true
    }
  }
}
```

This configuration:
- Tells Vercel to install dependencies from the root (which includes all workspace packages)
- Navigates to `apps/web` and builds the Next.js application
- Specifies the output directory as `apps/web/.next`
- Enables automatic deployments from the `main` branch

### 2. Updated `docs/deployment.md`

Completely rewrote the Vercel deployment section with:

#### Deployment via Vercel Dashboard (Recommended)
- Step-by-step instructions for connecting the GitHub repository
- Clear guidance on project settings (Framework, Root Directory, Build Commands)
- Environment variable configuration instructions
- Explanation of automatic deployments and preview deployments

#### Deployment via Vercel CLI (Optional)
- Installation and login instructions
- Project linking steps (first-time setup)
- Commands for preview and production deployments
- CLI-based environment variable configuration

#### Monorepo Configuration Section
- Detailed explanation of the `vercel.json` configuration
- How the monorepo structure is handled
- Verification steps after deployment

### 3. Updated `.gitignore`

Added `package-lock.json` to `.gitignore` to prevent it from being tracked in the repository (consistent with the existing setup).

## How to Deploy

### Option 1: Vercel Dashboard (Easiest)

1. Go to https://vercel.com/dashboard
2. Click "Add New Project"
3. Import the `joachimaross/JacamenoMusic` repository from GitHub
4. Vercel will auto-detect the `vercel.json` configuration
5. Add environment variables in Project Settings
6. Click "Deploy"

That's it! Vercel will automatically deploy on every push to `main` and create preview deployments for pull requests.

### Option 2: Vercel CLI (For Local Testing)

1. Install: `npm install -g vercel`
2. Login: `vercel login`
3. Link project: `vercel link` (from repository root)
4. Deploy preview: `vercel` (from repository root)
5. Deploy production: `vercel --prod` (from repository root)

## Verification

The Next.js app in `apps/web` already has all necessary scripts:
- ✅ `dev`: `next dev` - Development server
- ✅ `build`: `next build` - Production build
- ✅ `start`: `next start` - Production server

No additional dependencies or scripts needed!

## Environment Variables to Configure

When setting up in Vercel, add these environment variables:

```
NEXT_PUBLIC_API_URL=https://api.jacameno.com
NEXT_PUBLIC_WS_URL=wss://api.jacameno.com
NEXT_PUBLIC_AI_SERVICE_URL=https://ai.jacameno.com
```

## Next Steps

1. Connect the repository to Vercel (if not already done)
2. Configure environment variables
3. Deploy and test
4. Set up custom domain (optional)
5. Configure automatic deployments from GitHub

## Documentation

Full deployment instructions are available in `docs/deployment.md`.
