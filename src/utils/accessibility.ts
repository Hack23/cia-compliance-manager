/**
 * Accessibility utility functions for WCAG 2.1 AA compliance
 * 
 * This module provides helper functions to enhance accessibility across the application,
 * including ARIA attributes, keyboard navigation, and screen reader support.
 * 
 * @module utils/accessibility
 */

import { SecurityLevel } from '../types/cia';

/**
 * ARIA roles for common components
 */
export const ARIA_ROLES = {
  NAVIGATION: 'navigation',
  MAIN: 'main',
  COMPLEMENTARY: 'complementary',
  REGION: 'region',
  ARTICLE: 'article',
  BANNER: 'banner',
  CONTENTINFO: 'contentinfo',
  SEARCH: 'search',
  TABLIST: 'tablist',
  TAB: 'tab',
  TABPANEL: 'tabpanel',
  BUTTON: 'button',
  LINK: 'link',
  LIST: 'list',
  LISTITEM: 'listitem',
  ALERT: 'alert',
  STATUS: 'status',
  PROGRESSBAR: 'progressbar',
} as const;

/**
 * ARIA live region politeness levels
 */
export const ARIA_LIVE = {
  OFF: 'off',
  POLITE: 'polite',
  ASSERTIVE: 'assertive',
} as const;

/**
 * Create an accessible label for a security level
 * 
 * @param level - The security level
 * @param component - The CIA component (availability, integrity, confidentiality)
 * @returns An accessible label string
 */
export function getSecurityLevelAriaLabel(
  level: SecurityLevel,
  component: 'availability' | 'integrity' | 'confidentiality'
): string {
  const componentName = component.charAt(0).toUpperCase() + component.slice(1);
  return `${componentName} security level: ${level}`;
}

/**
 * Create an accessible description for a widget
 * 
 * @param widgetType - Type of widget
 * @param description - Widget description
 * @returns An accessible description string
 */
export function getWidgetAriaDescription(
  widgetType: string,
  description?: string
): string {
  if (description) {
    return `${widgetType} widget. ${description}`;
  }
  return `${widgetType} widget`;
}

/**
 * Generate ARIA props for a tab component
 * 
 * @param id - Tab identifier
 * @param isSelected - Whether the tab is currently selected
 * @param controls - ID of the panel this tab controls
 * @returns ARIA props object
 */
export function getTabAriaProps(
  id: string,
  isSelected: boolean,
  controls: string
): {
  role: string;
  'aria-selected': boolean;
  'aria-controls': string;
  id: string;
  tabIndex: number;
} {
  return {
    role: ARIA_ROLES.TAB,
    'aria-selected': isSelected,
    'aria-controls': controls,
    id,
    tabIndex: isSelected ? 0 : -1,
  };
}

/**
 * Generate ARIA props for a tab panel
 * 
 * @param id - Panel identifier
 * @param labelledBy - ID of the tab that labels this panel
 * @param isHidden - Whether the panel is currently hidden
 * @returns ARIA props object
 */
export function getTabPanelAriaProps(
  id: string,
  labelledBy: string,
  isHidden: boolean
): {
  role: string;
  id: string;
  'aria-labelledby': string;
  hidden?: boolean;
  tabIndex: number;
} {
  const props: {
    role: string;
    id: string;
    'aria-labelledby': string;
    hidden?: boolean;
    tabIndex: number;
  } = {
    role: ARIA_ROLES.TABPANEL,
    id,
    'aria-labelledby': labelledBy,
    tabIndex: 0,
  };

  if (isHidden) {
    props.hidden = true;
  }

  return props;
}

/**
 * Generate ARIA props for a button
 * 
 * @param label - Button label
 * @param isPressed - Whether button is in pressed state (for toggle buttons)
 * @param isExpanded - Whether button controls expanded content
 * @param controls - ID of element controlled by this button
 * @returns ARIA props object
 */
export function getButtonAriaProps(
  label: string,
  options?: {
    isPressed?: boolean;
    isExpanded?: boolean;
    controls?: string;
    describedBy?: string;
  }
): {
  'aria-label': string;
  'aria-pressed'?: boolean;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  'aria-describedby'?: string;
} {
  const props: {
    'aria-label': string;
    'aria-pressed'?: boolean;
    'aria-expanded'?: boolean;
    'aria-controls'?: string;
    'aria-describedby'?: string;
  } = {
    'aria-label': label,
  };

  if (options?.isPressed !== undefined) {
    props['aria-pressed'] = options.isPressed;
  }

  if (options?.isExpanded !== undefined) {
    props['aria-expanded'] = options.isExpanded;
  }

  if (options?.controls) {
    props['aria-controls'] = options.controls;
  }

  if (options?.describedBy) {
    props['aria-describedby'] = options.describedBy;
  }

  return props;
}

/**
 * Generate ARIA props for a select/dropdown component
 * 
 * @param label - Select label
 * @param value - Current value
 * @param required - Whether selection is required
 * @returns ARIA props object
 */
export function getSelectAriaProps(
  label: string,
  value: string,
  required = false
): {
  'aria-label': string;
  'aria-required'?: boolean;
  'aria-describedby'?: string;
} {
  const props: {
    'aria-label': string;
    'aria-required'?: boolean;
    'aria-describedby'?: string;
  } = {
    'aria-label': label,
  };

  if (required) {
    props['aria-required'] = true;
  }

  return props;
}

/**
 * Generate ARIA props for a progress bar or meter
 * 
 * @param label - Progress bar label
 * @param valuenow - Current value
 * @param valuemin - Minimum value
 * @param valuemax - Maximum value
 * @param valuetext - Textual representation of value
 * @returns ARIA props object
 */
export function getProgressAriaProps(
  label: string,
  valuenow: number,
  valuemin = 0,
  valuemax = 100,
  valuetext?: string
): {
  role: string;
  'aria-label': string;
  'aria-valuenow': number;
  'aria-valuemin': number;
  'aria-valuemax': number;
  'aria-valuetext'?: string;
} {
  const props: {
    role: string;
    'aria-label': string;
    'aria-valuenow': number;
    'aria-valuemin': number;
    'aria-valuemax': number;
    'aria-valuetext'?: string;
  } = {
    role: ARIA_ROLES.PROGRESSBAR,
    'aria-label': label,
    'aria-valuenow': valuenow,
    'aria-valuemin': valuemin,
    'aria-valuemax': valuemax,
  };

  if (valuetext) {
    props['aria-valuetext'] = valuetext;
  }

  return props;
}

/**
 * Generate ARIA props for a status/live region
 * 
 * @param message - Status message
 * @param politeness - ARIA live politeness level
 * @returns ARIA props object
 */
export function getStatusAriaProps(
  message: string,
  politeness: keyof typeof ARIA_LIVE = 'POLITE'
): {
  role: string;
  'aria-live': string;
  'aria-atomic': boolean;
} {
  return {
    role: ARIA_ROLES.STATUS,
    'aria-live': ARIA_LIVE[politeness],
    'aria-atomic': true,
  };
}

/**
 * Generate ARIA props for a chart/visualization
 * 
 * @param label - Chart label
 * @param description - Detailed chart description
 * @param descriptionId - ID of element containing description
 * @returns ARIA props object
 */
export function getChartAriaProps(
  label: string,
  description: string,
  descriptionId?: string
): {
  'aria-label': string;
  'aria-describedby'?: string;
  role: string;
} {
  const props: {
    'aria-label': string;
    'aria-describedby'?: string;
    role: string;
  } = {
    'aria-label': label,
    role: 'img',
  };

  if (descriptionId) {
    props['aria-describedby'] = descriptionId;
  }

  return props;
}

/**
 * Check if an element should be keyboard focusable
 * 
 * @param isInteractive - Whether element is interactive
 * @param isDisabled - Whether element is disabled
 * @returns tabIndex value (-1, 0, or undefined)
 */
export function getTabIndex(
  isInteractive: boolean,
  isDisabled = false
): number | undefined {
  if (isDisabled) {
    return -1;
  }
  return isInteractive ? 0 : undefined;
}

/**
 * Handle keyboard navigation for arrow keys in a list or grid
 * 
 * @param event - Keyboard event
 * @param currentIndex - Current focused item index
 * @param totalItems - Total number of items
 * @param onIndexChange - Callback when index changes
 * @param orientation - List orientation (horizontal or vertical)
 */
export function handleArrowKeyNavigation(
  event: React.KeyboardEvent,
  currentIndex: number,
  totalItems: number,
  onIndexChange: (newIndex: number) => void,
  orientation: 'horizontal' | 'vertical' = 'vertical'
): void {
  const { key } = event;

  let newIndex = currentIndex;

  if (orientation === 'vertical') {
    if (key === 'ArrowDown') {
      newIndex = Math.min(currentIndex + 1, totalItems - 1);
      event.preventDefault();
    } else if (key === 'ArrowUp') {
      newIndex = Math.max(currentIndex - 1, 0);
      event.preventDefault();
    }
  } else {
    if (key === 'ArrowRight') {
      newIndex = Math.min(currentIndex + 1, totalItems - 1);
      event.preventDefault();
    } else if (key === 'ArrowLeft') {
      newIndex = Math.max(currentIndex - 1, 0);
      event.preventDefault();
    }
  }

  if (key === 'Home') {
    newIndex = 0;
    event.preventDefault();
  } else if (key === 'End') {
    newIndex = totalItems - 1;
    event.preventDefault();
  }

  if (newIndex !== currentIndex) {
    onIndexChange(newIndex);
  }
}

/**
 * Generate accessible name for a metric or data point
 * 
 * @param label - Metric label
 * @param value - Metric value
 * @param unit - Optional unit (%, $, etc.)
 * @returns Accessible description string
 */
export function getMetricAccessibleName(
  label: string,
  value: string | number,
  unit?: string
): string {
  const unitString = unit ? ` ${unit}` : '';
  return `${label}: ${value}${unitString}`;
}

// Singleton live region for screen reader announcements
let liveRegionElement: HTMLDivElement | null = null;
let cleanupTimeout: ReturnType<typeof setTimeout> | null = null;
const pendingTimeouts: Array<ReturnType<typeof setTimeout>> = [];

/**
 * Get or create the singleton live region element
 */
function getLiveRegion(): HTMLDivElement {
  if (!liveRegionElement || !document.body.contains(liveRegionElement)) {
    liveRegionElement = document.createElement('div');
    liveRegionElement.setAttribute('aria-atomic', 'true');
    liveRegionElement.setAttribute('class', 'sr-only');
    liveRegionElement.style.position = 'absolute';
    liveRegionElement.style.left = '-10000px';
    liveRegionElement.style.width = '1px';
    liveRegionElement.style.height = '1px';
    liveRegionElement.style.overflow = 'hidden';
    document.body.appendChild(liveRegionElement);
  }
  return liveRegionElement;
}

/**
 * Announce a message to screen readers using ARIA live region
 * Uses a singleton live region to prevent duplicate announcements
 * 
 * @param message - Message to announce
 * @param politeness - ARIA live politeness level
 */
export function announceToScreenReader(
  message: string,
  politeness: 'polite' | 'assertive' = 'polite'
): void {
  const liveRegion = getLiveRegion();
  
  // Update politeness level if changed
  liveRegion.setAttribute('aria-live', politeness);
  
  // Clear existing content and cancel ALL pending timeouts to prevent accumulation
  liveRegion.textContent = '';
  if (cleanupTimeout) {
    clearTimeout(cleanupTimeout);
    cleanupTimeout = null;
  }
  
  // Clear all pending timeouts from rapid successive calls
  while (pendingTimeouts.length > 0) {
    const timeout = pendingTimeouts.pop();
    if (timeout) clearTimeout(timeout);
  }

  // Delay to ensure screen readers detect the change
  const messageTimeout = setTimeout(() => {
    liveRegion.textContent = message;
  }, 100);
  pendingTimeouts.push(messageTimeout);

  // Schedule cleanup after announcement (but keep the element for reuse)
  cleanupTimeout = setTimeout(() => {
    liveRegion.textContent = '';
    // Clear completed timeout from pending array
    const index = pendingTimeouts.indexOf(messageTimeout);
    if (index > -1) pendingTimeouts.splice(index, 1);
  }, 3000);
  pendingTimeouts.push(cleanupTimeout);
}

/**
 * Check if element has sufficient color contrast
 * Note: This is a simplified check. Use dedicated tools for comprehensive testing.
 * 
 * @param foreground - Foreground color (hex)
 * @param background - Background color (hex)
 * @param isLargeText - Whether text is large (18pt+ or 14pt+ bold)
 * @returns Whether contrast meets WCAG AA standards
 * @throws Error if colors are invalid hex values
 */
export function meetsContrastRequirement(
  foreground: string,
  background: string,
  isLargeText = false
): boolean {
  // Validate hex colors
  const fgRgb = hexToRgb(foreground);
  const bgRgb = hexToRgb(background);
  
  if (!fgRgb || !bgRgb) {
    console.warn(
      `Invalid hex color provided to meetsContrastRequirement: foreground=${foreground}, background=${background}`
    );
    return false; // Fail validation for invalid colors
  }
  
  const requiredRatio = isLargeText ? 3 : 4.5;
  const ratio = calculateContrastRatio(foreground, background);
  return ratio >= requiredRatio;
}

/**
 * Calculate color contrast ratio between two colors
 * 
 * @param color1 - First color (hex)
 * @param color2 - Second color (hex)
 * @returns Contrast ratio (1-21)
 */
function calculateContrastRatio(color1: string, color2: string): number {
  const l1 = getRelativeLuminance(color1);
  const l2 = getRelativeLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Get relative luminance of a color
 * 
 * @param hex - Hex color string
 * @returns Relative luminance (0-1)
 */
function getRelativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const [r, g, b] = rgb.map((val) => {
    const sRGB = val / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Convert hex color to RGB
 * 
 * @param hex - Hex color string
 * @returns RGB array or null if invalid
 */
function hexToRgb(hex: string): [number, number, number] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : null;
}
