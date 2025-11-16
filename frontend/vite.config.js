import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/CeloModuleX/',
  plugins: [react()],
  build: {
    outDir: '../docs/site',
    emptyOutDir: true,
  }
})
