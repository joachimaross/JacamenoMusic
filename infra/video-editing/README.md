# Video Editing Integration

Video editing and music video generation for the JACAMENO platform.

## Features

- Timeline-based video editing
- Audio visualization generation
- Video format conversion
- Watermark support
- Effects and transitions
- FFmpeg integration

## Installation

```bash
npm install fluent-ffmpeg
```

Also install FFmpeg on your system:

**Ubuntu/Debian:**
```bash
sudo apt-get install ffmpeg
```

**macOS:**
```bash
brew install ffmpeg
```

**Windows:**
Download from [ffmpeg.org](https://ffmpeg.org/download.html)

## Usage

### Create Video Editor

```javascript
const { createVideoEditor } = require('./index.js');

const editor = createVideoEditor();
```

### Basic Workflow

```javascript
// Create new project
const projectId = await editor.createProject('My Music Video');
await editor.loadProject(projectId);

// Add items to timeline
await editor.addItem({
  id: 'item1',
  type: 'audio',
  start: 0,
  duration: 180,
  source: '/path/to/song.mp3',
});

await editor.addItem({
  id: 'item2',
  type: 'image',
  start: 0,
  duration: 180,
  source: '/path/to/background.jpg',
});

// Add effects
await editor.addEffect('item2', {
  type: 'zoom',
  parameters: { scale: 1.2, duration: 10 },
});

// Render video
const progress = await editor.render({
  outputPath: '/output/video.mp4',
  config: {
    format: 'mp4',
    resolution: '1080p',
    fps: 30,
    videoCodec: 'h264',
    audioCodec: 'aac',
  },
});
```

### Generate Audio Visualizer

```javascript
const outputPath = await editor.generateVisualizer(
  '/path/to/audio.mp3',
  {
    type: 'waveform',
    color: '#00ff00',
    backgroundColor: '#000000',
    width: 1920,
    height: 1080,
  }
);
```

### FFmpeg Helpers

```javascript
const { ffmpeg } = require('./index.js');

// Audio to video with visualizer
await ffmpeg.audioToVideo(
  'input.mp3',
  'output.mp4',
  { type: 'waveform', width: 1920, height: 1080 }
);

// Merge audio and video
await ffmpeg.mergeAudioVideo(
  'video.mp4',
  'audio.mp3',
  'output.mp4'
);

// Add watermark
await ffmpeg.addWatermark(
  'input.mp4',
  'watermark.png',
  'output.mp4',
  'bottom-right'
);

// Extract audio
await ffmpeg.extractAudio('video.mp4', 'audio.mp3');

// Convert format
await ffmpeg.convertFormat(
  'input.mov',
  'output.mp4',
  { format: 'mp4', videoCodec: 'h264', audioCodec: 'aac' }
);
```

## Video Configurations

### Resolution Presets
- `480p`: 854x480
- `720p`: 1280x720
- `1080p`: 1920x1080
- `4k`: 3840x2160

### Supported Formats
- MP4 (h264, h265)
- WebM (vp8, vp9)
- MOV (h264, h265)
- AVI

## Visualizer Types

1. **Waveform**: Audio waveform display
2. **Spectrum**: Frequency spectrum bars
3. **Circular**: Circular frequency display
4. **Bars**: Vertical frequency bars

## Effects

- Zoom
- Pan
- Fade
- Blur
- Color correction
- Rotation
- Scale

## Transitions

- Fade
- Dissolve
- Wipe
- Slide

## Production Implementation

Replace stub with real FFmpeg integration:

```javascript
const ffmpeg = require('fluent-ffmpeg');

class RealVideoEditor {
  async render(options) {
    return new Promise((resolve, reject) => {
      ffmpeg()
        .input(/* ... */)
        .videoCodec(options.config.videoCodec)
        .audioCodec(options.config.audioCodec)
        .size(`${width}x${height}`)
        .fps(options.config.fps)
        .on('progress', (progress) => {
          // Update progress
        })
        .on('end', () => resolve())
        .on('error', reject)
        .save(options.outputPath);
    });
  }
}
```

## Performance Tips

- Use hardware acceleration when available
- Process videos in chunks for large files
- Use lower resolution for previews
- Cache intermediate renders
- Use appropriate bitrates for quality/size balance

## License

MIT
