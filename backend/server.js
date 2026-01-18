import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import contactRoutes from './routes/contactRoutes.js'

// Load environment variables
dotenv.config()

// Initialize express
const app = express()

// ✅ CORS FIX (IMPORTANT FOR MOBILE + NETLIFY)
app.use(
  cors({
    origin: [
      'https://algoforceofficial.netlify.app', // your deployed React frontend
      'http://localhost:3000',                 // optional: local dev
      'https://algoforce.in'                   // optional: future domain
    ],
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type'],
    credentials: true // needed if you use cookies or auth
  })
)


// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/contact', contactRoutes)

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'AlgoForce API is running',
    timestamp: new Date().toISOString()
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err)
  res.status(500).json({
    success: false,
    message: 'Something went wrong. Please try again later.'
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 AlgoForce Backend running on port ${PORT}`)
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
})
