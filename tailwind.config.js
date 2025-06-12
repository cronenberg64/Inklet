/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007AFF',
        secondary: '#5856D6',
        background: '#FFFFFF',
        'background-dark': '#1A1A1A',
        text: '#000000',
        'text-dark': '#FFFFFF',
      },
    },
  },
  plugins: [],
} 