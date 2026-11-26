import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind v4: no tailwind.config.js or postcss.config.js needed
  ],
  resolve: {
    alias: {
      // import Button from '@/components/ui/Button' instead of '../../../components/ui/Button'
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
