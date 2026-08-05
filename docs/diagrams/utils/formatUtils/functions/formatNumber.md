[**CIA Compliance Manager — UML Diagrams v1.1.127**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/formatUtils](../README.md) / formatNumber

# Function: formatNumber()

> **formatNumber**(`value`, `decimalPlaces?`): `string`

Defined in: [utils/formatUtils.ts:227](https://github.com/Hack23/cia-compliance-manager/blob/b44ae23b82aba288e01694c3ce1c42a26c105d38/src/utils/formatUtils.ts#L227)

Format a number with thousands separators and optional decimal places

Provides locale-aware number formatting with thousands separators
and configurable decimal precision.

## Parameters

### value

`number`

Number to format

### decimalPlaces?

`number`

Optional number of decimal places to display

## Returns

`string`

Formatted number string with separators

## Example

```typescript
formatNumber(1234567)          // "1,234,567"
formatNumber(1234.5678)        // "1,234.568" (locale dependent)
formatNumber(1234.5678, 2)     // "1234.57"
formatNumber(999.999, 1)       // "1000.0"
```
