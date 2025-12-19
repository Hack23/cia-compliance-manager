[**CIA Compliance Manager Documentation v1.0.5**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/formatUtils](../README.md) / formatCurrency

# Function: formatCurrency()

> **formatCurrency**(`value`, `options?`, `locale?`): `string`

Defined in: [utils/formatUtils.ts:88](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/utils/formatUtils.ts#L88)

Formats a number as currency with proper thousands separators

Provides flexible currency formatting with support for different locales
and currencies. Handles both object-style and legacy string-style parameters
for backward compatibility.

## Parameters

### value

`number`

The numeric value to format as currency

### options?

Formatting options object or currency code string (for backward compatibility)

`string` |

\{ `currency?`: `string`; `locale?`: `string`; `maximumFractionDigits?`: `number`; `minimumFractionDigits?`: `number`; \}

Formatting options object or currency code string (for backward compatibility)

#### currency?

`string`

Currency code (e.g., 'USD', 'EUR', 'SEK')

#### locale?

`string`

Locale string for regional formatting (e.g., 'en-US', 'sv-SE')

#### maximumFractionDigits?

`number`

Maximum decimal places to show

#### minimumFractionDigits?

`number`

Minimum decimal places to show

### locale?

`string`

Optional locale for backward compatibility with string options

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

// Legacy string-style options (backward compatible)
formatCurrency(1234.56, 'SEK', 'sv-SE')                   // "1 235 kr"
formatCurrency(50000, 'USD')                              // "$50,000"
```
