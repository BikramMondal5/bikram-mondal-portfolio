import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add alias for #minpath used by vfile
      '#minpath': path.resolve(__dirname, 'node_modules/path-browserify/index.js'),
    }
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignore certain warnings
        if (warning.code === 'UNRESOLVED_IMPORT' && warning.source.startsWith('#')) {
          return
        }
        warn(warning)
      }
    }
  }
})
