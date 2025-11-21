[**CIA Compliance Manager Diagrams v0.9.2**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [hooks](../README.md) / useFormattedMetrics

# Function: useFormattedMetrics()

> **useFormattedMetrics**(`options?`): [`MetricFormatters`](../interfaces/MetricFormatters.md)

Defined in: [hooks/useFormattedMetrics.ts:79](https://github.com/Hack23/cia-compliance-manager/blob/4a2010ba7d0748aab2dadaf655c5204c6a96bd65/src/hooks/useFormattedMetrics.ts#L79)

Custom hook providing memoized formatting functions for metrics

## Business Perspective

This hook provides consistent metric formatting across all widgets,
ensuring that financial data, percentages, and numbers are displayed
uniformly. This improves comprehension and professionalism in security
reports and dashboards presented to stakeholders. 📊

The memoization ensures efficient rendering when formatting large
datasets or when components re-render frequently.

## Parameters

### options?

[`MetricFormattingOptions`](../interfaces/MetricFormattingOptions.md)

Formatting options (locale, currency)

## Returns

[`MetricFormatters`](../interfaces/MetricFormatters.md)

Memoized formatting functions for common metric types

## Example

```typescript
// Use default locale and currency (en-US, USD)
const { currency, percentage, number } = useFormattedMetrics();

console.log(currency(50000));           // "$50,000"
console.log(percentage(0.95));          // "95%"
console.log(number(1234567));           // "1,234,567"

// Use custom locale and currency
const formatters = useFormattedMetrics({ 
  locale: 'sv-SE', 
  currency: 'SEK' 
});
console.log(formatters.currency(50000)); // "50 000 kr"
```
