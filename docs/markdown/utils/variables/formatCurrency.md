[**CIA Compliance Manager Documentation v0.8.19**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / formatCurrency

# Variable: formatCurrency()

> **formatCurrency**: (`value`, `options?`, `locale?`) => `string`

Defined in: [utils/index.ts:63](https://github.com/Hack23/cia-compliance-manager/blob/8a17389ebf0d2a027875b835eec814811b99abcc/src/utils/index.ts#L63)

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
