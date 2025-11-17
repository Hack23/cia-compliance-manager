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
 * Converts decimal values (0-1 range) to percentage strings with
 * configurable decimal places. Useful for displaying metrics like
 * uptime, completion rates, or risk reduction percentages.
 * 
 * @param value - Decimal value where 1.0 = 100% (e.g., 0.75 = 75%)
 * @param decimalPlaces - Number of decimal places to display
 * @returns Formatted percentage string with % symbol
 * 
 * @example
 * ```typescript
 * formatPercentage(0.754, 1)    // "75.4%"
 * formatPercentage(0.99, 0)     // "99%"
 * formatPercentage(0.9999, 2)   // "99.99%"
 * formatPercentage(1, 0)        // "100%"
 * ```
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
 * Provides flexible currency formatting with support for different locales
 * and currencies. Handles both object-style and legacy string-style parameters
 * for backward compatibility.
 * 
 * @param value - The numeric value to format as currency
 * @param options - Formatting options object or currency code string (for backward compatibility)
 * @param options.locale - Locale string for regional formatting (e.g., 'en-US', 'sv-SE')
 * @param options.currency - Currency code (e.g., 'USD', 'EUR', 'SEK')
 * @param options.minimumFractionDigits - Minimum decimal places to show
 * @param options.maximumFractionDigits - Maximum decimal places to show
 * @param locale - Optional locale for backward compatibility with string options
 * @returns Formatted currency string with symbol and separators
 * 
 * @example
 * ```typescript
 * // Object-style options (recommended)
 * formatCurrency(1234.56)                                    // "$1,235" (default: USD, 0 decimals)
 * formatCurrency(1234.56, { currency: 'EUR' })              // "€1,235"
 * formatCurrency(1234.56, { 
 *   currency: 'USD',
 *   minimumFractionDigits: 2,
 *   maximumFractionDigits: 2
 * })                                                         // "$1,234.56"
 * 
 * // Legacy string-style options (backward compatible)
 * formatCurrency(1234.56, 'SEK', 'sv-SE')                   // "1 235 kr"
 * formatCurrency(50000, 'USD')                              // "$50,000"
 * ```
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
  // Default values
  let currencyCode = 'USD';
  let localeValue = 'en-US';
  let minFractionDigits = 0;
  let maxFractionDigits = 0;

  // Handle backward compatibility with string options
  if (typeof options === 'string') {
    currencyCode = options;
    if (locale) {
      localeValue = locale;
    }
  }
  // Handle object options
  else if (options && typeof options === 'object') {
    if (options.currency) currencyCode = options.currency;
    if (options.locale) localeValue = options.locale;
    if (options.minimumFractionDigits !== undefined) minFractionDigits = options.minimumFractionDigits;
    if (options.maximumFractionDigits !== undefined) maxFractionDigits = options.maximumFractionDigits;
  }

  // Use Intl.NumberFormat for consistent currency formatting
  return new Intl.NumberFormat(localeValue, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: minFractionDigits,
    maximumFractionDigits: maxFractionDigits
  }).format(value);
}

// For backward compatibility, re-export this function
export const formatCurrencyWithOptions = formatCurrency;

/**
 * Format security level for display
 * 
 * Currently returns the security level as-is since SecurityLevel type
 * values are already properly capitalized. This function exists for
 * consistency and potential future formatting needs.
 * 
 * @param level - Security level to format
 * @returns Formatted security level string
 * 
 * @example
 * ```typescript
 * formatSecurityLevel('High')       // "High"
 * formatSecurityLevel('Very High')  // "Very High"
 * formatSecurityLevel('Moderate')   // "Moderate"
 * ```
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
 * Formats a risk level by adding an appropriate emoji icon
 * 
 * Enhances risk level text with visual indicators for quick comprehension
 * in dashboards and reports. Handles case-insensitive matching.
 * 
 * @param riskLevel - The risk level text to format (case-insensitive)
 * @returns Risk level with emoji icon prefix
 * 
 * @example
 * ```typescript
 * formatRiskLevel('Critical Risk')  // "⚠️ Critical Risk"
 * formatRiskLevel('High Risk')      // "🔴 High Risk"
 * formatRiskLevel('Medium Risk')    // "🟠 Medium Risk"
 * formatRiskLevel('Low Risk')       // "🟡 Low Risk"
 * formatRiskLevel('Minimal Risk')   // "🟢 Minimal Risk"
 * formatRiskLevel('No Risk')        // "✅ No Risk"
 * formatRiskLevel('Unknown')        // "❓ Unknown"
 * 
 * // Case-insensitive
 * formatRiskLevel('high risk')      // "🔴 high risk"
 * ```
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
 * Provides locale-aware number formatting with thousands separators
 * and configurable decimal precision.
 * 
 * @param value - Number to format
 * @param decimalPlaces - Optional number of decimal places to display
 * @returns Formatted number string with separators
 * 
 * @example
 * ```typescript
 * formatNumber(1234567)          // "1,234,567"
 * formatNumber(1234.5678)        // "1,234.568" (locale dependent)
 * formatNumber(1234.5678, 2)     // "1234.57"
 * formatNumber(999.999, 1)       // "1000.0"
 * ```
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
 * Similar to formatNumber but always returns a string with exact
 * decimal places, without locale-based thousands separators.
 * 
 * @param value - Number to format
 * @param decimalPlaces - Exact number of decimal places to display
 * @returns Formatted number string with fixed decimals
 * 
 * @example
 * ```typescript
 * formatNumberWithDecimals(1234.5678, 2)   // "1234.57"
 * formatNumberWithDecimals(99.5, 3)        // "99.500"
 * formatNumberWithDecimals(1000, 0)        // "1000"
 * ```
 */
export function formatNumberWithDecimals(value: number, decimalPlaces: number): string {
  return value.toFixed(decimalPlaces);
}

/**
 * Format a cost value for budget display
 * 
 * Adds contextual text explaining whether the cost represents capital
 * expenditure (one-time) or operational expenditure (recurring annual).
 * Useful in budget presentations and financial reports.
 * 
 * @param value - Cost percentage value (0-1 range, where 0.05 = 5% of IT budget)
 * @param isCapex - Whether this is capital expenditure (vs operational)
 * @returns Formatted budget string with contextual description
 * 
 * @example
 * ```typescript
 * formatBudgetPercentage(0.05, true)   
 * // "5% of IT budget as one-time capital expenditure"
 * 
 * formatBudgetPercentage(0.03, false)  
 * // "3% of IT budget as annual operational expenses"
 * 
 * formatBudgetPercentage(0.1, true)    
 * // "10% of IT budget as one-time capital expenditure"
 * ```
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
 * Normalizes uptime values which may be provided in different formats
 * (with or without % symbol, as string or number). Ensures consistent
 * percentage display format.
 * 
 * @param uptime - Uptime value in various formats
 * @returns Formatted uptime string with % symbol
 * 
 * @example
 * ```typescript
 * formatUptime("99.9%")     // "99.9%" (already formatted)
 * formatUptime("99.9")      // "99.9%" (adds % symbol)
 * formatUptime("0.999")     // "99.9%" (converts decimal to percentage)
 * formatUptime("invalid")   // "invalid" (returns as-is if not parseable)
 * ```
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
