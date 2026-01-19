/**
 * CIA Component Color Utilities
 * 
 * Provides consistent color styling for Confidentiality, Integrity, and Availability components
 * across the application. These utilities ensure visual consistency and proper theme support.
 */

export type CIAComponent = 'confidentiality' | 'integrity' | 'availability';

export interface CIAColors {
  bg: string;
  text: string;
  border: string;
  badge: string;
}

/**
 * Get consistent color classes for CIA components
 * 
 * @param component - The CIA component type
 * @returns Object with Tailwind color classes for different uses
 * 
 * @example
 * ```typescript
 * const colors = getCIAColors('confidentiality');
 * <div className={cn(colors.bg, colors.border)}>
 *   Confidentiality Content
 * </div>
 * ```
 */
export function getCIAColors(component: CIAComponent): CIAColors {
  const colors: Record<CIAComponent, CIAColors> = {
    confidentiality: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      text: 'text-purple-800 dark:text-purple-300',
      border: 'border-l-4 border-purple-500 dark:border-purple-400',
      badge: 'bg-purple-100 dark:bg-purple-900/30',
    },
    integrity: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      text: 'text-green-800 dark:text-green-300',
      border: 'border-l-4 border-green-500 dark:border-green-400',
      badge: 'bg-green-100 dark:bg-green-900/30',
    },
    availability: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: 'text-blue-800 dark:text-blue-300',
      border: 'border-l-4 border-blue-500 dark:border-blue-400',
      badge: 'bg-blue-100 dark:bg-blue-900/30',
    },
  };
  
  return colors[component];
}

/**
 * Get CIA component icon color class
 * 
 * @param component - The CIA component type
 * @returns Tailwind color class for icons
 */
export function getCIAIconColor(component: CIAComponent): string {
  const iconColors: Record<CIAComponent, string> = {
    confidentiality: 'text-purple-600 dark:text-purple-400',
    integrity: 'text-green-600 dark:text-green-400',
    availability: 'text-blue-600 dark:text-blue-400',
  };
  
  return iconColors[component];
}

/**
 * Get CIA component primary color for charts and visualizations
 * 
 * @param component - The CIA component type
 * @returns Hex color code
 */
export function getCIAPrimaryColor(component: CIAComponent): string {
  const primaryColors: Record<CIAComponent, string> = {
    confidentiality: '#9333ea', // purple-600
    integrity: '#16a34a', // green-600
    availability: '#2563eb', // blue-600
  };
  
  return primaryColors[component];
}
