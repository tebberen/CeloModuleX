import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/CeloModuleX/',
  build: {
    outDir: '../docs/site',
    emptyOutDir: true,
  },
  define: {
    global: 'globalThis',
  }
})
