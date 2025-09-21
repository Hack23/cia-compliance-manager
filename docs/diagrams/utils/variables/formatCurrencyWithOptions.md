[**CIA Compliance Manager Diagrams v0.8.28**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / formatCurrencyWithOptions

# Variable: formatCurrencyWithOptions()

> **formatCurrencyWithOptions**: (`value`, `options?`, `locale?`) => `string`

Defined in: [utils/index.ts:64](https://github.com/Hack23/cia-compliance-manager/blob/7619f76b35999bc4eb3f6ff6c1e77c13be78f250/src/utils/index.ts#L64)

Formats a number as currency with proper thousands separators

## Parameters

### value

`number`

The number to format as currency

### options?

Formatting options or currency code string for backward compatibility

`string` | \{ `currency?`: `string`; `locale?`: `string`; `maximumFractionDigits?`: `number`; `minimumFractionDigits?`: `number`; \}

### locale?

`string`

Optional locale for backward compatibility

## Returns

`string`

Formatted currency string
