// /gebral-Estate/ui/tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html"
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#2563eb',
            dark: '#1d4ed8',
            light: '#60a5fa',
          },
          secondary: {
            DEFAULT: '#8b5cf6',
            dark: '#7c3aed',
            light: '#a78bfa',
          },
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
          info: '#3b82f6',
          dark: {
            DEFAULT: '#1e293b',
            deeper: '#0f172a',
          },
          light: '#f8fafc',
          gray: {
            DEFAULT: '#64748b',
            light: '#cbd5e1',
            dark: '#475569',
          },
        },
        fontFamily: {
          heading: ['Poppins', 'sans-serif'],
          body: ['Inter', 'sans-serif'],
        },
        boxShadow: {
          glass: '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
          card: '0 4px 20px 0 rgba(0, 0, 0, 0.1)',
          'card-hover': '0 10px 30px 0 rgba(0, 0, 0, 0.2)',
        },
        backdropBlur: {
          xs: '2px',
          sm: '4px',
          DEFAULT: '8px',
          lg: '12px',
          xl: '16px',
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease forwards',
          'slide-up': 'slideUp 0.4s ease forwards',
          'pulse-subtle': 'pulse 2s infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: 0 },
            '100%': { transform: 'translateY(0)', opacity: 1 },
          },
          pulse: {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.6 },
          },
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
    ],
  };

  