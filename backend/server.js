import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import compression from 'compression'
import { connectDB } from './config/database.js'
import contactRoutes from './routes/contactRoutes.js'

// Initialize Express app
const app = express()

// Trust proxy for cloud platforms (Northflank / Render / Railway)
app.set('trust proxy', 1)

// Basic startup info (safe for production)
const PORT = process.env.PORT || 8080
console.log(`🚀 Starting AlgoForce Backend`)
console.log(`🌍 Environment: ${process.env.NODE_ENV || 'production'}`)
console.log(`🔌 Port: ${PORT}`)

// Compression middleware
app.use(compression())

// CORS configuration
app.use(
  cors({
    origin: [
      'https://www.algoforceaii.com',
      'https://algoforceaii.com',
      'https://algoforceofficial.vercel.app',
      'http://localhost:3000',
      'http://localhost:5173'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400
  })
)

app.options('*', cors())

// Body parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API routes
app.use('/api/contact', contactRoutes)

// Root endpoint (keep-alive / sanity check)
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'AlgoForce Backend is running',
    time: new Date().toISOString(),
    version: '2.0.0'
  })
})

// API health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'AlgoForce API is healthy',
    time: new Date().toISOString(),
    version: '2.0.0'
  })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err)
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  })
})

// Start server AFTER database connection
try {
  await connectDB()

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Backend running on 0.0.0.0:${PORT}`)
  })

  // Graceful shutdown
  const shutdown = (signal) => {
    console.log(`🛑 ${signal} received, shutting down`)
    server.close(() => {
      console.log('✅ Server closed')
      process.exit(0)
    })
  }

  process.on('SIGTERM', shutdown)
  process.on('SIGINT', shutdown)

} catch (error) {
  console.error('❌ Startup failed:', error.message)
  process.exit(1)
}
