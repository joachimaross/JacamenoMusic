// Shared types and interfaces for JACAMENO platform

export interface Project {
  id: string
  name: string
  bpm: number
  key?: string
  genre?: string
  tracks: Track[]
  collaborators: User[]
  createdAt: string
  updatedAt: string
}

export interface Track {
  id: string
  name: string
  volume: number
  muted: boolean
  solo: boolean
  vstChain: VSTPlugin[]
  audioUrl?: string
  waveform?: number[]
}

export interface User {
  id: string
  username: string
  email: string
  profileImage?: string
  projects: Project[]
}

export interface VSTPlugin {
  id: string
  name: string
  type: 'VST2' | 'VST3'
  parameters: PluginParameter[]
}

export interface PluginParameter {
  name: string
  value: number
  min: number
  max: number
}

export interface LyricsRequest {
  style: string
  theme?: string
  mood?: string
  artist?: string
  bpm?: number
}

export interface LyricsResponse {
  lyrics: string
  rhymeScheme: string
  suggestions: string[]
}

export interface VocalAnalysis {
  pitchAccuracy: number
  timingScore: number
  breathControl: string
  recommendations: string[]
  overallScore: number
}

export interface MixingSettings {
  eq: boolean
  compression: boolean
  reverb: number
  preset?: string
}

export interface MasteringSettings {
  loudness: number
  preset?: string
}

export type VSTType = 'VST2' | 'VST3'
export type ProjectStatus = 'draft' | 'in-progress' | 'completed' | 'published'
export type TrackType = 'audio' | 'midi' | 'instrument'

export const GENRE_PRESETS = [
  'trap',
  'rnb',
  'drill',
  'edm',
  'pop',
  'rock',
  'hip-hop',
  'jazz',
  'classical',
] as const

export type Genre = typeof GENRE_PRESETS[number]

export const BPM_RANGES = {
  slow: { min: 60, max: 90 },
  medium: { min: 90, max: 120 },
  fast: { min: 120, max: 160 },
  veryFast: { min: 160, max: 200 },
} as const

export const MUSICAL_KEYS = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
  'Cm', 'C#m', 'Dm', 'D#m', 'Em', 'Fm', 'F#m', 'Gm', 'G#m', 'Am', 'A#m', 'Bm',
] as const

export type MusicalKey = typeof MUSICAL_KEYS[number]

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// WebSocket event types
export interface WebSocketEvent {
  type: string
  payload: any
  timestamp: string
  userId?: string
}

export interface CollaborationEvent extends WebSocketEvent {
  projectId: string
  trackId?: string
}

// Utility functions
export const createProject = (name: string, bpm: number = 120): Partial<Project> => ({
  name,
  bpm,
  tracks: [],
  collaborators: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})

export const createTrack = (name: string): Partial<Track> => ({
  name,
  volume: 0,
  muted: false,
  solo: false,
  vstChain: [],
})

export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export const dbToLinear = (db: number): number => {
  return Math.pow(10, db / 20)
}

export const linearToDb = (linear: number): number => {
  return 20 * Math.log10(linear)
}
