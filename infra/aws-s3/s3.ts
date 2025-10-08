// AWS S3 Integration for JACAMENO Platform
// This module provides S3 file storage operations

/**
 * S3 Configuration
 */
export interface S3Config {
  region: string;
  bucket: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  endpoint?: string;
}

/**
 * Upload Options
 */
export interface UploadOptions {
  contentType?: string;
  acl?: 'private' | 'public-read' | 'public-read-write';
  metadata?: Record<string, string>;
  tags?: Record<string, string>;
}

/**
 * Upload Result
 */
export interface UploadResult {
  key: string;
  url: string;
  bucket: string;
  etag?: string;
  versionId?: string;
}

/**
 * File Info
 */
export interface FileInfo {
  key: string;
  size: number;
  lastModified: Date;
  contentType?: string;
  metadata?: Record<string, string>;
  url: string;
}

/**
 * S3 Storage Service Interface
 */
export interface S3Service {
  // Upload operations
  upload(
    key: string,
    data: Buffer | string,
    options?: UploadOptions
  ): Promise<UploadResult>;
  
  uploadStream(
    key: string,
    stream: NodeJS.ReadableStream,
    options?: UploadOptions
  ): Promise<UploadResult>;

  // Download operations
  download(key: string): Promise<Buffer>;
  getDownloadUrl(key: string, expiresIn?: number): Promise<string>;
  getPublicUrl(key: string): string;

  // File operations
  exists(key: string): Promise<boolean>;
  delete(key: string): Promise<void>;
  deleteMany(keys: string[]): Promise<void>;
  copy(sourceKey: string, destinationKey: string): Promise<void>;
  move(sourceKey: string, destinationKey: string): Promise<void>;

  // Metadata operations
  getMetadata(key: string): Promise<FileInfo>;
  updateMetadata(key: string, metadata: Record<string, string>): Promise<void>;

  // List operations
  list(prefix?: string, maxKeys?: number): Promise<FileInfo[]>;
}

/**
 * Stub S3 Service Implementation
 * This is a placeholder that should be replaced with AWS SDK integration
 */
export class StubS3Service implements S3Service {
  private config: S3Config;
  private storage: Map<string, { data: Buffer; metadata: any }> = new Map();

  constructor(config: S3Config) {
    this.config = config;
    console.log('Initialized Stub S3 Service for bucket:', config.bucket);
  }

  async upload(
    key: string,
    data: Buffer | string,
    options?: UploadOptions
  ): Promise<UploadResult> {
    const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data);
    
    this.storage.set(key, {
      data: buffer,
      metadata: {
        contentType: options?.contentType || 'application/octet-stream',
        acl: options?.acl || 'private',
        ...options?.metadata,
      },
    });

    return {
      key,
      url: this.getPublicUrl(key),
      bucket: this.config.bucket,
      etag: `stub-etag-${Date.now()}`,
    };
  }

  async uploadStream(
    key: string,
    stream: NodeJS.ReadableStream,
    options?: UploadOptions
  ): Promise<UploadResult> {
    // Stub implementation - in production, use AWS SDK streaming upload
    const chunks: Buffer[] = [];
    
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', async () => {
        const buffer = Buffer.concat(chunks);
        const result = await this.upload(key, buffer, options);
        resolve(result);
      });
      stream.on('error', reject);
    });
  }

  async download(key: string): Promise<Buffer> {
    const item = this.storage.get(key);
    if (!item) {
      throw new Error(`File not found: ${key}`);
    }
    return item.data;
  }

  async getDownloadUrl(key: string, expiresIn: number = 3600): Promise<string> {
    // Stub implementation - returns a mock signed URL
    return `https://${this.config.bucket}.s3.${this.config.region}.amazonaws.com/${key}?X-Amz-Expires=${expiresIn}&X-Amz-SignedHeaders=host&X-Amz-Signature=stub-signature`;
  }

  getPublicUrl(key: string): string {
    return `https://${this.config.bucket}.s3.${this.config.region}.amazonaws.com/${key}`;
  }

  async exists(key: string): Promise<boolean> {
    return this.storage.has(key);
  }

  async delete(key: string): Promise<void> {
    this.storage.delete(key);
  }

  async deleteMany(keys: string[]): Promise<void> {
    keys.forEach(key => this.storage.delete(key));
  }

  async copy(sourceKey: string, destinationKey: string): Promise<void> {
    const item = this.storage.get(sourceKey);
    if (!item) {
      throw new Error(`Source file not found: ${sourceKey}`);
    }
    this.storage.set(destinationKey, { ...item });
  }

  async move(sourceKey: string, destinationKey: string): Promise<void> {
    await this.copy(sourceKey, destinationKey);
    await this.delete(sourceKey);
  }

  async getMetadata(key: string): Promise<FileInfo> {
    const item = this.storage.get(key);
    if (!item) {
      throw new Error(`File not found: ${key}`);
    }

    return {
      key,
      size: item.data.length,
      lastModified: new Date(),
      contentType: item.metadata.contentType,
      metadata: item.metadata,
      url: this.getPublicUrl(key),
    };
  }

  async updateMetadata(key: string, metadata: Record<string, string>): Promise<void> {
    const item = this.storage.get(key);
    if (!item) {
      throw new Error(`File not found: ${key}`);
    }
    
    item.metadata = { ...item.metadata, ...metadata };
    this.storage.set(key, item);
  }

  async list(prefix?: string, maxKeys: number = 1000): Promise<FileInfo[]> {
    const items: FileInfo[] = [];
    
    for (const [key, item] of this.storage.entries()) {
      if (!prefix || key.startsWith(prefix)) {
        items.push({
          key,
          size: item.data.length,
          lastModified: new Date(),
          contentType: item.metadata.contentType,
          metadata: item.metadata,
          url: this.getPublicUrl(key),
        });
        
        if (items.length >= maxKeys) break;
      }
    }
    
    return items;
  }
}

/**
 * Create S3 Service instance
 */
export function createS3Service(config: S3Config): S3Service {
  // In production, return actual AWS S3 service
  return new StubS3Service(config);
}

/**
 * Get default S3 configuration from environment
 */
export function getS3ConfigFromEnv(): S3Config {
  return {
    region: process.env.AWS_REGION || 'us-east-1',
    bucket: process.env.AWS_S3_BUCKET || 'jacameno-music',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  };
}

/**
 * Helper to generate S3 key for audio files
 */
export function generateAudioKey(userId: string, projectId: string, filename: string): string {
  const timestamp = Date.now();
  const sanitized = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
  return `audio/${userId}/${projectId}/${timestamp}-${sanitized}`;
}

/**
 * Helper to generate S3 key for project files
 */
export function generateProjectKey(userId: string, projectId: string, filename: string): string {
  const timestamp = Date.now();
  const sanitized = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
  return `projects/${userId}/${projectId}/${timestamp}-${sanitized}`;
}

/**
 * Helper to generate S3 key for user assets
 */
export function generateAssetKey(userId: string, type: string, filename: string): string {
  const timestamp = Date.now();
  const sanitized = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
  return `assets/${userId}/${type}/${timestamp}-${sanitized}`;
}

export default {
  createS3Service,
  getS3ConfigFromEnv,
  generateAudioKey,
  generateProjectKey,
  generateAssetKey,
};
