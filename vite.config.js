import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/alishamahmood/',
  plugins: [react()],
  optimizeDeps: {
    include: ['react-globe.gl', 'three'],
  },
})
