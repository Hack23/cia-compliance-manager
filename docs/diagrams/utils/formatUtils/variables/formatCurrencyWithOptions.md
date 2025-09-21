[**CIA Compliance Manager Diagrams v0.8.28**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/formatUtils](../README.md) / formatCurrencyWithOptions

# Variable: formatCurrencyWithOptions()

> `const` **formatCurrencyWithOptions**: (`value`, `options?`, `locale?`) => `string` = `formatCurrency`

Defined in: [utils/formatUtils.ts:93](https://github.com/Hack23/cia-compliance-manager/blob/7619f76b35999bc4eb3f6ff6c1e77c13be78f250/src/utils/formatUtils.ts#L93)

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
