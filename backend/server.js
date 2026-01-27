import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import compression from 'compression'
import { connectDB } from './config/database.js'
import contactRoutes from './routes/contactRoutes.js'

// Initialize express
const app = express()

// ✅ Trust Proxy (for Render/Express Rate Limit) - MUST BE SET EARLY
app.set('trust proxy', 1)

// ✅ Diagnostic Logs for Render Environment
console.log('--- Startup Diagnostic Check ---')
console.log(`Node Version: ${process.version}`)
console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
console.log(`PORT: ${process.env.PORT || 5000}`)
console.log(`MONGO_URI exists: ${!!process.env.MONGO_URI}`)
console.log(`GMAIL_USER exists: ${!!process.env.GMAIL_USER}`)
if (process.env.NODE_ENV !== 'production') {
  console.log(`GMAIL_APP_PASS length: ${process.env.GMAIL_APP_PASS?.length || 0}`)
}

console.log('--------------------------------')

// ✅ Request Logger (for debugging)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
})

// ✅ Compression
app.use(compression())

// ✅ CORS (Vercel + Local)
app.use(
  cors({
    origin: [
      'https://algoforceaii.com',
      'https://www.algoforceaii.com',
      'http://localhost:3000',
      'http://localhost:5173'
    ],
    methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400
  })
)
app.options('*', cors())


// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/contact', contactRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'AlgoForce API is running',
    time: new Date().toISOString()
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err)
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  })
})

// Start server AFTER DB connects
const PORT = process.env.PORT || 5000

connectDB()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 AlgoForce Backend running on port ${PORT}`)
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'production'}`)
    })
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message)
    process.exit(1)
  })
