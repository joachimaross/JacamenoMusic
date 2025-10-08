# Marketplace & Tutorials

Marketplace and educational content management for JACAMENO platform.

## Features

- Marketplace for presets, samples, templates
- Tutorial platform with chapters
- Purchase management
- Review and rating system
- Search and filtering
- User enrollments

## Installation

```bash
npm install
```

## Usage

### Initialize Marketplace

```javascript
const { marketplace } = require('./index.js');
```

### Create Marketplace Item

```javascript
const item = await marketplace.createItem({
  name: 'Pro Trap Preset Pack',
  description: 'Professional trap presets for your VST',
  type: 'preset',
  category: 'vst_preset',
  price: 2999, // $29.99 in cents
  sellerId: 'user123',
  sellerName: 'ProducerX',
  fileUrl: 's3://bucket/presets/trap-pack.zip',
  thumbnailUrl: 's3://bucket/thumbnails/trap-pack.jpg',
  tags: ['trap', 'presets', 'vst', 'professional'],
});
```

### List Items with Filters

```javascript
const result = await marketplace.listItems({
  type: 'preset',
  category: 'vst_preset',
  minPrice: 0,
  maxPrice: 5000,
  tags: ['trap'],
  sortBy: 'popular',
  page: 1,
  limit: 20,
});

console.log(result.items);
console.log(`Total: ${result.total}, Has more: ${result.hasMore}`);
```

### Purchase Item

```javascript
const purchase = await marketplace.purchaseItem(
  'user456',
  'item123',
  'payment_method_789'
);

console.log('Download URL:', purchase.downloadUrl);
```

### Create Tutorial

```javascript
const tutorial = await marketplace.createTutorial({
  title: 'Mastering Trap Music Production',
  description: 'Learn how to produce professional trap beats',
  category: 'genre_specific',
  difficulty: 'intermediate',
  duration: 180, // minutes
  authorId: 'instructor123',
  authorName: 'Beat Master',
  videoUrl: 's3://bucket/tutorials/trap-production.mp4',
  thumbnailUrl: 's3://bucket/thumbnails/trap-tutorial.jpg',
  chapters: [
    {
      id: 'ch1',
      title: 'Introduction to Trap',
      duration: 15,
      videoUrl: 's3://bucket/tutorials/ch1.mp4',
      order: 1,
    },
    {
      id: 'ch2',
      title: '808 Bass Techniques',
      duration: 30,
      videoUrl: 's3://bucket/tutorials/ch2.mp4',
      order: 2,
    },
  ],
  isPremium: true,
  price: 4999, // $49.99
  tags: ['trap', 'production', '808', 'drums'],
});
```

### Enroll in Tutorial

```javascript
const enrollment = await marketplace.enrollInTutorial('user456', 'tutorial123');
console.log('Enrolled at:', enrollment.enrolledAt);
```

### Add Review

```javascript
const review = await marketplace.createReview(
  'user456',
  'item123',
  5,
  'Amazing presets! Totally worth it.'
);
```

### Search

```javascript
const results = await marketplace.search('trap', {
  type: 'preset',
  sortBy: 'rating',
});
```

## Item Types

- `preset` - VST presets, mixing presets
- `template` - Project templates, track templates
- `sample_pack` - Drum samples, vocal samples
- `tutorial` - Educational content
- `plugin` - VST plugins
- `sound_library` - Sound effects libraries

## Categories

### Presets
- `vst_preset`
- `mixing_preset`
- `mastering_preset`

### Templates
- `project_template`
- `track_template`

### Samples
- `drum_samples`
- `vocal_samples`
- `synth_samples`
- `fx_samples`

### Tutorials
- `beginner_tutorial`
- `intermediate_tutorial`
- `advanced_tutorial`
- `genre_specific`

## API

### MarketplaceService

**Item Management**
- `createItem(itemData)` - Create new item
- `getItem(itemId)` - Get item by ID
- `updateItem(itemId, updates)` - Update item
- `deleteItem(itemId)` - Delete item
- `listItems(filters)` - List items with filters

**Purchase Management**
- `purchaseItem(userId, itemId, paymentMethodId)` - Purchase item
- `getUserPurchases(userId)` - Get user's purchases

**Tutorial Management**
- `createTutorial(tutorialData)` - Create tutorial
- `getTutorial(tutorialId)` - Get tutorial
- `listTutorials(filters)` - List tutorials
- `enrollInTutorial(userId, tutorialId)` - Enroll user

**Review Management**
- `createReview(userId, itemId, rating, comment)` - Add review
- `getItemReviews(itemId)` - Get item reviews

**Search**
- `search(query, filters)` - Search items

## Filters

```javascript
{
  type: 'preset',
  category: 'vst_preset',
  minPrice: 0,
  maxPrice: 10000,
  tags: ['trap', 'professional'],
  sortBy: 'popular', // 'popular', 'rating', 'price-asc', 'price-desc', 'newest'
  page: 1,
  limit: 20,
}
```

## Tutorial Difficulty Levels

- `beginner` - For newcomers
- `intermediate` - For experienced users
- `advanced` - For professionals

## Integration

### With Payment System

```javascript
const { marketplace } = require('./index.js');
const { createPaymentProcessor } = require('../packages/payment');

const payment = createPaymentProcessor('stripe');
const purchase = await marketplace.purchaseItem(userId, itemId, paymentMethodId);
```

### With S3 Storage

```javascript
const { createS3Service } = require('../infra/aws-s3/s3.ts');

const s3 = createS3Service(config);
const uploadResult = await s3.upload(key, fileBuffer);

const item = await marketplace.createItem({
  // ...
  fileUrl: uploadResult.url,
});
```

## License

MIT
