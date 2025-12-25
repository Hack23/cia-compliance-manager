/**
 * Design System Tokens
 * 
 * Centralized design tokens for consistent styling across all widgets.
 * These tokens define the visual language of the CIA Compliance Manager.
 * 
 * @see docs/DESIGN_SYSTEM.md for usage guidelines
 */

/**
 * Spacing scale following 8px grid system
 * Use these values for padding, margin, and gap properties
 */
export const SPACING = {
  /** 4px - Extra small spacing for tight layouts */
  xs: '4px',
  /** 8px - Small spacing for compact elements */
  sm: '8px',
  /** 16px - Medium spacing (default) */
  md: '16px',
  /** 24px - Large spacing for section separation */
  lg: '24px',
  /** 32px - Extra large spacing for major sections */
  xl: '32px',
  /** 48px - XXL spacing for page-level separation */
  xxl: '48px',
} as const;

/**
 * Typography scale for consistent text hierarchy
 * Sizes are in rem units for accessibility
 */
export const TYPOGRAPHY = {
  /** 0.75rem (12px) - Small labels and captions */
  caption: '0.75rem',
  /** 0.875rem (14px) - Body text, secondary content */
  body: '0.875rem',
  /** 1rem (16px) - Primary body text, base font size */
  bodyLarge: '1rem',
  /** 1.125rem (18px) - Subheadings */
  subheading: '1.125rem',
  /** 1.5rem (24px) - Section headings */
  heading: '1.5rem',
  /** 2rem (32px) - Page titles */
  title: '2rem',
  /** 2.5rem (40px) - Display text */
  display: '2.5rem',
} as const;

/**
 * Font weights for text emphasis
 */
export const FONT_WEIGHTS = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

/**
 * Line heights for optimal readability
 */
export const LINE_HEIGHTS = {
  tight: '1.25',
  normal: '1.5',
  relaxed: '1.75',
} as const;

/**
 * Semantic color system
 * These colors should be used based on meaning, not appearance
 */
export const SEMANTIC_COLORS = {
  /** Primary brand color for main actions and emphasis */
  primary: {
    light: '#2b8aff',
    main: '#0066cc',
    dark: '#004d99',
  },
  /** Success states, positive actions, completed items */
  success: {
    light: '#4caf50',
    main: '#27ae60',
    dark: '#1e8449',
  },
  /** Warning states, caution, pending items */
  warning: {
    light: '#feca57',
    main: '#f1c40f',
    dark: '#f39c12',
  },
  /** Error states, critical issues, destructive actions */
  error: {
    light: '#ff6b6b',
    main: '#e74c3c',
    dark: '#c0392b',
  },
  /** Informational states, neutral emphasis */
  info: {
    light: '#54a0ff',
    main: '#3498db',
    dark: '#2980b9',
  },
  /** Neutral/secondary elements */
  neutral: {
    light: '#b8b8cc',
    main: '#95a5a6',
    dark: '#7f8c8d',
  },
} as const;

/**
 * Border radius values for consistent rounded corners
 */
export const BORDER_RADIUS = {
  /** 2px - Minimal rounding */
  none: '0',
  /** 4px - Small rounding for buttons and badges */
  sm: '4px',
  /** 8px - Medium rounding (default for cards) */
  md: '8px',
  /** 12px - Large rounding for prominent elements */
  lg: '12px',
  /** 16px - Extra large rounding */
  xl: '16px',
  /** Full circle/pill shape */
  full: '9999px',
} as const;

/**
 * Shadow depths for elevation hierarchy
 * Use these to create visual depth and layering
 */
export const SHADOWS = {
  /** No shadow */
  none: 'none',
  /** 0 1px 2px - Subtle elevation */
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  /** 0 2px 8px - Card elevation */
  md: '0 2px 8px 0 rgba(0, 0, 0, 0.1)',
  /** 0 4px 16px - Elevated card */
  lg: '0 4px 16px 0 rgba(0, 0, 0, 0.15)',
  /** 0 8px 24px - Modal/overlay */
  xl: '0 8px 24px 0 rgba(0, 0, 0, 0.2)',
  /** 0 12px 32px - Maximum elevation */
  xxl: '0 12px 32px 0 rgba(0, 0, 0, 0.25)',
} as const;

/**
 * Transition durations for consistent animations
 */
export const TRANSITIONS = {
  /** 150ms - Fast transitions for small UI changes */
  fast: '150ms',
  /** 200ms - Normal transitions (default) */
  normal: '200ms',
  /** 300ms - Slow transitions for large movements */
  slow: '300ms',
} as const;

/**
 * Easing functions for smooth animations
 */
export const EASING = {
  /** Ease in and out */
  default: 'cubic-bezier(0.4, 0, 0.2, 1)',
  /** Ease in */
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  /** Ease out */
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  /** Sharp transition */
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
} as const;

/**
 * Z-index layers for consistent stacking order
 */
export const Z_INDEX = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

/**
 * Widget-specific design tokens
 */
export const WIDGET_DESIGN = {
  /** Standard padding for widget containers */
  padding: SPACING.lg,
  /** Border radius for widget containers */
  borderRadius: BORDER_RADIUS.md,
  /** Shadow for widget containers */
  shadow: SHADOWS.md,
  /** Gap between widget sections */
  sectionGap: SPACING.md,
  /** Header height */
  headerHeight: '48px',
  /** Header padding */
  headerPadding: SPACING.md,
  /** Content padding */
  contentPadding: SPACING.md,
  /** Footer padding */
  footerPadding: SPACING.md,
} as const;

/**
 * Responsive breakpoints (matching TailwindCSS defaults)
 */
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/**
 * Helper function to get spacing value
 * @param size - Spacing size key
 * @returns Spacing value in pixels
 */
export function getSpacing(size: keyof typeof SPACING): string {
  return SPACING[size];
}

/**
 * Helper function to get typography value
 * @param size - Typography size key
 * @returns Font size in rem
 */
export function getTypography(size: keyof typeof TYPOGRAPHY): string {
  return TYPOGRAPHY[size];
}

/**
 * Helper function to get semantic color
 * @param type - Color type (primary, success, warning, error, info, neutral)
 * @param variant - Color variant (light, main, dark)
 * @returns Color hex value
 */
export function getSemanticColor(
  type: keyof typeof SEMANTIC_COLORS,
  variant: 'light' | 'main' | 'dark' = 'main'
): string {
  return SEMANTIC_COLORS[type][variant];
}

/**
 * Helper function to get shadow value
 * @param depth - Shadow depth
 * @returns Shadow CSS value
 */
export function getShadow(depth: keyof typeof SHADOWS): string {
  return SHADOWS[depth];
}

/**
 * Helper function to get border radius
 * @param size - Border radius size
 * @returns Border radius value
 */
export function getBorderRadius(size: keyof typeof BORDER_RADIUS): string {
  return BORDER_RADIUS[size];
}

/**
 * Type exports for TypeScript support
 */
export type SpacingSize = keyof typeof SPACING;
export type TypographySize = keyof typeof TYPOGRAPHY;
export type SemanticColorType = keyof typeof SEMANTIC_COLORS;
export type ShadowDepth = keyof typeof SHADOWS;
export type BorderRadiusSize = keyof typeof BORDER_RADIUS;
