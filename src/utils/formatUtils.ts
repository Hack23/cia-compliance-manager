import { SecurityLevel } from "../types/cia";

/**
 * Utility functions for formatting values consistently across the application
 * 
 * ## Business Perspective
 * 
 * Consistent formatting ensures that business metrics, costs, and security levels 
 * are displayed uniformly across the application, improving comprehension and 
 * professionalism in security reports and dashboards. 📊
 * 
 * These utilities support clear communication of risk and investment data to
 * both technical and business stakeholders.
 */

/**
 * Converts a string to title case
 *
 * @param str - The string to convert to title case
 * @returns The title-cased string
 */
export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  );
}

/**
 * Formats a decimal as a percentage
 * 
 * @param value - Decimal value (0.75 = 75%)
 * @param decimalPlaces - Number of decimal places to show
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number, decimalPlaces: number = 0): string {
  // Multiply by 100 to convert decimal to percentage
  const percentage = value * 100;

  // Format with specified decimal places
  return `${percentage.toFixed(decimalPlaces)}%`;
}

/**
 * Formats a number as currency with proper thousands separators
 * 
 * @param value - The number to format as currency
 * @param options - Formatting options or currency code string for backward compatibility
 * @param locale - Optional locale for backward compatibility
 * @returns Formatted currency string
 */
export function formatCurrency(
  value: number,
  options?: {
    locale?: string;
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  } | string,
  locale?: string
): string {
  // Handle backward compatibility with old function signature
  if (typeof options === 'string') {
    return new Intl.NumberFormat(locale || 'en-US', {
      style: 'currency',
      currency: options,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  // New signature with options object
  const {
    locale: optLocale = 'en-US',
    currency = 'USD',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2
  } = options || {};

  // Use Intl.NumberFormat to ensure proper thousands separators
  return new Intl.NumberFormat(optLocale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits
  }).format(value);
}

// For backward compatibility, re-export this function
export const formatCurrencyWithOptions = formatCurrency;

/**
 * Format security level for display (capitalize first letter)
 * 
 * @param level - Security level
 * @returns Formatted security level string
 */
export function formatSecurityLevel(level: SecurityLevel): string {
  return level;
}

/**
 * Risk level icons for different risk levels
 */
const RISK_LEVEL_ICONS: Record<string, string> = {
  "Critical Risk": "⚠️",
  "High Risk": "🔴",
  "Medium Risk": "🟠",
  "Low Risk": "🟡",
  "Minimal Risk": "🟢",
  "No Risk": "✅",
  "Unknown Risk": "❓"
};

/**
 * Formats a risk level by adding an appropriate icon
 * 
 * @param riskLevel - The risk level text to format
 * @returns Risk level with icon prefix
 */
export function formatRiskLevel(riskLevel: string): string {
  // Handle case insensitivity by checking against lowercase values
  let icon = "❓"; // Default icon for unknown risk levels

  // Look up the icon based on the risk level
  const riskLowerCase = riskLevel.toLowerCase();
  Object.entries(RISK_LEVEL_ICONS).forEach(([level, levelIcon]) => {
    if (level.toLowerCase() === riskLowerCase) {
      icon = levelIcon;
    }
  });

  // Return risk level with the icon
  return `${icon} ${riskLevel}`;
}

/**
 * Format a number with thousands separators and optional decimal places
 * 
 * @param value - Number to format
 * @param decimalPlaces - Optional decimal places
 * @returns Formatted number with thousand separators
 */
export function formatNumber(value: number, decimalPlaces?: number): string {
  if (decimalPlaces !== undefined) {
    return value.toFixed(decimalPlaces);
  }
  return value.toLocaleString();
}

/**
 * Format a number with specified decimal places
 * 
 * @param value - Number to format
 * @param decimalPlaces - Number of decimal places
 * @returns Formatted number string
 */
export function formatNumberWithDecimals(value: number, decimalPlaces: number): string {
  return value.toFixed(decimalPlaces);
}

/**
 * Format a cost value for budget display (adds "% of IT budget" text)
 * 
 * @param value - Cost percentage value
 * @param isCapex - Whether this is capital expenditure (vs operational)
 * @returns Formatted budget string
 */
export function formatBudgetPercentage(value: number, isCapex: boolean): string {
  const percentValue = formatPercentage(value);
  const budgetType = isCapex
    ? "of IT budget as one-time capital expenditure"
    : "of IT budget as annual operational expenses";

  return `${percentValue} ${budgetType}`;
}

/**
 * Format uptime percentage for availability display
 * 
 * @param uptime - Uptime value (e.g., "99.9%")
 * @returns Formatted uptime string
 */
export function formatUptime(uptime: string): string {
  // If uptime is already formatted, return as is
  if (uptime.includes('%')) {
    return uptime;
  }

  // Try to convert to a percentage if it's a number
  const uptimeValue = parseFloat(uptime);
  if (!isNaN(uptimeValue)) {
    return formatPercentage(uptimeValue);
  }

  // If not a percentage, return as is
  return uptime;
}

/**
 * Formats a date using the browser's local formatting
 *
 * ## Business Perspective
 *
 * Consistent date formatting improves the readability of audit records,
 * compliance documentation, and implementation timelines. 📅
 *
 * @param date - Date object or string to format
 * @param options - Date formatting options
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(undefined, options).format(dateObj);
}

/**
 * Formats a large number with abbreviated suffixes (K, M, B)
 *
 * ## Business Perspective
 *
 * Large financial figures become more readable with appropriate
 * abbreviations, making high-level financial impact assessments
 * more accessible to executives and stakeholders. 💼
 *
 * @param value - The number to format
 * @returns Abbreviated number string
 */
export function formatLargeNumber(value: number): string {
  const absValue = Math.abs(value);

  if (absValue >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  }

  if (absValue >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }

  if (absValue >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }

  return value.toString();
}

/**
 * Formats a timeframe in a human-readable format
 *
 * ## Business Perspective
 *
 * Recovery time objectives and implementation timeframes are critical
 * in security planning and need to be presented consistently for
 * accurate business impact assessment. ⏱️
 *
 * @param minutes - Time in minutes
 * @returns Formatted time string
 */
export function formatTimeframe(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} minutes`;
  } else if (minutes < 1440) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours} hours, ${remainingMinutes} minutes`
      : `${hours} hours`;
  } else {
    const days = Math.floor(minutes / 1440);
    const remainingHours = Math.floor((minutes % 1440) / 60);
    return remainingHours > 0
      ? `${days} days, ${remainingHours} hours`
      : `${days} days`;
  }
}
