/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // ✅ Questo è fondamentale per Vite
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}