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
 * Format number as currency
 * 
 * @param value - Number to format
 * @param currency - Currency code (default: USD)
 * @param locale - Locale for formatting (default: en-US)
 * @returns Formatted currency string
 */
export function formatCurrency(
  value: number, 
  currency = 'USD', 
  locale = 'en-US'
): string {
  // Default fallback format
  let formattedValue = `${currency} ${value.toLocaleString()}`;
  
  try {
    // Try to use Intl.NumberFormat with the provided locale and currency
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    });
    formattedValue = formatter.format(value);
  } catch (error) {
    // If that fails, try with just the default locale
    try {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
      });
      formattedValue = formatter.format(value);
    } catch {
      // Keep using the fallback format defined above
    }
  }
  
  return formattedValue;
}

/**
 * Formats a percentage value
 *
 * ## Business Perspective
 *
 * Consistent percentage formatting enhances readability of ROI calculations,
 * risk assessments, and other metrics that inform business decisions. 📊
 *
 * @param value - The percentage value (e.g. 0.75 for 75%)
 * @param decimalPlaces - Number of decimal places to include
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number, decimalPlaces = 0): string {
  return new Intl.NumberFormat(undefined, {
    style: "percent",
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(value);
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
 * Formats a number with a specified number of decimal places
 *
 * ## Business Perspective
 *
 * Consistent number formatting enhances readability of security metrics,
 * risk assessments, and cost calculations throughout the application. 📈
 *
 * @param value - The number to format
 * @param decimalPlaces - Number of decimal places (default: 2)
 * @returns Formatted number string
 */
export function formatNumber(value: number, decimalPlaces = 2): string {
  return value.toFixed(decimalPlaces);
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

/**
 * Formats a risk level with appropriate styling indicator
 *
 * ## Business Perspective
 *
 * Consistent risk level presentation helps decision-makers quickly
 * understand the severity of different risks across the application. ⚠️
 *
 * @param riskLevel - The risk level string
 * @returns Formatted risk level with indicator
 */
export function formatRiskLevel(riskLevel: string): string {
  const normalizedRisk = riskLevel.toLowerCase();

  if (normalizedRisk.includes("critical")) {
    return `⚠️ ${riskLevel}`;
  } else if (normalizedRisk.includes("high")) {
    return `🔴 ${riskLevel}`;
  } else if (
    normalizedRisk.includes("medium") ||
    normalizedRisk.includes("moderate")
  ) {
    return `🟠 ${riskLevel}`;
  } else if (normalizedRisk.includes("low")) {
    return `🟡 ${riskLevel}`;
  } else if (normalizedRisk.includes("minimal")) {
    return `🟢 ${riskLevel}`;
  }

  return `ℹ️ ${riskLevel}`;
}
