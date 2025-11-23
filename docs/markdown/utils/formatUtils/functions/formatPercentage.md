[**CIA Compliance Manager Documentation v1.0.0**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/formatUtils](../README.md) / formatPercentage

# Function: formatPercentage()

> **formatPercentage**(`value`, `decimalPlaces`): `string`

Defined in: [utils/formatUtils.ts:48](https://github.com/Hack23/cia-compliance-manager/blob/6290ffdea026b27178aa3dd9f66b65db82b8b040/src/utils/formatUtils.ts#L48)

Formats a decimal as a percentage

Converts decimal values (0-1 range) to percentage strings with
configurable decimal places. Useful for displaying metrics like
uptime, completion rates, or risk reduction percentages.

## Parameters

### value

`number`

Decimal value where 1.0 = 100% (e.g., 0.75 = 75%)

### decimalPlaces

`number` = `0`

Number of decimal places to display

## Returns

`string`

Formatted percentage string with % symbol

## Example

```typescript
formatPercentage(0.754, 1)    // "75.4%"
formatPercentage(0.99, 0)     // "99%"
formatPercentage(0.9999, 2)   // "99.99%"
formatPercentage(1, 0)        // "100%"
```
