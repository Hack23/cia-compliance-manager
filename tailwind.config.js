/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      // Spacing scale based on 8px grid system
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        'xxl': '48px',
      },
      // Typography scale
      fontSize: {
        'caption': ['0.75rem', { lineHeight: '1.25' }],
        'body': ['0.875rem', { lineHeight: '1.5' }],
        'body-lg': ['1rem', { lineHeight: '1.5' }],
        'subheading': ['1.125rem', { lineHeight: '1.5' }],
        'heading': ['1.5rem', { lineHeight: '1.25' }],
        'title': ['2rem', { lineHeight: '1.25' }],
        'display': ['2.5rem', { lineHeight: '1.25' }],
      },
      // Font weights
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      // Semantic colors
      colors: {
        primary: {
          light: '#2b8aff',
          DEFAULT: '#0066cc',
          dark: '#004d99',
        },
        success: {
          light: '#4caf50',
          DEFAULT: '#27ae60',
          dark: '#1e8449',
        },
        warning: {
          light: '#feca57',
          DEFAULT: '#f1c40f',
          dark: '#f39c12',
        },
        error: {
          light: '#ff6b6b',
          DEFAULT: '#e74c3c',
          dark: '#c0392b',
        },
        info: {
          light: '#54a0ff',
          DEFAULT: '#3498db',
          dark: '#2980b9',
        },
        neutral: {
          light: '#b8b8cc',
          DEFAULT: '#95a5a6',
          dark: '#7f8c8d',
        },
      },
      // Border radius
      borderRadius: {
        'none': '0',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        'full': '9999px',
      },
      // Shadows
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 2px 8px 0 rgba(0, 0, 0, 0.1)',
        'lg': '0 4px 16px 0 rgba(0, 0, 0, 0.15)',
        'xl': '0 8px 24px 0 rgba(0, 0, 0, 0.2)',
        'xxl': '0 12px 32px 0 rgba(0, 0, 0, 0.25)',
        'none': 'none',
      },
      // Transitions
      transitionDuration: {
        'fast': '150ms',
        'normal': '200ms',
        'slow': '300ms',
      },
      // Easing functions
      transitionTimingFunction: {
        'default': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'in': 'cubic-bezier(0.4, 0, 1, 1)',
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
        'sharp': 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
    },
  },
  // Enable v3 compatibility mode
  future: {
    respectDefaultRingColorOpacity: false,
    disableColorOpacityUtilitiesByDefault: false,
  },
  plugins: [],
};
