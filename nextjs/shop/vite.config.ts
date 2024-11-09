import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { config } from 'dotenv';

config();

export default defineConfig({
  plugins: [react()],
  server : {
    port : 8000
  },
  define: {
    'process.env': process.env
  }
})
