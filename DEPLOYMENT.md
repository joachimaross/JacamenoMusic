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
  - [Common Deployment Issues and Prevention](#common-deployment-issues-and-prevention)
- [Local Development](#local-development)
- [CI/CD Integration](#cicd-integration)
- [Best Practices for Contributors](#best-practices-for-contributors)
- [Additional Resources](#additional-resources)
- [Support](#support)

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

### Common Deployment Issues and Prevention

This section documents recurring deployment issues and how to prevent them before they cause build failures.

#### Issue: Peer Dependency Warnings from @jacameno/mobile

**Symptom:**
```
warning "@jacameno/mobile > react-native-web@0.19.13" has unmet peer dependency "react-dom@^18.0.0"
warning "@jacameno/mobile > react-native-reanimated@3.3.0" has unmet peer dependency "@babel/plugin-proposal-nullish-coalescing-operator@^7.0.0-0"
```

**Explanation:**
- These warnings occur because `@jacameno/mobile` (React Native app) has dependencies that expect certain peer dependencies
- For web deployments (Next.js), these are **safe to ignore** as React Native mobile dependencies are not used in the web build
- The web app has its own `react-dom` in `apps/web/package.json`

**Prevention:**
- No action needed - these warnings do not affect web deployments
- Do not add mobile-specific peer dependencies to the web app
- Keep mobile and web dependencies separate in their respective `package.json` files

**Documentation:**
- These warnings are expected in a monorepo with both web and mobile apps
- Vercel builds only the web app and will not be affected by mobile peer dependencies

---

#### Issue: Workspaces Configuration Warning

**Symptom:**
```
warning Workspaces can only be enabled in private projects.
```

**Explanation:**
- Yarn workspaces require the root `package.json` to have `"private": true`
- This is already configured but removing it will cause this warning

**Prevention:**
- ✅ Root `package.json` has `"private": true` - **DO NOT REMOVE THIS**
- A CI check (`pr-quality-checks.yml`) validates this on every PR
- If you see this warning during local development, verify root `package.json` has `"private": true`

**Fix if removed:**
```json
{
  "name": "jacameno-music",
  "private": true,
  "workspaces": ["apps/*", "packages/*", "services/*"]
}
```

---

#### Issue: next.config.js - Invalid experimental.serverActions

**Symptom:**
```
⚠ Invalid next.config.js options detected: 
⚠ Expected object, received boolean at "experimental.serverActions"
⚠ Server Actions are available by default now, experimental.serverActions option can be safely removed.
```

**Explanation:**
- Next.js 13 required `experimental: { serverActions: true }` to enable Server Actions
- Next.js 14+ has Server Actions enabled by default
- The boolean config is now invalid - should be removed or changed to an object

**Prevention:**
- ✅ `next.config.js` has been updated to remove the deprecated config
- A CI check validates `next.config.js` on every PR
- Always refer to [Next.js upgrade guides](https://nextjs.org/docs/upgrading) when updating Next.js versions

**Fix if encountered:**
Remove the experimental.serverActions field entirely:
```javascript
// ❌ Old (invalid in Next.js 14+)
experimental: {
  serverActions: true,
}

// ✅ New (Server Actions enabled by default)
// Just remove the field completely
```

---

#### Issue: ESLint - Next.js Plugin Not Detected

**Symptom:**
```
⚠ The Next.js plugin was not detected in your ESLint configuration
Parsing error: Unexpected token {
```

**Explanation:**
- The Next.js ESLint plugin provides proper TypeScript and React parsing for Next.js projects
- Without it, ESLint cannot parse JSX/TSX files correctly
- This causes false "parsing error" messages during linting

**Prevention:**
- ✅ `apps/web/.eslintrc.json` now includes the Next.js ESLint configuration
- A CI check runs ESLint on every PR to catch issues early
- The configuration includes TypeScript support automatically

**Current Configuration:**
`apps/web/.eslintrc.json`:
```json
{
  "extends": ["next/core-web-vitals", "next/typescript"]
}
```

**Migration from Legacy ESLint:**
If you had a custom `.eslintrc.js` file before, the new config is simpler and recommended by Next.js.

---

#### Issue: TypeScript/JSX Parse Errors in CI

**Symptom:**
- Files like `layout.tsx`, `page.tsx`, `streaming/page.tsx`, `studio/page.tsx` fail to parse
- Errors like "Unexpected token" in TSX files

**Explanation:**
- This happens when ESLint doesn't have proper TypeScript/React parser configured
- The Next.js ESLint plugin automatically handles this

**Prevention:**
- ✅ CI workflow (`.github/workflows/pr-quality-checks.yml`) runs lint and TypeScript checks
- TypeScript compiler (`tsc --noEmit`) validates all types before deployment
- ESLint with Next.js plugin validates syntax
- Both checks must pass before code can be merged to main

**How CI Prevents This:**
1. Every PR triggers automatic lint and type checks
2. Failing checks block the PR from being merged
3. Contributors get immediate feedback on syntax errors
4. Prevents broken code from reaching production

---

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

### GitHub Actions Workflows

The repository includes multiple GitHub Actions workflows to ensure code quality and deployment readiness:

#### 1. PR Quality Checks (`.github/workflows/pr-quality-checks.yml`)

**Purpose:** Validates code quality, configuration, and prevents common deployment issues

**Triggers:** 
- Pull requests to `main` or `develop` branches
- Pushes to `main` or `develop` branches

**Checks Performed:**
1. **Workspace Configuration Validation**
   - Ensures root `package.json` has `"private": true`
   - Prevents workspace configuration issues

2. **Next.js Config Validation**
   - Checks for deprecated `experimental.serverActions` boolean
   - Ensures config is compatible with Next.js 14+

3. **ESLint Checks**
   - Runs linting on all TypeScript/TSX files
   - Catches syntax errors and code quality issues
   - Uses Next.js ESLint plugin for proper parsing

4. **TypeScript Type Checking**
   - Runs `tsc --noEmit` to validate all types
   - Catches type errors before deployment
   - No build artifacts generated (noEmit flag)

**Why This Matters:**
- Catches deployment-breaking issues early in development
- Prevents invalid configurations from reaching production
- Ensures consistent code quality across contributions
- Provides immediate feedback to contributors

#### 2. Vercel Build Test (`.github/workflows/vercel-build-test.yml`)

**Purpose:** Tests that the web app can build successfully for Vercel deployment

**Triggers:** On push to main/develop branches and pull requests

**Steps:**
  1. Install dependencies with `yarn install`
  2. Build the web app with `yarn build`
  3. Run tests with `yarn test` (if tests exist)

**Note:** The CI build may fail in restricted environments due to external dependencies (e.g., Google Fonts). This is expected and does not affect Vercel deployments, which have proper internet access.

#### 3. Backend Tests (`.github/workflows/ci.yml`)

**Purpose:** Tests backend API and AI services (separate from web deployment)

**Services:** Runs PostgreSQL and Redis for integration tests

---

### How to Use CI/CD Effectively

#### For Contributors

1. **Before Creating a PR:**
   ```bash
   # Run lint locally
   cd apps/web
   yarn lint
   
   # Run type check locally
   npx tsc --noEmit
   ```

2. **After Creating a PR:**
   - Check the GitHub Actions status
   - All checks must pass before merging
   - Fix any issues reported by the CI checks

3. **Common CI Failures:**
   - **ESLint errors:** Fix code style issues in reported files
   - **TypeScript errors:** Fix type issues in reported files
   - **Config validation:** Check `next.config.js` and root `package.json`

#### For Maintainers

1. **Review CI Results:**
   - All checks must be green before merging
   - Review any warnings even if checks pass
   - Ensure build artifacts are generated correctly

2. **Merge Requirements:**
   - ✅ All CI checks passing
   - ✅ No TypeScript errors
   - ✅ ESLint passing (warnings acceptable, errors not)
   - ✅ Code review approved
   - ✅ No merge conflicts

---

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

## Best Practices for Contributors

### Before Committing Code

Always run these checks locally before pushing:

```bash
# 1. Lint your code
cd apps/web
yarn lint

# 2. Check types
npx tsc --noEmit

# 3. Test build (optional but recommended)
yarn build
```

### Configuration Changes

When modifying configuration files, be aware of these requirements:

#### Root `package.json`
- **MUST** have `"private": true` for workspaces to function
- Do not remove the workspaces field
- CI will fail if this is missing

#### `next.config.js`
- Avoid deprecated configuration options
- Check [Next.js documentation](https://nextjs.org/docs) for current syntax
- CI validates the config on every PR
- Server Actions are enabled by default in Next.js 14+ (no config needed)

#### ESLint Configuration
- Use the Next.js ESLint plugin (`apps/web/.eslintrc.json`)
- Extends `next/core-web-vitals` and `next/typescript`
- Do not remove or replace with custom config unless absolutely necessary
- The Next.js plugin provides proper TypeScript/React parsing

### Understanding CI Checks

The repository has automated checks that run on every PR:

1. **pr-quality-checks.yml** - Validates configuration and code quality
   - ✅ Must pass before merging
   - Checks: workspace config, Next.js config, ESLint, TypeScript

2. **vercel-build-test.yml** - Tests deployment build
   - May fail in CI due to network restrictions (Google Fonts)
   - This is expected and doesn't affect actual Vercel deployments

### Handling Peer Dependency Warnings

When you see warnings like:
```
warning "@jacameno/mobile > react-native-web@0.19.13" has unmet peer dependency "react-dom@^18.0.0"
```

**What to do:**
- ✅ **Ignore these warnings** - they are safe for web deployments
- ❌ **Do not add mobile dependencies to the web app** - keep them separate
- ❌ **Do not add web dependencies to the mobile app** - keep them separate

**Why these warnings exist:**
- The monorepo contains both web (Next.js) and mobile (React Native) apps
- Mobile apps have different peer dependencies than web apps
- Yarn shows all warnings across the entire workspace
- Each app has the correct dependencies in its own `package.json`

### Updating Dependencies

When updating Next.js or other major dependencies:

1. Check the [Next.js upgrade guide](https://nextjs.org/docs/upgrading)
2. Review breaking changes and deprecated features
3. Update configuration as needed (like we did with `serverActions`)
4. Test locally before pushing
5. Monitor CI checks after pushing

### Emergency: CI Failing After Merge

If CI starts failing on main branch:

1. **Check Recent Changes:**
   ```bash
   git log --oneline -10
   ```

2. **Common Fixes:**
   - Verify `package.json` has `"private": true`
   - Check `next.config.js` for deprecated options
   - Ensure `.eslintrc.json` exists in `apps/web`
   - Run `yarn install` to update lockfile

3. **Quick Rollback:**
   ```bash
   git revert <commit-hash>
   git push origin main
   ```

---

**Last Updated:** 2024
**Maintained by:** JACAMENO Team
