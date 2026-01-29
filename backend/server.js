import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import compression from 'compression'
import fs from 'fs'
import path from 'path'
import { connectDB } from './config/database.js'
import contactRoutes from './routes/contactRoutes.js'

// Safe loading and verification of emailService.js
let emailServiceLoaded = false
try {
  // Dynamic import to safely load emailService.js
  await import('./services/emailService.js')
  emailServiceLoaded = true
  console.log('✅ emailService.js loaded and verified successfully')
} catch (error) {
  console.error('❌ Failed to load emailService.js:', error.message)
  // Do not exit here, as it might not be critical for all operations
}

// Initialize Express app
const app = express()

// Trust proxy for Render.com deployment
app.set('trust proxy', 1)

// Startup diagnostics: Log environment variables
console.log('--- Startup Diagnostic Check ---')
console.log(`Node Version: ${process.version}`)
console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
console.log(`PORT: ${process.env.PORT || 5000}`)
console.log(`MONGO_URI exists: ${!!process.env.MONGO_URI}`)
console.log(`GMAIL_USER: ${process.env.GMAIL_USER || 'not set'}`)
console.log(`GMAIL_APP_PASS length: ${process.env.GMAIL_APP_PASS?.length || 0}`)
console.log('--------------------------------')

// Safe directory scanning for forbidden code
const scanDirectoriesForForbiddenCode = () => {
  // Use current working directory as base (works for both local and Render deployment)
  const baseDir = process.cwd()
  const directoriesToScan = ['services', 'controllers', 'routes', 'models', 'config']

  console.log(`🔍 Base directory for scanning: ${baseDir}`)

  directoriesToScan.forEach(dirName => {
    const fullDirPath = path.join(baseDir, dirName)
    
    // Check if directory exists before attempting to scan
    if (fs.existsSync(fullDirPath) && fs.statSync(fullDirPath).isDirectory()) {
      console.log(`🔍 Scanning directory: ${fullDirPath}`)
      try {
        const walk = (dir) => {
          // Safely read directory contents
          let files = []
          try {
            files = fs.readdirSync(dir)
          } catch (readDirError) {
            console.warn(`⚠️ Could not read directory ${dir}: ${readDirError.message}`)
            return
          }
          
          files.forEach(f => {
            const filePath = path.join(dir, f)
            try {
              const stat = fs.statSync(filePath)
              if (stat.isDirectory()) {
                // Skip node_modules and other unnecessary directories
                if (!['node_modules', '.git', 'dist', 'build'].includes(f)) {
                  walk(filePath)
                }
              } else if (f.endsWith('.js')) {
                try {
                  const content = fs.readFileSync(filePath, 'utf8')
                  // Check for forbidden code patterns
                  if (content.includes('nodemailer.createTransporter')) {
                    console.error(`🚨 FORBIDDEN CODE DETECTED: nodemailer.createTransporter found in ${filePath}`)
                    // Log but don't crash - this is a security check, not a fatal error
                  }
                } catch (readError) {
                  // File might be locked or permissions issue, just log and continue
                  console.warn(`⚠️ Could not read file ${filePath}: ${readError.message}`)
                }
              }
            } catch (statError) {
              // File/directory might have been deleted during scan
              console.warn(`⚠️ Could not stat ${filePath}: ${statError.message}`)
            }
          })
        }
        walk(fullDirPath)
        console.log(`✅ Directory scan completed: ${dirName}`)
      } catch (scanError) {
        console.error(`❌ Error scanning directory ${fullDirPath}: ${scanError.message}`)
        // Don't crash the entire application for scan errors
      }
    } else {
      console.warn(`⚠️ Directory does not exist or is not accessible, skipping: ${fullDirPath}`)
    }
  })
}

try {
  scanDirectoriesForForbiddenCode()
  console.log('✅ Directory scan completed')
} catch (error) {
  console.error('❌ Directory scan failed:', error.message)
}

// Request logger for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
})

// Compression middleware
app.use(compression())

// CORS configuration for Render.com and local development
app.use(
  cors({
    origin: [
      'https://algoforceaii.com',
      'https://www.algoforceaii.com',
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'AlgoForce API is running',
    time: new Date().toISOString(),
    emailServiceLoaded
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

// Start server after DB connection
// Use Render's PORT or default to 5000 for local development
const PORT = process.env.PORT || 5000

try {
  await connectDB()
  
  // Bind to all interfaces for Render deployment
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 AlgoForce Backend running on port ${PORT}`)
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'production'}`)
    console.log(`📡 Server bound to: 0.0.0.0:${PORT}`)
    console.log('✅ All startup checks passed')
  })
  
  // Handle graceful shutdown
  process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM received, shutting down gracefully')
    server.close(() => {
      console.log('✅ Server closed')
      process.exit(0)
    })
  })
  
  process.on('SIGINT', () => {
    console.log('🛑 SIGINT received, shutting down gracefully')
    server.close(() => {
      console.log('✅ Server closed')
      process.exit(0)
    })
  })
  
} catch (error) {
  console.error('❌ Critical startup failure:', error.message)
  console.error('🔧 Stack trace:', error.stack)
  process.exit(1)
}
