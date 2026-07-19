import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  assetsInclude: ['**/*.glb'],
  define: {
    // Tell Monaco Editor to not use constructed stylesheets (fixes @import warning)
    'globalThis.MonacoEnvironment': 'undefined',
  },
  optimizeDeps: {
    include: ['@monaco-editor/react'],
  },
  server: {
    port: 3001,
    strictPort: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('three') ||
            id.includes('@react-three') ||
            id.includes('@monogrid') ||
            id.includes('postprocessing') ||
            id.includes('maath')
          ) {
            return 'vendor-three'
          }
          if (id.includes('@monaco-editor') || id.includes('monaco-editor')) {
            return 'vendor-monaco'
          }
          if (id.includes('framer-motion')) {
            return 'vendor-motion'
          }
          if (id.includes('react-icons')) {
            return 'vendor-icons'
          }
          if (
            id.includes('react-dom') ||
            id.includes('react-router') ||
            id.includes('react-helmet')
          ) {
            return 'vendor-react'
          }
          if (id.includes('@supabase')) {
            return 'vendor-supabase'
          }
        }
      }
    }
  },
  preview: {
    port: 3000,
    strictPort: false
  }
})

