// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // مسیر پایه برای دامنه سفارشی به ریشه تغییر کرد
  base: '/', 
})