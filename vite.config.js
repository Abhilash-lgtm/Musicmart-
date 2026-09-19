import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ensures SPA fallback: all routes serve index.html (important for Render Static Site)
  appType: 'spa',
})
