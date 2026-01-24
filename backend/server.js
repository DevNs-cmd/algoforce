import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import compression from 'compression'
import { connectDB } from './config/database.js'
import contactRoutes from './routes/contactRoutes.js'

// Initialize express
const app = express()

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
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

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
