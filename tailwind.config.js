/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#050b18',
          card: '#0a162d',
          cardLight: '#112244',
          cyan: '#38bdf8',
          amber: '#fbbf24',
          purple: '#c084fc',
          rose: '#fb7185',
        }
      }
    },
  },
  plugins: [],
}
