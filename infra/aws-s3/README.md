# AWS S3 Integration

S3 file storage integration for the JACAMENO platform.

## Setup

1. Install dependencies:
```bash
npm install aws-sdk
# or
yarn add aws-sdk
```

2. Configure environment variables:
```bash
export AWS_REGION="us-east-1"
export AWS_S3_BUCKET="jacameno-music"
export AWS_ACCESS_KEY_ID="your-access-key"
export AWS_SECRET_ACCESS_KEY="your-secret-key"
```

## Usage

### Basic Upload

```typescript
import { createS3Service, getS3ConfigFromEnv } from './s3';

const s3 = createS3Service(getS3ConfigFromEnv());

// Upload file
const result = await s3.upload(
  'audio/user123/project456/track.mp3',
  audioBuffer,
  {
    contentType: 'audio/mpeg',
    acl: 'public-read',
  }
);

console.log('Uploaded to:', result.url);
```

### Download File

```typescript
// Get signed download URL
const url = await s3.getDownloadUrl('audio/user123/project456/track.mp3', 3600);

// Or download directly
const buffer = await s3.download('audio/user123/project456/track.mp3');
```

### File Operations

```typescript
// Check if file exists
const exists = await s3.exists('path/to/file.mp3');

// Delete file
await s3.delete('path/to/file.mp3');

// Copy file
await s3.copy('source/file.mp3', 'destination/file.mp3');

// List files
const files = await s3.list('audio/user123/', 100);
```

### Helper Functions

```typescript
import { generateAudioKey, generateProjectKey, generateAssetKey } from './s3';

// Generate unique keys
const audioKey = generateAudioKey('user123', 'project456', 'vocals.mp3');
const projectKey = generateProjectKey('user123', 'project456', 'data.json');
const assetKey = generateAssetKey('user123', 'profile', 'avatar.jpg');
```

## File Organization

```
s3://jacameno-music/
├── audio/
│   └── {userId}/
│       └── {projectId}/
│           └── {timestamp}-{filename}
├── projects/
│   └── {userId}/
│       └── {projectId}/
│           └── {timestamp}-{filename}
├── assets/
│   └── {userId}/
│       └── {type}/
│           └── {timestamp}-{filename}
└── marketplace/
    └── {itemId}/
        └── {filename}
```

## Security

- Use IAM roles when deploying to AWS
- Never commit AWS credentials to version control
- Use signed URLs for private file access
- Set appropriate ACLs for file privacy
- Enable versioning for important buckets
- Configure CORS for web uploads

## CORS Configuration

```json
{
  "CORSRules": [
    {
      "AllowedOrigins": ["https://jacameno.com"],
      "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
      "AllowedHeaders": ["*"],
      "MaxAgeSeconds": 3000
    }
  ]
}
```

## Production Setup

For production, replace the stub implementation with AWS SDK:

```typescript
import { S3 } from 'aws-sdk';

export class AwsS3Service implements S3Service {
  private s3: S3;
  private config: S3Config;

  constructor(config: S3Config) {
    this.config = config;
    this.s3 = new S3({
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId!,
        secretAccessKey: config.secretAccessKey!,
      },
    });
  }

  // Implement all methods using AWS SDK...
}
```

## Testing

Use LocalStack or MinIO for local S3 testing:

```bash
docker run -p 4566:4566 localstack/localstack
```

## License

MIT
