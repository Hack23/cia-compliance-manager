/**
 * Format utility functions for display values
 *
 * Provides formatting utilities for numbers, currency, percentages,
 * and other display values used throughout the application.
 *
 * ## Business Perspective
 * Consistent formatting of financial metrics, security scores, and
 * percentages ensures clear communication with stakeholders and
 * decision-makers across all dashboard views. 💰
 *
 * @packageDocumentation
 */

/**
 * Format a number as currency (USD)
 *
 * @param value - Numeric value to format
 * @param options - Optional formatting options
 * @returns Formatted currency string
 *
 * @example
 * formatCurrency(1000000) // '$1,000,000'
 * formatCurrency(500000) // '$500,000'
 * formatCurrency(1234.56) // '$1,235'
 */
export function formatCurrency(
  value: number,
  options?: {
    compact?: boolean;
    maximumFractionDigits?: number;
  }
): string {
  if (!Number.isFinite(value)) {
    return '$0';
  }

  if (options?.compact && Math.abs(value) >= 1_000_000) {
    const millions = value / 1_000_000;
    return `$${millions.toFixed(1)}M`;
  }

  if (options?.compact && Math.abs(value) >= 1_000) {
    const thousands = value / 1_000;
    return `$${thousands.toFixed(0)}K`;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: options?.maximumFractionDigits ?? 0,
  }).format(value);
}

/**
 * Format a number as a percentage
 *
 * @param value - Numeric value (0-100)
 * @param decimalPlaces - Number of decimal places (default: 0)
 * @returns Formatted percentage string
 *
 * @example
 * formatPercentage(75) // '75%'
 * formatPercentage(66.67, 1) // '66.7%'
 */
export function formatPercentage(
  value: number,
  decimalPlaces = 0
): string {
  if (!Number.isFinite(value)) {
    return '0%';
  }

  return `${value.toFixed(decimalPlaces)}%`;
}

/**
 * Format a large number with thousands separators
 *
 * @param value - Numeric value to format
 * @returns Formatted number string
 *
 * @example
 * formatNumber(1000000) // '1,000,000'
 * formatNumber(12345) // '12,345'
 */
export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) {
    return '0';
  }

  return new Intl.NumberFormat('en-US').format(value);
}

/**
 * Format a date as a localized string
 *
 * @param date - Date to format
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 *
 * @example
 * formatDate(new Date()) // '1/1/2024'
 * formatDate(new Date(), { month: 'long', year: 'numeric' }) // 'January 2024'
 */
export function formatDate(
  date: Date,
  options?: Intl.DateTimeFormatOptions
): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return 'Invalid date';
  }

  return new Intl.DateTimeFormat('en-US', options).format(date);
}

/**
 * Truncate a string to a maximum length with ellipsis
 *
 * @param text - String to truncate
 * @param maxLength - Maximum character length
 * @returns Truncated string with ellipsis if needed
 *
 * @example
 * truncateText('Hello World', 5) // 'Hello...'
 * truncateText('Short', 10) // 'Short'
 */
export function truncateText(
  text: string,
  maxLength: number
): string {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength)}...`;
}

/**
 * Capitalize the first letter of a string
 *
 * @param text - String to capitalize
 * @returns String with first letter capitalized
 *
 * @example
 * capitalizeFirst('hello') // 'Hello'
 * capitalizeFirst('world') // 'World'
 */
export function capitalizeFirst(text: string): string {
  if (!text || text.length === 0) {
    return text;
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Format a security level as a display string
 *
 * @param level - Security level string
 * @returns Formatted display string
 *
 * @example
 * formatSecurityLevel('Very High') // 'Very High'
 * formatSecurityLevel('None') // 'None'
 */
export function formatSecurityLevel(level: string): string {
  return level || 'None';
}

/**
 * Format bytes to human-readable size
 *
 * @param bytes - Number of bytes
 * @returns Human-readable size string
 *
 * @example
 * formatBytes(1024) // '1.0 KB'
 * formatBytes(1048576) // '1.0 MB'
 */
export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) {
    return '0 B';
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

/**
 * Format a duration in milliseconds to a human-readable string
 *
 * @param ms - Duration in milliseconds
 * @returns Human-readable duration string
 *
 * @example
 * formatDuration(90000) // '1m 30s'
 * formatDuration(3600000) // '1h'
 */
export function formatDuration(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) {
    return '0s';
  }

  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ${hours % 24}h`;
  }
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
}
