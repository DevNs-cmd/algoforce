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
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure proper asset paths
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  // SPA fallback for production preview
  preview: {
    port: 3000,
    strictPort: false
  }
})
