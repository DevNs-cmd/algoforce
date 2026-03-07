import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import { connectDB } from './config/database.js'
import contactRoutes from './routes/contactRoutes.js'
import authRoutes from './routes/authRoutes.js'
import aiRoutes from './routes/aiRoutes.js'
import projectRoutes from './routes/projectRoutes.js'

// Initialize Express app
const app = express()

// Security middleware
app.use(helmet({
  hsts: {
    maxAge: 31536000, // 1 year in seconds
    includeSubDomains: true,
    preload: true
  },
  frameguard: { action: 'deny' },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
      fontSrc: ["'self'", 'fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https:'],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", 'https://pagead2.googlesyndication.com', 'https://api.openai.com', 'https://api.anthropic.com', 'https://openrouter.ai']
    }
  }
}))

// Middleware to force www and HTTPS
app.use((req, res, next) => {
  const host = req.get('Host');
  const protocol = req.secure ? 'https' : 'http';

  // Check if the host is the non-www version
  if (host && host === 'algoforceaii.com') {
    // Redirect to www version with HTTPS
    return res.redirect(301, `https://www.algoforceaii.com${req.originalUrl}`);
  }

  // If not HTTPS and not localhost, redirect to HTTPS
  if (!req.secure && host && !host.startsWith('localhost')) {
    return res.redirect(301, `https://www.algoforceaii.com${req.originalUrl}`);
  }

  next();
});

// Trust proxy for cloud platforms (Northflank / Render / Railway)
app.set('trust proxy', 1)

// Validate environment variables at startup
const requiredEnvVars = ['PORT'];
console.log('🔧 Validating environment variables...');

// Check for PORT, with fallback
const PORT = process.env.PORT || 8080;
console.log(`🔌 Port: ${PORT}`);

// Check for MongoDB configuration
if (process.env.MONGODB_URI || process.env.MONGO_URI) {
  console.log('✅ MongoDB URI configured');
} else {
  console.log('⚠️  MongoDB URI not set, will use local development default');
}

// Check for Twilio configuration
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_SERVICE_SID) {
  console.log('✅ Twilio configured');
} else {
  console.log('⚠️  Twilio not configured - using mock service for development');
}

console.log(`🌍 Environment: ${process.env.NODE_ENV || 'production'}`);
console.log(`🚀 Starting AlgoForce Backend`);

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
      'http://localhost:5173',
      'http://localhost:4173'
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
app.use('/api/auth', authRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/projects', projectRoutes)

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
