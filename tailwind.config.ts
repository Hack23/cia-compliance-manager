import type { Config } from 'tailwindcss';
import {
  SPACING,
  TYPOGRAPHY,
  FONT_WEIGHTS,
  SEMANTIC_COLORS,
  BORDER_RADIUS,
  SHADOWS,
  TRANSITIONS,
  EASING,
} from './src/constants/designTokens';

/**
 * Tailwind CSS Configuration
 * 
 * This configuration imports design tokens from src/constants/designTokens.ts
 * to establish a single source of truth for the design system.
 * 
 * All spacing, typography, colors, border radius, and shadows are defined
 * in designTokens.ts and imported here to ensure consistency across the application.
 */
const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      // Spacing scale imported from designTokens.ts
      // Primarily aligned to an 8px grid, with optimized values to reduce widget empty space
      spacing: {
        xs: SPACING.xs,
        sm: SPACING.sm,
        md: SPACING.md,
        lg: SPACING.lg,
        xl: SPACING.xl,
        xxl: SPACING.xxl,
      },
      // Typography scale
      // Imported from designTokens.ts
      fontSize: {
        caption: [TYPOGRAPHY.caption, { lineHeight: '1.25' }],
        body: [TYPOGRAPHY.body, { lineHeight: '1.5' }],
        'body-lg': [TYPOGRAPHY.bodyLarge, { lineHeight: '1.5' }],
        subheading: [TYPOGRAPHY.subheading, { lineHeight: '1.5' }],
        heading: [TYPOGRAPHY.heading, { lineHeight: '1.25' }],
        title: [TYPOGRAPHY.title, { lineHeight: '1.25' }],
        display: [TYPOGRAPHY.display, { lineHeight: '1.25' }],
      },
      // Font weights
      // Imported from designTokens.ts
      fontWeight: {
        normal: FONT_WEIGHTS.normal,
        medium: FONT_WEIGHTS.medium,
        semibold: FONT_WEIGHTS.semibold,
        bold: FONT_WEIGHTS.bold,
      },
      // Semantic colors
      // Imported from designTokens.ts - uses purple for primary to restore v1.0.6 appearance
      colors: {
        primary: {
          light: SEMANTIC_COLORS.primary.light,
          DEFAULT: SEMANTIC_COLORS.primary.main,
          dark: SEMANTIC_COLORS.primary.dark,
        },
        success: {
          light: SEMANTIC_COLORS.success.light,
          DEFAULT: SEMANTIC_COLORS.success.main,
          dark: SEMANTIC_COLORS.success.dark,
        },
        warning: {
          light: SEMANTIC_COLORS.warning.light,
          DEFAULT: SEMANTIC_COLORS.warning.main,
          dark: SEMANTIC_COLORS.warning.dark,
        },
        error: {
          light: SEMANTIC_COLORS.error.light,
          DEFAULT: SEMANTIC_COLORS.error.main,
          dark: SEMANTIC_COLORS.error.dark,
        },
        info: {
          light: SEMANTIC_COLORS.info.light,
          DEFAULT: SEMANTIC_COLORS.info.main,
          dark: SEMANTIC_COLORS.info.dark,
        },
        neutral: {
          light: SEMANTIC_COLORS.neutral.light,
          DEFAULT: SEMANTIC_COLORS.neutral.main,
          dark: SEMANTIC_COLORS.neutral.dark,
        },
      },
      // Border radius
      // Imported from designTokens.ts - optimized to restore rounded appearance from v1.0.6
      borderRadius: {
        none: BORDER_RADIUS.none,
        sm: BORDER_RADIUS.sm,
        md: BORDER_RADIUS.md,
        lg: BORDER_RADIUS.lg,
        xl: BORDER_RADIUS.xl,
        full: BORDER_RADIUS.full,
      },
      // Shadows
      // Imported from designTokens.ts
      boxShadow: {
        none: SHADOWS.none,
        sm: SHADOWS.sm,
        md: SHADOWS.md,
        lg: SHADOWS.lg,
        xl: SHADOWS.xl,
        xxl: SHADOWS.xxl,
      },
      // Transitions
      // Imported from designTokens.ts
      transitionDuration: {
        fast: TRANSITIONS.fast,
        normal: TRANSITIONS.normal,
        slow: TRANSITIONS.slow,
      },
      // Easing functions
      // Imported from designTokens.ts
      transitionTimingFunction: {
        default: EASING.default,
        in: EASING.in,
        out: EASING.out,
        sharp: EASING.sharp,
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

export default config;
