# Database Schema

This directory contains the Prisma schema for the JACAMENO platform database.

## Setup

1. Install dependencies:
```bash
npm install prisma @prisma/client
```

2. Set DATABASE_URL in your environment:
```bash
export DATABASE_URL="postgresql://user:password@localhost:5432/jacameno?schema=public"
```

3. Generate Prisma Client:
```bash
npx prisma generate
```

4. Run migrations:
```bash
npx prisma migrate dev --name init
```

## Schema Overview

### Core Models
- **User**: User accounts and authentication
- **Session**: Session management
- **Project**: Music projects
- **Track**: Audio/MIDI tracks within projects
- **VSTPlugin**: VST plugin catalog

### Collaboration
- **ProjectCollaborator**: Multi-user project access
- **ProjectVersion**: Version history

### Payments & Subscriptions
- **Customer**: Payment customer records
- **PaymentMethod**: Stored payment methods
- **SubscriptionPlan**: Available subscription tiers
- **Subscription**: Active subscriptions
- **Payment**: Payment transactions

### Marketplace
- **MarketplaceItem**: Presets, samples, tutorials for sale
- **MarketplacePurchase**: Purchase records

### Notifications
- **Notification**: User notifications and alerts

## Commands

```bash
# Generate Prisma Client
npx prisma generate

# Create migration
npx prisma migrate dev --name your_migration_name

# Apply migrations
npx prisma migrate deploy

# Open Prisma Studio (GUI)
npx prisma studio

# Reset database (development only)
npx prisma migrate reset

# Format schema
npx prisma format
```

## Environment Variables

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
```

## Notes

- PostgreSQL 14+ is required
- Use `prisma migrate dev` in development
- Use `prisma migrate deploy` in production
- Always backup before running migrations in production
