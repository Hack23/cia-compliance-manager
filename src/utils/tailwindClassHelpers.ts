/**
 * TailwindCSS Class Helpers
 * 
 * Standard class patterns for consistent widget styling across the application.
 * These utilities promote reusability and visual consistency while maintaining
 * accessibility standards.
 * 
 * @module tailwindClassHelpers
 */

/**
 * Standard class patterns for consistent widget styling
 * 
 * These patterns use Tailwind utility classes and design tokens from designTokens.ts
 * to ensure visual consistency across all widgets.
 * 
 * @example
 * ```tsx
 * import { WidgetClasses, cn } from '@/utils/tailwindClassHelpers';
 * 
 * function MyWidget() {
 *   return (
 *     <div className={cn(WidgetClasses.container, WidgetClasses.containerHover)}>
 *       <h2 className={WidgetClasses.heading}>Widget Title</h2>
 *       <div className={WidgetClasses.grid2Cols}>
 *         <div className={WidgetClasses.card}>Content 1</div>
 *         <div className={WidgetClasses.card}>Content 2</div>
 *       </div>
 *     </div>
 *   );
 * }
 * ```
 */
export const WidgetClasses = {
  // ========================================
  // Container patterns
  // ========================================
  
  /**
   * Standard widget container with rounded corners, border, shadow, and padding
   * Uses design tokens for consistent spacing and elevation
   */
  container: 'rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md p-lg',
  
  /**
   * Hover effect for interactive containers
   * Increases shadow on hover with smooth transition
   */
  containerHover: 'hover:shadow-lg transition-shadow duration-normal',
  
  // ========================================
  // Section patterns
  // ========================================
  
  /**
   * Standard section with bottom margin and vertical spacing
   * Use for major content divisions within widgets
   */
  section: 'mb-lg space-y-md',
  
  /**
   * Section with left border accent
   * Use for emphasized or highlighted sections
   */
  sectionBorder: 'border-l-4 border-primary pl-md',
  
  // ========================================
  // Typography patterns
  // ========================================
  
  /**
   * Primary heading style for widget titles
   * Uses design token typography and semantic colors
   */
  heading: 'text-subheading font-semibold text-gray-800 dark:text-gray-100 mb-md',
  
  /**
   * Secondary heading for subsections
   * Smaller and medium weight for content hierarchy
   */
  subheading: 'text-body-lg font-medium text-gray-700 dark:text-gray-200 mb-sm',
  
  /**
   * Standard body text style
   * Use for primary content and descriptions
   */
  body: 'text-body text-gray-600 dark:text-gray-400',
  
  /**
   * Small label text for form labels and metadata
   * Uppercase with tracking for emphasis
   */
  label: 'text-caption font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wide',
  
  /**
   * Small label text for form labels and metadata in normal case
   * Use this when label text should preserve its original casing
   * instead of being forced to uppercase.
   */
  labelNormal: 'text-caption font-medium text-gray-500 dark:text-gray-500 tracking-wide',
  
  // ========================================
  // Card patterns
  // ========================================
  
  /**
   * Standard card container for nested content
   * Lighter background to distinguish from main container
   */
  card: 'rounded-md border border-gray-200 dark:border-gray-600 p-md bg-gray-50 dark:bg-gray-700',
  
  /**
   * Interactive card with hover effect
   * Use for clickable cards and list items
   */
  cardInteractive: 'hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-fast',
  
  // ========================================
  // Button patterns
  // ========================================
  
  /**
   * Primary button style
   * High contrast for main actions
   */
  buttonPrimary: 'bg-primary hover:bg-primary-dark text-white font-medium py-sm px-md rounded-md transition-colors duration-fast focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
  
  /**
   * Secondary button style
   * Lower contrast for alternative actions
   */
  buttonSecondary: 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 font-medium py-sm px-md rounded-md transition-colors duration-fast focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
  
  // ========================================
  // Grid patterns
  // ========================================
  
  /**
   * Two-column grid layout
   * Stacks on mobile, 2 columns on medium+ screens
   */
  grid2Cols: 'grid grid-cols-1 md:grid-cols-2 gap-md',
  
  /**
   * Three-column grid layout
   * Stacks on mobile, 2 columns on tablet, 3 columns on desktop
   */
  grid3Cols: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md',
  
  /**
   * Flexible row layout with wrapping
   * Adjusts gap between items responsively
   */
  flexRow: 'flex flex-wrap gap-sm md:gap-md',
  
  // ========================================
  // Responsive patterns
  // ========================================
  
  /**
   * Hide on mobile, show on tablet and desktop
   * Use for non-essential content on small screens
   */
  hideMobile: 'hidden md:block',
  
  /**
   * Show on mobile only, hide on tablet and desktop
   * Use for mobile-optimized alternatives
   */
  hideDesktop: 'block md:hidden',
  
  /**
   * Responsive text sizing
   * Smaller on mobile, larger on desktop
   */
  textResponsive: 'text-body md:text-body-lg',
  
  // ========================================
  // State patterns
  // ========================================
  
  /**
   * Disabled state styling
   * Reduced opacity and no pointer events
   */
  disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
  
  /**
   * Loading state with pulse animation
   * Use for skeleton screens and loading indicators
   */
  loading: 'animate-pulse',
  
  /**
   * Focus-visible ring for keyboard navigation
   * Ensures accessibility compliance
   */
  focusVisible: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
  
  // ========================================
  // Badge patterns
  // ========================================
  
  /**
   * Standard badge styling
   * Use with specific color variants
   */
  badge: 'inline-flex items-center px-sm py-xs text-caption font-medium rounded-sm',
  
  /**
   * Success badge (green)
   */
  badgeSuccess: 'bg-success text-white',
  
  /**
   * Warning badge (yellow)
   */
  badgeWarning: 'bg-warning text-gray-900',
  
  /**
   * Error badge (red)
   */
  badgeError: 'bg-error text-white',
  
  /**
   * Info badge (blue)
   */
  badgeInfo: 'bg-info text-white',
  
  /**
   * Neutral badge (gray)
   */
  badgeNeutral: 'bg-neutral text-white',
  
  // ========================================
  // Divider patterns
  // ========================================
  
  /**
   * Horizontal divider
   */
  dividerHorizontal: 'border-t border-gray-200 dark:border-gray-700 my-md',
  
  /**
   * Vertical divider (for flex layouts)
   */
  dividerVertical: 'border-l border-gray-200 dark:border-gray-700 mx-md',
  
  // ========================================
  // Tab patterns
  // ========================================
  
  /**
   * Tab list container styling
   * Bottom border with small margin below for tab content
   */
  tabList: 'flex space-x-2 border-b border-gray-200 dark:border-gray-700 mb-sm',
  
} as const;

/**
 * Combine Tailwind classes with proper handling of conditionals
 * 
 * This utility function merges multiple class strings, filtering out
 * falsy values (false, null, undefined) for conditional styling.
 * 
 * @param classes - Variable number of class strings or conditional values
 * @returns Combined class string with falsy values filtered out
 * 
 * @example
 * ```tsx
 * // Basic usage
 * cn('text-lg', 'font-bold') // 'text-lg font-bold'
 * 
 * // Conditional classes
 * cn('base-class', isActive && 'active-class', 'another-class')
 * // Result: 'base-class active-class another-class' (if isActive is true)
 * // Result: 'base-class another-class' (if isActive is false)
 * 
 * // With null/undefined
 * cn('text-lg', null, undefined, 'font-bold') // 'text-lg font-bold'
 * 
 * // Practical example
 * function Button({ primary, disabled }) {
 *   return (
 *     <button className={cn(
 *       'btn',
 *       primary && 'btn-primary',
 *       !primary && 'btn-secondary',
 *       disabled && 'opacity-50'
 *     )}>
 *       Click me
 *     </button>
 *   );
 * }
 * ```
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Type definitions for better TypeScript support
 */
export type WidgetClassKey = keyof typeof WidgetClasses;
