import { useMemo } from 'react';
import { formatCurrency, formatPercentage } from '../utils/formatUtils';

/**
 * Options for metric formatting
 */
export interface MetricFormattingOptions {
  /**
   * Locale string for regional formatting (e.g., 'en-US', 'sv-SE')
   */
  locale?: string;
  
  /**
   * Currency code (e.g., 'USD', 'EUR', 'SEK')
   */
  currency?: string;
}

/**
 * Formatted metric functions
 */
export interface MetricFormatters {
  /**
   * Format a number as currency
   * @param value - Numeric value to format
   * @returns Formatted currency string
   */
  currency: (value: number) => string;
  
  /**
   * Format a decimal as percentage
   * @param value - Decimal value (0-1 range) to format
   * @param decimalPlaces - Number of decimal places (default: 0)
   * @returns Formatted percentage string
   */
  percentage: (value: number, decimalPlaces?: number) => string;
  
  /**
   * Format a number with locale-specific formatting
   * @param value - Number to format
   * @returns Formatted number string
   */
  number: (value: number) => string;
}

/**
 * Custom hook providing memoized formatting functions for metrics
 * 
 * ## Business Perspective
 * 
 * This hook provides consistent metric formatting across all widgets,
 * ensuring that financial data, percentages, and numbers are displayed
 * uniformly. This improves comprehension and professionalism in security
 * reports and dashboards presented to stakeholders. 📊
 * 
 * The memoization ensures efficient rendering when formatting large
 * datasets or when components re-render frequently.
 * 
 * @param options - Formatting options (locale, currency)
 * @returns Memoized formatting functions for common metric types
 * 
 * @example
 * ```typescript
 * // Use default locale and currency (en-US, USD)
 * const { currency, percentage, number } = useFormattedMetrics();
 * 
 * console.log(currency(50000));           // "$50,000"
 * console.log(percentage(0.95));          // "95%"
 * console.log(number(1234567));           // "1,234,567"
 * 
 * // Use custom locale and currency
 * const formatters = useFormattedMetrics({ 
 *   locale: 'sv-SE', 
 *   currency: 'SEK' 
 * });
 * console.log(formatters.currency(50000)); // "50 000 kr"
 * ```
 */
export function useFormattedMetrics(
  options?: MetricFormattingOptions
): MetricFormatters {
  const locale = options?.locale ?? 'en-US';
  const currency = options?.currency ?? 'USD';

  return useMemo(
    () => ({
      currency: (value: number) => formatCurrency(value, { locale, currency }),
      percentage: (value: number, decimalPlaces = 0) => 
        formatPercentage(value, decimalPlaces),
      number: (value: number) => value.toLocaleString(locale),
    }),
    [locale, currency]
  );
}
