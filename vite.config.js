import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add aliases for Node.js internal modules used by vfile
      '#minpath': path.resolve(__dirname, 'node_modules/path-browserify/index.js'),
      '#minproc': path.resolve(__dirname, 'src/utils/process-stub.js'),
      '#minurl': path.resolve(__dirname, 'node_modules/url/url.js'),
      '#minfs': path.resolve(__dirname, 'src/utils/fs-stub.js'),
      // Direct alias for process
      'process': path.resolve(__dirname, 'src/utils/process-stub.js'),
    }
  },
  define: {
    global: 'globalThis',
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
