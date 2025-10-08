// Marketplace & Tutorials Module for JACAMENO Platform
// This module manages marketplace items, purchases, and educational content

/**
 * Item Types in Marketplace
 */
export const ItemType = {
  PRESET: 'preset',
  TEMPLATE: 'template',
  SAMPLE_PACK: 'sample_pack',
  TUTORIAL: 'tutorial',
  PLUGIN: 'plugin',
  SOUND_LIBRARY: 'sound_library',
};

/**
 * Item Categories
 */
export const ItemCategory = {
  // Presets
  VST_PRESET: 'vst_preset',
  MIXING_PRESET: 'mixing_preset',
  MASTERING_PRESET: 'mastering_preset',
  
  // Templates
  PROJECT_TEMPLATE: 'project_template',
  TRACK_TEMPLATE: 'track_template',
  
  // Samples
  DRUM_SAMPLES: 'drum_samples',
  VOCAL_SAMPLES: 'vocal_samples',
  SYNTH_SAMPLES: 'synth_samples',
  FX_SAMPLES: 'fx_samples',
  
  // Tutorials
  BEGINNER_TUTORIAL: 'beginner_tutorial',
  INTERMEDIATE_TUTORIAL: 'intermediate_tutorial',
  ADVANCED_TUTORIAL: 'advanced_tutorial',
  GENRE_SPECIFIC: 'genre_specific',
};

/**
 * Marketplace Item
 */
export class MarketplaceItem {
  constructor(data) {
    this.id = data.id || `item_${Date.now()}`;
    this.name = data.name;
    this.description = data.description;
    this.type = data.type;
    this.category = data.category;
    this.price = data.price; // in cents
    this.currency = data.currency || 'usd';
    this.sellerId = data.sellerId;
    this.sellerName = data.sellerName;
    this.fileUrl = data.fileUrl;
    this.thumbnailUrl = data.thumbnailUrl;
    this.previewUrl = data.previewUrl;
    this.tags = data.tags || [];
    this.rating = data.rating || 0;
    this.reviewCount = data.reviewCount || 0;
    this.downloadCount = data.downloadCount || 0;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  toJSON() {
    return { ...this };
  }
}

/**
 * Tutorial Content
 */
export class Tutorial {
  constructor(data) {
    this.id = data.id || `tutorial_${Date.now()}`;
    this.title = data.title;
    this.description = data.description;
    this.category = data.category;
    this.difficulty = data.difficulty; // 'beginner', 'intermediate', 'advanced'
    this.duration = data.duration; // in minutes
    this.authorId = data.authorId;
    this.authorName = data.authorName;
    this.videoUrl = data.videoUrl;
    this.thumbnailUrl = data.thumbnailUrl;
    this.chapters = data.chapters || [];
    this.resources = data.resources || [];
    this.tags = data.tags || [];
    this.isPremium = data.isPremium || false;
    this.price = data.price || 0;
    this.rating = data.rating || 0;
    this.enrolledCount = data.enrolledCount || 0;
    this.createdAt = data.createdAt || new Date();
  }

  toJSON() {
    return { ...this };
  }
}

/**
 * Tutorial Chapter
 */
export class TutorialChapter {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.duration = data.duration;
    this.videoUrl = data.videoUrl;
    this.order = data.order;
  }
}

/**
 * Marketplace Service
 */
export class MarketplaceService {
  constructor() {
    this.items = new Map();
    this.tutorials = new Map();
    this.purchases = new Map();
    this.reviews = new Map();
  }

  // Item Management
  async createItem(itemData) {
    const item = new MarketplaceItem(itemData);
    this.items.set(item.id, item);
    return item;
  }

  async getItem(itemId) {
    const item = this.items.get(itemId);
    if (!item) {
      throw new Error('Item not found');
    }
    return item;
  }

  async updateItem(itemId, updates) {
    const item = await this.getItem(itemId);
    Object.assign(item, updates);
    item.updatedAt = new Date();
    this.items.set(itemId, item);
    return item;
  }

  async deleteItem(itemId) {
    this.items.delete(itemId);
  }

  async listItems(filters = {}) {
    let items = Array.from(this.items.values());

    // Apply filters
    if (filters.type) {
      items = items.filter(item => item.type === filters.type);
    }
    if (filters.category) {
      items = items.filter(item => item.category === filters.category);
    }
    if (filters.minPrice !== undefined) {
      items = items.filter(item => item.price >= filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      items = items.filter(item => item.price <= filters.maxPrice);
    }
    if (filters.tags && filters.tags.length > 0) {
      items = items.filter(item =>
        filters.tags.some(tag => item.tags.includes(tag))
      );
    }

    // Sort
    if (filters.sortBy === 'popular') {
      items.sort((a, b) => b.downloadCount - a.downloadCount);
    } else if (filters.sortBy === 'rating') {
      items.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'price-asc') {
      items.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-desc') {
      items.sort((a, b) => b.price - a.price);
    } else {
      // Default: newest first
      items.sort((a, b) => b.createdAt - a.createdAt);
    }

    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      items: items.slice(start, end),
      total: items.length,
      page,
      limit,
      hasMore: end < items.length,
    };
  }

  // Purchase Management
  async purchaseItem(userId, itemId, paymentMethodId) {
    const item = await this.getItem(itemId);
    
    const purchase = {
      id: `purchase_${Date.now()}`,
      userId,
      itemId,
      amount: item.price,
      currency: item.currency,
      paymentMethodId,
      status: 'completed',
      downloadUrl: item.fileUrl,
      createdAt: new Date(),
    };

    this.purchases.set(purchase.id, purchase);

    // Update item stats
    item.downloadCount++;
    this.items.set(itemId, item);

    return purchase;
  }

  async getUserPurchases(userId) {
    return Array.from(this.purchases.values())
      .filter(p => p.userId === userId)
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  // Tutorial Management
  async createTutorial(tutorialData) {
    const tutorial = new Tutorial(tutorialData);
    this.tutorials.set(tutorial.id, tutorial);
    return tutorial;
  }

  async getTutorial(tutorialId) {
    const tutorial = this.tutorials.get(tutorialId);
    if (!tutorial) {
      throw new Error('Tutorial not found');
    }
    return tutorial;
  }

  async listTutorials(filters = {}) {
    let tutorials = Array.from(this.tutorials.values());

    // Apply filters
    if (filters.category) {
      tutorials = tutorials.filter(t => t.category === filters.category);
    }
    if (filters.difficulty) {
      tutorials = tutorials.filter(t => t.difficulty === filters.difficulty);
    }
    if (filters.isPremium !== undefined) {
      tutorials = tutorials.filter(t => t.isPremium === filters.isPremium);
    }

    // Sort
    if (filters.sortBy === 'popular') {
      tutorials.sort((a, b) => b.enrolledCount - a.enrolledCount);
    } else if (filters.sortBy === 'rating') {
      tutorials.sort((a, b) => b.rating - a.rating);
    } else {
      tutorials.sort((a, b) => b.createdAt - a.createdAt);
    }

    return tutorials;
  }

  async enrollInTutorial(userId, tutorialId) {
    const tutorial = await this.getTutorial(tutorialId);
    tutorial.enrolledCount++;
    this.tutorials.set(tutorialId, tutorial);

    return {
      id: `enrollment_${Date.now()}`,
      userId,
      tutorialId,
      progress: 0,
      enrolledAt: new Date(),
    };
  }

  // Review Management
  async createReview(userId, itemId, rating, comment) {
    const review = {
      id: `review_${Date.now()}`,
      userId,
      itemId,
      rating,
      comment,
      helpful: 0,
      createdAt: new Date(),
    };

    if (!this.reviews.has(itemId)) {
      this.reviews.set(itemId, []);
    }
    this.reviews.get(itemId).push(review);

    // Update item rating
    const item = await this.getItem(itemId);
    const reviews = this.reviews.get(itemId);
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    item.rating = avgRating;
    item.reviewCount = reviews.length;
    this.items.set(itemId, item);

    return review;
  }

  async getItemReviews(itemId) {
    return this.reviews.get(itemId) || [];
  }

  // Search
  async search(query, filters = {}) {
    const items = await this.listItems(filters);
    const searchTerm = query.toLowerCase();

    const filtered = items.items.filter(item => {
      return (
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    });

    return {
      ...items,
      items: filtered,
      total: filtered.length,
    };
  }
}

// Export singleton instance
export const marketplace = new MarketplaceService();

// Export default
module.exports = {
  MarketplaceService,
  MarketplaceItem,
  Tutorial,
  TutorialChapter,
  ItemType,
  ItemCategory,
  marketplace,
};
