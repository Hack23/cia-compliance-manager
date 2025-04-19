[**CIA Compliance Manager Documentation v0.8.9**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/formatUtils](../README.md) / formatCurrency

# Function: formatCurrency()

> **formatCurrency**(`value`, `options?`, `locale?`): `string`

Defined in: [utils/formatUtils.ts:52](https://github.com/Hack23/cia-compliance-manager/blob/e1ae27dd41c4ccea8a13cdec993022242a97dce3/src/utils/formatUtils.ts#L52)

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
