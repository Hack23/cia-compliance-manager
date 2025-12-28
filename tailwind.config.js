/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      // Spacing scale based on 8px grid system
      // Fixed: Further optimized spacing to reduce widget empty space
      spacing: {
        'xs': '4px',
        'sm': '6px',     // Reduced from 8px - tighter spacing
        'md': '8px',     // Reduced from 12px - fixes 50% blank space issue
        'lg': '16px',    // Reduced from 20px - better proportion
        'xl': '24px',    // Reduced from 32px - more compact
        'xxl': '40px',   // Reduced from 48px - consistent reduction
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
      // Fixed: Changed from blue to purple to restore v1.0.6 appearance
      colors: {
        primary: {
          light: '#c084fc',  // purple-400 - Changed from blue
          DEFAULT: '#9333ea', // purple-600 - Changed from blue
          dark: '#7e22ce',    // purple-700 - Changed from blue
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
          light: '#60a5fa',  // blue-400 - Keep blue for info
          DEFAULT: '#3b82f6', // blue-500 - Keep blue for info  
          dark: '#2563eb',    // blue-600 - Keep blue for info
        },
        neutral: {
          light: '#b8b8cc',
          DEFAULT: '#95a5a6',
          dark: '#7f8c8d',
        },
      },
      // Border radius
      // Fixed: Increased md and lg to restore rounded appearance from v1.0.6
      borderRadius: {
        'none': '0',
        'sm': '4px',
        'md': '12px',  // Changed from 8px - more rounded appearance
        'lg': '16px',  // Changed from 12px - restore v1.0.6 look
        'xl': '20px',  // Changed from 16px - better proportion
        'full': '9999px',
      },
      // Shadows
      boxShadow: {
        'none': 'none',
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 2px 8px 0 rgba(0, 0, 0, 0.1)',
        'lg': '0 4px 16px 0 rgba(0, 0, 0, 0.15)',
        'xl': '0 8px 24px 0 rgba(0, 0, 0, 0.2)',
        'xxl': '0 12px 32px 0 rgba(0, 0, 0, 0.25)',
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
