/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // تمام فایل‌های jsx را پوشش می‌دهد
  ],
  theme: {
    extend: {
    fontFamily: {
      'vazir': ['Vazirmatn', 'sans-serif'], // اضافه کردن فونت وزیرمتن
    },
      colors: {
        'coffee-brown': '#6F4E37',
        'cream': '#F5F5DC',
        'dark-cream': '#EEDC82',
        'warm-light': '#FFF8E7',
      },
    },
  },
  plugins: [],
}