[**CIA Compliance Manager — Markdown Documentation v1.1.119**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/formatUtils](../README.md) / formatCurrency

# Function: formatCurrency()

> **formatCurrency**(`value`, `options?`, `locale?`): `string`

Defined in: [utils/formatUtils.ts:103](https://github.com/Hack23/cia-compliance-manager/blob/7d45bfa4f992cc55d1be9827bce5909a82933f5f/src/utils/formatUtils.ts#L103)

Formats a number as currency with proper thousands separators

Provides flexible currency formatting with support for different locales
and currencies. Accepts either an options object or a positional currency
code with optional locale.

## Parameters

### value

`number`

The numeric value to format as currency

### options?

`string` \| \{ `locale?`: `string`; `currency?`: `string`; `minimumFractionDigits?`: `number`; `maximumFractionDigits?`: `number`; \}

Formatting options object or currency code string

`string`

***

#### Type Literal

\{ `locale?`: `string`; `currency?`: `string`; `minimumFractionDigits?`: `number`; `maximumFractionDigits?`: `number`; \}

Formatting options object or currency code string

##### locale?

`string`

Locale string for regional formatting (e.g., 'en-US', 'sv-SE')

##### currency?

`string`

Currency code (e.g., 'USD', 'EUR', 'SEK')

##### minimumFractionDigits?

`number`

Minimum decimal places to show

##### maximumFractionDigits?

`number`

Maximum decimal places to show

### locale?

`string`

Optional locale when using the positional currency-code form

## Returns

`string`

Formatted currency string with symbol and separators

## Example

```typescript
// Object-style options (recommended)
formatCurrency(1234.56)                                    // "$1,235" (default: USD, 0 decimals)
formatCurrency(1234.56, { currency: 'EUR' })              // "€1,235"
formatCurrency(1234.56, {
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})                                                         // "$1,234.56"

// Positional string-style options
formatCurrency(1234.56, 'SEK', 'sv-SE')                   // "1 235 kr"
formatCurrency(50000, 'USD')                              // "$50,000"
```
