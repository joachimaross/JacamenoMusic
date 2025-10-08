# @jacameno/audio-processing

Audio Processing Utilities for JACAMENO Platform

## Overview

This package provides audio processing, effects, and DSP utilities for the JACAMENO music production platform.

## Features

- Audio buffer management
- Normalization and gain control
- Fade in/out effects
- Audio mixing
- Waveform generation
- Audio analysis (frequency, tempo, key detection)
- Sample rate conversion
- Channel mixing

## Installation

```bash
yarn add @jacameno/audio-processing
```

## Usage

### Basic Processing

```typescript
import { AudioProcessor, createAudioBuffer } from '@jacameno/audio-processing';

// Create audio buffer
const data = [new Float32Array(44100), new Float32Array(44100)];
const buffer = createAudioBuffer(data, 44100);

// Normalize audio
const normalized = AudioProcessor.normalize(buffer, 0.9);

// Apply fade in/out
const faded = AudioProcessor.fade(buffer, 0.5, 1.0); // 0.5s fade in, 1s fade out

// Apply gain
const gained = AudioProcessor.gain(buffer, 0.5);

// Generate waveform for visualization
const waveform = AudioProcessor.generateWaveform(buffer, 1000);
```

### Mixing

```typescript
import { AudioProcessor } from '@jacameno/audio-processing';

const mixed = AudioProcessor.mix(
  [buffer1, buffer2, buffer3],
  [1.0, 0.8, 0.6] // Gains for each buffer
);
```

### Analysis

```typescript
import { StubAudioAnalyzer } from '@jacameno/audio-processing';

const analyzer = new StubAudioAnalyzer();

// Analyze frequency content
const freqData = analyzer.analyzeFrequency(buffer);
console.log('Peak frequency:', freqData.peakFrequency);

// Detect tempo
const tempoData = analyzer.analyzeTempo(buffer);
console.log('BPM:', tempoData.bpm);

// Detect key
const keyData = analyzer.analyzeKey(buffer);
console.log('Key:', keyData.key, keyData.scale);
```

## API

### AudioProcessor

- `normalize(buffer, targetLevel)` - Normalize audio levels
- `fade(buffer, fadeIn, fadeOut)` - Apply fade in/out
- `mix(buffers, gains)` - Mix multiple audio buffers
- `gain(buffer, gainValue)` - Apply gain to audio
- `generateWaveform(buffer, samples)` - Generate waveform visualization data

### StubAudioAnalyzer

- `analyzeFrequency(buffer)` - Analyze frequency spectrum
- `analyzeTempo(buffer)` - Detect tempo and beats
- `analyzeKey(buffer)` - Detect musical key
- `getWaveform(buffer)` - Get waveform data

## Development

This is currently a stub implementation. Production implementation should:

1. Implement real FFT for frequency analysis
2. Use proper beat detection algorithms
3. Implement chromagram for key detection
4. Add more audio effects (EQ, compression, reverb, etc.)
5. Support real-time processing
6. Optimize for performance with Web Audio API or native code

## License

MIT
