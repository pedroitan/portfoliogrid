/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'rgba(255, 255, 255, 0.1)',
        background: '#000000',
        foreground: '#ffffff',
        primary: '#ffffff',
        muted: 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
}
