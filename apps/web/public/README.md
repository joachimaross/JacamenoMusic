# JACAMENO Public Assets

This directory contains static assets that are served at the root of the application by Next.js.

## Asset Usage Guidelines

### Current Assets
- `favicon.svg` - Site favicon displayed in browser tabs and bookmarks

### Adding New Assets

When adding files to this directory:

1. **Images**: Place logos, icons, and other images here for use across the site
   - Supported formats: SVG, PNG, JPEG, GIF, WebP
   - Recommended: Use SVG for logos and icons, WebP for photos

2. **Fonts**: Custom web fonts should be placed here if not using next/font
   - Example: `/fonts/custom-font.woff2`

3. **Static Files**: Documents, audio samples, or other downloadable content
   - Example: `/docs/press-kit.pdf`

### Accessing Assets

Assets in this directory are served from the root path:

```tsx
// In your React components:
import Image from 'next/image'

// Access favicon
<link rel="icon" href="/favicon.svg" />

// Access other assets
<Image src="/logo.png" alt="JACAMENO Logo" width={200} height={50} />
<a href="/docs/guide.pdf">Download Guide</a>
```

### Best Practices

1. **Optimization**: Use Next.js Image component for automatic optimization
2. **Naming**: Use kebab-case for file names (e.g., `album-cover.jpg`)
3. **Organization**: Create subdirectories for different asset types:
   - `/images/` - Site images and graphics
   - `/fonts/` - Custom font files
   - `/icons/` - Icon files and SVGs
   - `/docs/` - PDF and document files

4. **Copyright**: Ensure all assets are properly licensed for use
   - Original JACAMENO assets: Copyright © 2024 JACAMENO
   - Third-party assets: Check license and attribution requirements

### Security Notes

- Do not store sensitive data (API keys, credentials) in this directory
- All files here are publicly accessible
- Use environment variables for configuration (see `.env.example`)

### Performance Tips

- Compress images before adding them (use tools like ImageOptim, TinyPNG)
- Use appropriate image formats:
  - SVG for logos and icons (scalable, small size)
  - WebP for photos (best compression)
  - PNG for images requiring transparency
- Lazy load images not in the initial viewport

For more information on static file handling in Next.js, see:
https://nextjs.org/docs/app/building-your-application/optimizing/static-assets
