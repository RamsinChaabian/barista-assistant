// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // استراتژی 'autoUpdate' سرویس ورکر را در پس‌زمینه آپدیت می‌کند.
      // ما در کامپوننت React خود به کاربر اطلاع خواهیم داد که آپدیت جدیدی در دسترس است.
      registerType: 'autoUpdate',
      
      // فعال کردن قابلیت آفلاین کامل با کش کردن تمام فایل‌های استاتیک
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff2}'],
      },

      // فایل مانیفست برای تعریف برنامه
      manifest: {
        name: 'باریستانو',
        short_name: 'باریستانو',
        description: 'دستیار باریستا برای مشاهده دستور نوشیدنی‌ها',
        theme_color: '#6F4E37', // رنگ تم (قهوه‌ای)
        background_color: '#1a1a1a', // رنگ پس‌زمینه هنگام لود شدن
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
        icons: [
          {
            src: 'logo.svg', // لوگوی فعلی شما
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
          {
            src: 'pwa-192x192.png', // آیکون پیشنهادی برای PWA
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png', // آیکون پیشنهادی برای PWA
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  // مسیر پایه برای دامنه سفارشی به ریشه تغییر کرد
  base: '/',
})