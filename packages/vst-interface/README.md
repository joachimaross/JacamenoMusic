# @jacameno/vst-interface

VST Plugin Interface for JACAMENO Platform

## Overview

This package provides TypeScript interfaces and utilities for VST plugin integration in the JACAMENO music production platform.

## Features

- VST2 and VST3 plugin support interfaces
- Plugin loading and management
- Parameter control
- Preset management
- Audio processing pipeline integration

## Installation

```bash
yarn add @jacameno/vst-interface
```

## Usage

```typescript
import { createVSTLoader, VSTCategory } from '@jacameno/vst-interface';

const loader = createVSTLoader();

// Load a plugin
const plugin = await loader.loadPlugin('/path/to/plugin.vst3');

// Process audio
const input = [new Float32Array(1024), new Float32Array(1024)];
const output = [new Float32Array(1024), new Float32Array(1024)];
plugin.processAudio(input, output);

// Set parameters
plugin.setParameter('gain', 0.8);

// Save preset
const preset = plugin.savePreset('My Preset');
```

## API

### VSTLoader

- `loadPlugin(path: string): Promise<VSTPluginInstance>` - Load a VST plugin
- `unloadPlugin(pluginId: string): Promise<void>` - Unload a plugin
- `listAvailablePlugins(): Promise<VSTPluginInfo[]>` - List available plugins

### VSTPluginInstance

- `processAudio(input: Float32Array[], output: Float32Array[]): void` - Process audio
- `setParameter(name: string, value: number): void` - Set parameter value
- `getParameter(name: string): number` - Get parameter value
- `savePreset(name: string): VSTPreset` - Save current state as preset
- `loadPreset(preset: VSTPreset): void` - Load a preset

## Development

This is currently a stub implementation. Production implementation should:

1. Use native bindings (node-addon-api) to load actual VST plugins
2. Implement proper audio buffer management
3. Handle plugin GUI rendering
4. Support MIDI input/output
5. Implement thread-safe audio processing

## License

MIT
