import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/people': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/planets': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/favorite': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})






