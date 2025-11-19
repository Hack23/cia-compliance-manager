import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useFormattedMetrics } from './useFormattedMetrics';

// Mock the formatUtils module
vi.mock('../utils/formatUtils', () => ({
  formatCurrency: vi.fn((value: number, options?: { locale?: string; currency?: string }) => {
    const currency = options?.currency ?? 'USD';
    const locale = options?.locale ?? 'en-US';
    if (currency === 'SEK' && locale === 'sv-SE') {
      return `${value.toLocaleString(locale)} kr`;
    }
    return `$${value.toLocaleString(locale)}`;
  }),
  formatPercentage: vi.fn((value: number, decimalPlaces = 0) => {
    return `${(value * 100).toFixed(decimalPlaces)}%`;
  }),
}));

describe('useFormattedMetrics', () => {
  it('should return formatting functions with default options', () => {
    const { result } = renderHook(() => useFormattedMetrics());

    expect(result.current).toHaveProperty('currency');
    expect(result.current).toHaveProperty('percentage');
    expect(result.current).toHaveProperty('number');
    expect(typeof result.current.currency).toBe('function');
    expect(typeof result.current.percentage).toBe('function');
    expect(typeof result.current.number).toBe('function');
  });

  it('should format currency with default locale and currency', () => {
    const { result } = renderHook(() => useFormattedMetrics());

    const formatted = result.current.currency(50000);
    expect(formatted).toBe('$50,000');
  });

  it('should format currency with custom locale and currency', () => {
    const { result } = renderHook(() =>
      useFormattedMetrics({ locale: 'sv-SE', currency: 'SEK' })
    );

    const formatted = result.current.currency(50000);
    // Check that it contains the expected parts (locale formatting may vary)
    expect(formatted).toContain('50');
    expect(formatted).toContain('000');
    expect(formatted).toContain('kr');
  });

  it('should format percentage with default decimal places', () => {
    const { result } = renderHook(() => useFormattedMetrics());

    const formatted = result.current.percentage(0.95);
    expect(formatted).toBe('95%');
  });

  it('should format percentage with custom decimal places', () => {
    const { result } = renderHook(() => useFormattedMetrics());

    const formatted = result.current.percentage(0.754, 1);
    expect(formatted).toBe('75.4%');
  });

  it('should format percentage with two decimal places', () => {
    const { result } = renderHook(() => useFormattedMetrics());

    const formatted = result.current.percentage(0.9999, 2);
    expect(formatted).toBe('99.99%');
  });

  it('should format numbers with locale-specific formatting', () => {
    const { result } = renderHook(() => useFormattedMetrics());

    const formatted = result.current.number(1234567);
    expect(formatted).toBe('1,234,567');
  });

  it('should format numbers with custom locale', () => {
    const { result } = renderHook(() =>
      useFormattedMetrics({ locale: 'sv-SE' })
    );

    const formatted = result.current.number(1234567);
    // In Swedish locale, thousands separator is space
    expect(formatted).toContain('1');
    expect(formatted).toContain('234');
    expect(formatted).toContain('567');
  });

  it('should memoize formatters correctly', () => {
    const { result, rerender } = renderHook(() =>
      useFormattedMetrics({ locale: 'en-US', currency: 'USD' })
    );

    const firstFormatters = result.current;

    // Rerender without changing options
    rerender();

    // Should return the same object reference (memoized)
    expect(result.current).toBe(firstFormatters);
  });

  it('should recalculate when locale changes', () => {
    const { result, rerender } = renderHook(
      ({ locale, currency }) => useFormattedMetrics({ locale, currency }),
      { initialProps: { locale: 'en-US', currency: 'USD' } }
    );

    const firstFormatters = result.current;
    const firstCurrencyResult = result.current.currency(1000);

    // Change locale
    rerender({ locale: 'sv-SE', currency: 'SEK' });

    // Should return new object reference
    expect(result.current).not.toBe(firstFormatters);

    // Should produce different formatting
    const secondCurrencyResult = result.current.currency(1000);
    expect(secondCurrencyResult).not.toBe(firstCurrencyResult);
  });

  it('should recalculate when currency changes', () => {
    const { result, rerender } = renderHook(
      ({ locale, currency }) => useFormattedMetrics({ locale, currency }),
      { initialProps: { locale: 'en-US', currency: 'USD' } }
    );

    const firstFormatters = result.current;

    // Change currency
    rerender({ locale: 'en-US', currency: 'EUR' });

    // Should return new object reference
    expect(result.current).not.toBe(firstFormatters);
  });

  it('should handle edge cases for currency formatting', () => {
    const { result } = renderHook(() => useFormattedMetrics());

    expect(result.current.currency(0)).toBe('$0');
    expect(result.current.currency(0.01)).toContain('0');
    expect(result.current.currency(999999)).toContain('999');
  });

  it('should handle edge cases for percentage formatting', () => {
    const { result } = renderHook(() => useFormattedMetrics());

    expect(result.current.percentage(0)).toBe('0%');
    expect(result.current.percentage(1)).toBe('100%');
    expect(result.current.percentage(0.001, 1)).toBe('0.1%');
    expect(result.current.percentage(0.5, 0)).toBe('50%');
  });

  it('should handle edge cases for number formatting', () => {
    const { result } = renderHook(() => useFormattedMetrics());

    expect(result.current.number(0)).toBe('0');
    expect(result.current.number(1)).toBe('1');
    expect(result.current.number(-1000)).toContain('-1');
  });

  it('should work with partial options', () => {
    // Only locale specified
    const { result: result1 } = renderHook(() =>
      useFormattedMetrics({ locale: 'sv-SE' })
    );
    expect(result1.current.currency(1000)).toBeDefined();

    // Only currency specified
    const { result: result2 } = renderHook(() =>
      useFormattedMetrics({ currency: 'EUR' })
    );
    expect(result2.current.currency(1000)).toBeDefined();

    // No options specified
    const { result: result3 } = renderHook(() => useFormattedMetrics());
    expect(result3.current.currency(1000)).toBeDefined();
  });

  it('should maintain function stability across renders when options do not change', () => {
    const { result, rerender } = renderHook(() =>
      useFormattedMetrics({ locale: 'en-US', currency: 'USD' })
    );

    const { currency: currency1, percentage: percentage1, number: number1 } = result.current;

    rerender();

    const { currency: currency2, percentage: percentage2, number: number2 } = result.current;

    // Functions should be the same reference when options don't change
    expect(currency1).toBe(currency2);
    expect(percentage1).toBe(percentage2);
    expect(number1).toBe(number2);
  });

  it('should produce consistent results for the same inputs', () => {
    const { result } = renderHook(() => useFormattedMetrics());

    const value = 12345.67;
    const result1 = result.current.currency(value);
    const result2 = result.current.currency(value);

    expect(result1).toBe(result2);
  });

  it('should handle different number scales correctly', () => {
    const { result } = renderHook(() => useFormattedMetrics());

    // Small numbers
    expect(result.current.number(1)).toBe('1');
    expect(result.current.number(99)).toBe('99');

    // Medium numbers
    expect(result.current.number(1234)).toBe('1,234');
    expect(result.current.number(99999)).toBe('99,999');

    // Large numbers
    expect(result.current.number(1000000)).toBe('1,000,000');
    expect(result.current.number(999999999)).toBe('999,999,999');
  });
});
