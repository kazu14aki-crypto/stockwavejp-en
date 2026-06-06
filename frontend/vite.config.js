import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts', '.json'],
  },
  base: '/',
  define: {
    'import.meta.env.VITE_API_URL':           JSON.stringify('https://stockwavejp-en-api.onrender.com'),
    'import.meta.env.VITE_SUPABASE_URL':      JSON.stringify('https://jolsexgwfljymfyjutei.supabase.co'),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvbHNleGd3ZmxqeW1meWp1dGVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNDAwODcsImV4cCI6MjA5MzcxNjA4N30.XtTv7lIWLXnSYRlzRftExuzkSTT8PbMhzGleCn45FQw'),
  },
  server: {
    host: true,
    port: 5173,
  },
  build: {
    chunkSizeWarningLimit: 1500,
    cssMinify: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor'
          }
          if (id.includes('columnData')) {
            return 'column-data'
          }
        },
      },
    },
  },
})
