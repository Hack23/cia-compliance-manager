[**CIA Compliance Manager Diagrams v0.8.5**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / formatCurrency

# Variable: formatCurrency()

> **formatCurrency**: (`value`, `options`?, `locale`?) => `string`

Defined in: [utils/index.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/b7c3bc9644fb5b9d82b5b184ba290206da25104b/src/utils/index.ts#L61)

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
