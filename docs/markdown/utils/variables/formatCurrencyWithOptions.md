[**CIA Compliance Manager Documentation v0.8.6**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / formatCurrencyWithOptions

# Variable: formatCurrencyWithOptions()

> **formatCurrencyWithOptions**: (`value`, `options`?, `locale`?) => `string`

Defined in: [utils/index.ts:64](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/utils/index.ts#L64)

Formats a number as currency with proper thousands separators

## Parameters

### value

`number`

The number to format as currency

### options?

Formatting options or currency code string for backward compatibility

`string` | \{ `currency`: `string`; `locale`: `string`; `maximumFractionDigits`: `number`; `minimumFractionDigits`: `number`; \}

### locale?

`string`

Optional locale for backward compatibility

## Returns

`string`

Formatted currency string
