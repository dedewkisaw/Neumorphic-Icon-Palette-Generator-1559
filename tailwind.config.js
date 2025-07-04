/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Enhanced neumorphic color palette
        warm: {
          50: '#fefcfb',
          100: '#fef7ed', 
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#78716c',
        },
        primary: {
          50: '#f0f4ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#c84bff', // Your brand primary
          600: '#b52fff',
          700: '#9f1aff',
          800: '#8b00e6',
          900: '#7600cc',
        },
        secondary: {
          50: '#fef7ff',
          100: '#fdf2ff',
          200: '#fce7ff',
          300: '#f8d4fe',
          400: '#f0abfc',
          500: '#f97316', // Your brand secondary
          600: '#ea580c',
          700: '#dc2626',
          800: '#c2410c',
          900: '#a16207',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        coral: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#ff7a7a',
          500: '#ff5757',
          600: '#f03e3e',
          700: '#dc2626',
          800: '#b91c1c',
          900: '#991b1b',
        },
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        }
      },
      backgroundImage: {
        'neumorphic-gradient': 'linear-gradient(145deg, #fefcfb 0%, #f1f5f9 100%)',
        'neumorphic-card': 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        'primary-gradient': 'linear-gradient(135deg, #c84bff 0%, #f97316 100%)',
        'secondary-gradient': 'linear-gradient(135deg, #f97316 0%, #14b8a6 100%)',
        'warm-glow': 'radial-gradient(circle at center, rgba(200,75,255,0.1) 0%, transparent 70%)',
        'purple-glow': 'radial-gradient(circle at center, rgba(200,75,255,0.2) 0%, transparent 70%)',
      },
      boxShadow: {
        'neumorphic': '12px 12px 24px #e2e8f0, -12px -12px 24px #ffffff',
        'neumorphic-sm': '6px 6px 12px #e2e8f0, -6px -6px 12px #ffffff',
        'neumorphic-lg': '20px 20px 40px #d1d5db, -20px -20px 40px #ffffff',
        'neumorphic-xl': '30px 30px 60px #cbd5e1, -30px -30px 60px #ffffff',
        'neumorphic-inset': 'inset 8px 8px 16px #e2e8f0, inset -8px -8px 16px #ffffff',
        'neumorphic-button': '8px 8px 16px #e2e8f0, -8px -8px 16px #ffffff',
        'neumorphic-pressed': 'inset 6px 6px 12px #d1d5db, inset -6px -6px 12px #ffffff',
        'warm-glow': '0 0 30px rgba(200,75,255,0.3), 0 0 60px rgba(249,115,22,0.2)',
        'purple-glow': '0 0 20px rgba(200,75,255,0.4)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 2s infinite',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { 
            textShadow: '0 0 5px rgba(200,75,255,0.5)',
            filter: 'drop-shadow(0 0 10px rgba(200,75,255,0.3))'
          },
          '50%': { 
            textShadow: '0 0 20px rgba(200,75,255,0.8), 0 0 30px rgba(249,115,22,0.5)',
            filter: 'drop-shadow(0 0 20px rgba(200,75,255,0.6))'
          },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}