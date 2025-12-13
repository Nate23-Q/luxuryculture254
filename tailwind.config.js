/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette for Shop JR
        primary: {
          DEFAULT: '#FFFFFF', // Pure White
          50: '#FFFFFF',
          100: '#FEFEFE',
          200: '#FDFDFD',
          300: '#FBFBFB',
          400: '#F9F9F9',
          500: '#FFFFFF',
          600: '#F7F7F7',
          700: '#F5F5F5',
          800: '#F3F3F3',
          900: '#F1F1F1',
        },
        secondary: {
          DEFAULT: '#000000', // Pure Black
          50: '#F7F7F7',
          100: '#EFEFEF',
          200: '#DFDFDF',
          300: '#CFCFCF',
          400: '#BFBFBF',
          500: '#AFAFAF',
          600: '#9F9F9F',
          700: '#8F8F8F',
          800: '#7F7F7F',
          900: '#000000',
        },
        accent: {
          DEFAULT: '#FF0000', // Vibrant Red
          50: '#FFE5E5',
          100: '#FFCCCC',
          200: '#FF9999',
          300: '#FF6666',
          400: '#FF3333',
          500: '#FF0000',
          600: '#E60000',
          700: '#CC0000',
          800: '#B30000',
          900: '#990000',
        },
        // Semantic color aliases
        background: '#FFFFFF',
        foreground: '#000000',
        border: '#000000',
        input: '#FFFFFF',
        ring: '#FF0000',
        destructive: {
          DEFAULT: '#FF0000',
          foreground: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'accent': '0 4px 14px 0 rgba(255, 0, 0, 0.39)',
        'black': '0 4px 14px 0 rgba(0, 0, 0, 0.39)',
      },
      borderRadius: {
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [],
}
