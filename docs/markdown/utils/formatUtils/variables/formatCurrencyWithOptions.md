[**CIA Compliance Manager Documentation v0.8.24**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/formatUtils](../README.md) / formatCurrencyWithOptions

# Variable: formatCurrencyWithOptions()

> `const` **formatCurrencyWithOptions**: (`value`, `options?`, `locale?`) => `string` = `formatCurrency`

Defined in: [utils/formatUtils.ts:93](https://github.com/Hack23/cia-compliance-manager/blob/8f5d084752ccee354557e96bf8b49239fb671c91/src/utils/formatUtils.ts#L93)

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
