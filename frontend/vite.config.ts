import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://dh4hs2p9oh.execute-api.ap-northeast-1.amazonaws.com'
    }
  }
})
