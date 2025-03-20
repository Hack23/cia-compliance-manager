import { DISPLAY_FORMAT } from "../constants/testConstants";
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
 * Format a percentage value with consistent display
 * 
 * @param value - Numeric value to format as percentage
 * @param decimalPlaces - Number of decimal places (default: 2)
 * @returns Formatted percentage string
 */
export function formatPercentage(
  value: number,
  decimalPlaces: number = DISPLAY_FORMAT.DECIMAL_PLACES
): string {
  return `${value.toFixed(decimalPlaces)}${DISPLAY_FORMAT.PERCENTAGE_SUFFIX}`;
}

/**
 * Format a currency value with consistent display
 * 
 * @param value - Numeric value to format as currency
 * @param currencyCodeOrDecimals - Either decimal places or currency code
 * @param locale - Optional locale for formatting
 * @returns Formatted currency string
 */
export function formatCurrency(
  value: number,
  currencyCodeOrDecimals: number | string = DISPLAY_FORMAT.DECIMAL_PLACES,
  locale?: string
): string {
  // If the second parameter is a string, assume it's a currency code
  if (typeof currencyCodeOrDecimals === 'string') {
    return formatCurrencyWithOptions(value, currencyCodeOrDecimals, locale || 'en-US');
  }

  // Otherwise, treat it as decimal places
  return `${DISPLAY_FORMAT.CURRENCY_PREFIX}${value.toFixed(currencyCodeOrDecimals)}`;
}

/**
 * Format a currency value with currency code and locale
 * 
 * @param value - Numeric value to format
 * @param currencyCode - Currency code (e.g., 'USD', 'EUR')
 * @param locale - Locale for formatting (e.g., 'en-US')
 * @returns Formatted currency string
 */
export function formatCurrencyWithOptions(
  value: number,
  currencyCode: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode
  }).format(value);
}

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
 * Format risk level for display
 * 
 * @param riskLevel - Risk level string
 * @returns Formatted risk level string
 */
export function formatRiskLevel(riskLevel: string): string {
  return riskLevel;
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
