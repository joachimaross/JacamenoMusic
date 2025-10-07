import express, { Express, Request, Response } from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs, resolvers } from './graphql'
import { setupSocketHandlers } from './socket'

dotenv.config()

const app: Express = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST']
  }
})

const PORT = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'JACAMENO API' })
})

// REST API Routes
app.get('/api/v1', (req: Request, res: Response) => {
  res.json({
    message: 'JACAMENO API v1',
    endpoints: {
      graphql: '/graphql',
      websocket: '/socket.io',
      health: '/health'
    }
  })
})

// Projects
app.post('/api/v1/projects', (req: Request, res: Response) => {
  res.json({ message: 'Create project', data: req.body })
})

app.get('/api/v1/projects/:id', (req: Request, res: Response) => {
  res.json({ message: 'Get project', id: req.params.id })
})

// Tracks
app.post('/api/v1/tracks/upload', (req: Request, res: Response) => {
  res.json({ message: 'Upload track' })
})

// AI Services
app.post('/api/v1/ai/lyrics', (req: Request, res: Response) => {
  res.json({ 
    message: 'Generate lyrics',
    lyrics: 'Sample AI-generated lyrics...',
    style: req.body.style
  })
})

app.post('/api/v1/ai/vocal-coaching', (req: Request, res: Response) => {
  res.json({
    message: 'Vocal coaching analysis',
    feedback: {
      pitch: 'Good',
      timing: 'Needs improvement',
      breath: 'Excellent'
    }
  })
})

app.post('/api/v1/ai/mixing', (req: Request, res: Response) => {
  res.json({
    message: 'AI mixing suggestions',
    suggestions: [
      'Reduce bass by 2dB at 80Hz',
      'Add slight reverb to vocals',
      'Apply compression to drums'
    ]
  })
})

// VST Plugins
app.get('/api/v1/vst/plugins', (req: Request, res: Response) => {
  res.json({
    plugins: [
      { id: '1', name: 'Compressor Pro', type: 'VST3' },
      { id: '2', name: 'Reverb Studio', type: 'VST2' },
      { id: '3', name: 'EQ Master', type: 'VST3' }
    ]
  })
})

// GraphQL Setup
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
})

async function startServer() {
  await apolloServer.start()
  apolloServer.applyMiddleware({ app: app as any, path: '/graphql' })

  // Setup Socket.io handlers
  setupSocketHandlers(io)

  httpServer.listen(PORT, () => {
    console.log(`🚀 JACAMENO API Server running on port ${PORT}`)
    console.log(`📊 GraphQL endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`)
    console.log(`🔌 WebSocket endpoint: ws://localhost:${PORT}`)
  })
}

startServer().catch(console.error)

export { app, io }
