import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Query {
    projects: [Project!]!
    project(id: ID!): Project
    tracks: [Track!]!
    user(id: ID!): User
    vstPlugins: [VSTPlugin!]!
  }

  type Mutation {
    createProject(input: CreateProjectInput!): Project!
    updateProject(id: ID!, input: UpdateProjectInput!): Project!
    deleteProject(id: ID!): Boolean!
    
    createTrack(input: CreateTrackInput!): Track!
    uploadAudio(file: Upload!): UploadResult!
    
    generateLyrics(input: LyricsInput!): LyricsResult!
    analyzeVocals(audioUrl: String!): VocalAnalysis!
    mixTrack(trackId: ID!, settings: MixSettings!): MixResult!
    masterTrack(trackId: ID!, settings: MasterSettings!): MasterResult!
    
    loadVSTPlugin(pluginId: ID!, trackId: ID!): Boolean!
  }

  type Subscription {
    projectUpdated(projectId: ID!): Project!
    trackAdded(projectId: ID!): Track!
    collaboratorJoined(projectId: ID!): User!
  }

  type Project {
    id: ID!
    name: String!
    bpm: Int!
    key: String
    genre: String
    tracks: [Track!]!
    collaborators: [User!]!
    createdAt: String!
    updatedAt: String!
  }

  type Track {
    id: ID!
    name: String!
    volume: Float!
    muted: Boolean!
    solo: Boolean!
    vstChain: [VSTPlugin!]!
    audioUrl: String
    waveform: [Float!]
  }

  type User {
    id: ID!
    username: String!
    email: String!
    profileImage: String
    projects: [Project!]!
  }

  type VSTPlugin {
    id: ID!
    name: String!
    type: VSTType!
    parameters: [PluginParameter!]!
  }

  type PluginParameter {
    name: String!
    value: Float!
    min: Float!
    max: Float!
  }

  enum VSTType {
    VST2
    VST3
  }

  type LyricsResult {
    lyrics: String!
    rhymeScheme: String
    suggestions: [String!]
  }

  type VocalAnalysis {
    pitch: String!
    timing: String!
    breath: String!
    recommendations: [String!]!
  }

  type MixResult {
    success: Boolean!
    audioUrl: String!
    suggestions: [String!]!
  }

  type MasterResult {
    success: Boolean!
    audioUrl: String!
    settings: MasterSettings!
  }

  type UploadResult {
    success: Boolean!
    url: String!
  }

  input CreateProjectInput {
    name: String!
    bpm: Int!
    key: String
    genre: String
  }

  input UpdateProjectInput {
    name: String
    bpm: Int
    key: String
    genre: String
  }

  input CreateTrackInput {
    projectId: ID!
    name: String!
    volume: Float
  }

  input LyricsInput {
    style: String!
    theme: String
    mood: String
    artist: String
  }

  input MixSettings {
    eq: Boolean
    compression: Boolean
    reverb: Float
    preset: String
  }

  input MasterSettings {
    loudness: Float!
    preset: String
  }

  scalar Upload
`

export const resolvers = {
  Query: {
    projects: () => [],
    project: (_: any, { id }: { id: string }) => null,
    tracks: () => [],
    user: (_: any, { id }: { id: string }) => null,
    vstPlugins: () => [
      { id: '1', name: 'Compressor Pro', type: 'VST3', parameters: [] },
      { id: '2', name: 'Reverb Studio', type: 'VST2', parameters: [] },
    ],
  },
  Mutation: {
    createProject: (_: any, { input }: any) => ({
      id: Date.now().toString(),
      ...input,
      tracks: [],
      collaborators: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }),
    generateLyrics: (_: any, { input }: any) => ({
      lyrics: 'AI-generated lyrics based on your style...',
      rhymeScheme: 'AABB',
      suggestions: ['Add more metaphors', 'Consider changing the chorus'],
    }),
    analyzeVocals: (_: any, { audioUrl }: { audioUrl: string }) => ({
      pitch: 'Good - 85% accuracy',
      timing: 'Needs improvement',
      breath: 'Excellent control',
      recommendations: [
        'Practice breath control exercises',
        'Work on pitch stability',
      ],
    }),
  },
}
