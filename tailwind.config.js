/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#e10600', // Vibrant red
          dark: '#b30500',
          light: '#ff3b36'
        },
        secondary: {
          DEFAULT: '#000000', // Pure black
          light: '#333333',
          dark: '#000000'
        },
        white: '#ffffff',
        black: '#000000',
        background: {
          DEFAULT: '#ffffff', // White background
          alt: '#f5f5f5', // Very light gray alternative
        },
        gold: '#e10600', // Changed gold to red to maintain the strict color scheme
      },
      fontFamily: {
        sans: ['Poppins', 'Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Playfair Display', 'serif']
      },
      boxShadow: {
        'custom': '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
        'custom-lg': '0 20px 40px -5px rgba(0, 0, 0, 0.1)',
        'red-glow': '0 0 15px rgba(225, 6, 0, 0.5)',
        'gold-glow': '0 0 15px rgba(225, 6, 0, 0.5)', // Changed to match red glow
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'slide-down': 'slideDown 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
