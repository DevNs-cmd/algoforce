import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',        // ✅ ensures favicon + robots + sitemap
  assetsInclude: ['**/*.glb'],
  server: {
    port: 3000,
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
    // Raise warning threshold — we already split manually
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Split large vendor libraries into separate async chunks
        // so mobile devices only load what they need per page
        manualChunks(id) {
          // Three.js / React-Three-Fiber ecosystem (only used in AI Builder)
          if (
            id.includes('three') ||
            id.includes('@react-three') ||
            id.includes('@monogrid') ||
            id.includes('postprocessing') ||
            id.includes('maath')
          ) {
            return 'vendor-three';
          }
          // Monaco editor (only used in AI Builder)
          if (id.includes('@monaco-editor') || id.includes('monaco-editor')) {
            return 'vendor-monaco';
          }
          // Framer Motion (animation library, large but widely used)
          if (id.includes('framer-motion')) {
            return 'vendor-motion';
          }
          // React Icons
          if (id.includes('react-icons')) {
            return 'vendor-icons';
          }
          // React core + Router + Helmet
          if (
            id.includes('react-dom') ||
            id.includes('react-router') ||
            id.includes('react-helmet')
          ) {
            return 'vendor-react';
          }
          // Supabase
          if (id.includes('@supabase')) {
            return 'vendor-supabase';
          }
        }
      }
    }
  },
  // SPA fallback for production preview
  preview: {
    port: 3000,
    strictPort: false
  }
})
