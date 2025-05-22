[**CIA Compliance Manager Documentation v0.8.15**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/formatUtils](../README.md) / formatCurrency

# Function: formatCurrency()

> **formatCurrency**(`value`, `options?`, `locale?`): `string`

Defined in: [utils/formatUtils.ts:52](https://github.com/Hack23/cia-compliance-manager/blob/50a3bb1fa64948444e36c06fee075b5043350db0/src/utils/formatUtils.ts#L52)

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
