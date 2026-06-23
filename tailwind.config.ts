import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#FFD6E0',
          'pink-deep': '#F4A7B9',
          'pink-btn': '#E8829A',
          beige: '#FFF5E6',
          cream: '#FFFBF0',
          mint: '#D4F1E8',
          'mint-deep': '#85D4BC',
          lavender: '#E8D5F5',
          blue: '#D5E8F5',
          yellow: '#FFF9C4',
        },
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'Hiragino Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
