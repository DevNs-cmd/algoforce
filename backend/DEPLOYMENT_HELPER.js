#!/usr/bin/env node

/**
 * Deployment Helper Script for Render.com
 * 
 * This script helps verify the deployment environment and
 * provides diagnostic information for troubleshooting.
 * 
 * Usage: node DEPLOYMENT_HELPER.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Get current directory (works with ES modules)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('=== AlgoForce Backend Deployment Diagnostic ===\n')

// 1. Check environment
console.log('1. Environment Check:')
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'not set'}`)
console.log(`   PORT: ${process.env.PORT || 'not set (will use 5000)'}`)
console.log(`   Current Directory: ${process.cwd()}`)
console.log(`   Script Directory: ${__dirname}\n`)

// 2. Check required environment variables
console.log('2. Environment Variables Check:')
const requiredVars = ['MONGO_URI', 'GMAIL_APP_PASS']
const missingVars = []

requiredVars.forEach(envVar => {
  if (process.env[envVar]) {
    console.log(`   ✅ ${envVar}: Set (${process.env[envVar].length} characters)`)
  } else {
    console.log(`   ❌ ${envVar}: Missing`)
    missingVars.push(envVar)
  }
})

if (missingVars.length > 0) {
  console.log(`\n   ⚠️  WARNING: Missing required environment variables: ${missingVars.join(', ')}`)
  console.log('   Please set these in your Render dashboard under Environment Variables.\n')
}

// 3. Check directory structure
console.log('3. Directory Structure Check:')
const expectedDirs = ['services', 'controllers', 'routes', 'config', 'models']
const baseDir = process.cwd()

expectedDirs.forEach(dir => {
  const dirPath = path.join(baseDir, dir)
  if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
    console.log(`   ✅ ${dir}/ exists`)
    
    // Count JS files
    try {
      const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.js'))
      console.log(`      └─ ${files.length} JS files found`)
    } catch (err) {
      console.log(`      └─ ❌ Could not read directory: ${err.message}`)
    }
  } else {
    console.log(`   ⚠️  ${dir}/ missing or not accessible`)
  }
})

// 4. Check package.json
console.log('\n4. Package.json Check:')
try {
  const packagePath = path.join(baseDir, 'package.json')
  if (fs.existsSync(packagePath)) {
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
    console.log(`   ✅ name: ${pkg.name}`)
    console.log(`   ✅ version: ${pkg.version}`)
    console.log(`   ✅ type: ${pkg.type || 'commonjs (default)'}`)
    console.log(`   ✅ main: ${pkg.main || 'index.js'}`)
    
    if (pkg.scripts && pkg.scripts.start) {
      console.log(`   ✅ start script: ${pkg.scripts.start}`)
    } else {
      console.log(`   ⚠️  No start script found`)
    }
  } else {
    console.log(`   ❌ package.json not found`)
  }
} catch (err) {
  console.log(`   ❌ Error reading package.json: ${err.message}`)
}

// 5. Check server.js
console.log('\n5. Server.js Check:')
try {
  const serverPath = path.join(baseDir, 'server.js')
  if (fs.existsSync(serverPath)) {
    const content = fs.readFileSync(serverPath, 'utf8')
    console.log(`   ✅ server.js exists (${content.length} characters)`)
    
    // Check for key components
    const checks = [
      { pattern: /import.*express/, label: 'Express import' },
      { pattern: /app\.listen/, label: 'Server listen call' },
      { pattern: /process\.env\.PORT/, label: 'PORT environment variable' },
      { pattern: /connectDB/, label: 'Database connection' }
    ]
    
    checks.forEach(check => {
      if (check.pattern.test(content)) {
        console.log(`   ✅ ${check.label} found`)
      } else {
        console.log(`   ⚠️  ${check.label} not found`)
      }
    })
  } else {
    console.log(`   ❌ server.js not found`)
  }
} catch (err) {
  console.log(`   ❌ Error reading server.js: ${err.message}`)
}

// 6. Summary
console.log('\n=== Summary ===')
if (missingVars.length === 0) {
  console.log('✅ All required environment variables are set')
} else {
  console.log('❌ Missing environment variables - deployment will fail')
}

console.log('\n🔧 Deployment Tips:')
console.log('1. In Render dashboard, set Build Command: npm install')
console.log('2. Set Start Command: node server.js')
console.log('3. Set Root Directory: backend/')
console.log('4. Add Environment Variables: MONGO_URI, GMAIL_APP_PASS')
console.log('5. Ensure your MongoDB URI is correct and accessible')

console.log('\n🚀 Ready for deployment!\n')