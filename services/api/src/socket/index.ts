import { Server, Socket } from 'socket.io'

export function setupSocketHandlers(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log(`🔌 Client connected: ${socket.id}`)

    // Join project room for collaboration
    socket.on('join-project', (projectId: string) => {
      socket.join(`project:${projectId}`)
      console.log(`User ${socket.id} joined project ${projectId}`)
      
      // Notify others in the room
      socket.to(`project:${projectId}`).emit('collaborator-joined', {
        userId: socket.id,
        timestamp: new Date().toISOString()
      })
    })

    // Leave project room
    socket.on('leave-project', (projectId: string) => {
      socket.leave(`project:${projectId}`)
      socket.to(`project:${projectId}`).emit('collaborator-left', {
        userId: socket.id,
        timestamp: new Date().toISOString()
      })
    })

    // Track updates
    socket.on('track-update', (data: any) => {
      const { projectId, trackId, changes } = data
      socket.to(`project:${projectId}`).emit('track-updated', {
        trackId,
        changes,
        userId: socket.id,
        timestamp: new Date().toISOString()
      })
    })

    // Real-time collaboration events
    socket.on('cursor-move', (data: any) => {
      const { projectId, position } = data
      socket.to(`project:${projectId}`).emit('cursor-moved', {
        userId: socket.id,
        position
      })
    })

    // VST plugin loading
    socket.on('vst-loaded', (data: any) => {
      const { projectId, trackId, pluginId } = data
      socket.to(`project:${projectId}`).emit('vst-plugin-loaded', {
        trackId,
        pluginId,
        userId: socket.id
      })
    })

    // Playback synchronization
    socket.on('playback-control', (data: any) => {
      const { projectId, action, position } = data
      socket.to(`project:${projectId}`).emit('playback-sync', {
        action, // 'play', 'pause', 'stop', 'seek'
        position,
        userId: socket.id
      })
    })

    // Chat messages
    socket.on('chat-message', (data: any) => {
      const { projectId, message } = data
      socket.to(`project:${projectId}`).emit('chat-message-received', {
        userId: socket.id,
        message,
        timestamp: new Date().toISOString()
      })
    })

    // AI Producer suggestions
    socket.on('ai-suggestion-request', (data: any) => {
      const { projectId, context } = data
      // Simulate AI processing
      setTimeout(() => {
        socket.emit('ai-suggestion', {
          suggestion: 'Try adding a compressor to the vocal track for more presence',
          type: 'mixing',
          confidence: 0.85
        })
      }, 1000)
    })

    // Disconnect
    socket.on('disconnect', () => {
      console.log(`🔌 Client disconnected: ${socket.id}`)
    })
  })
}
