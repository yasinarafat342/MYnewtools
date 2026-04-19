import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // এই লাইনটি যোগ হয়েছে

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // এখানে এটি যোগ হয়েছে
  ],
})