import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createGeminiMiddleware } from './server/middleware'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'gemini-api',
      configureServer(server) {
        createGeminiMiddleware(server.middlewares)
      },
    },
  ],
})
