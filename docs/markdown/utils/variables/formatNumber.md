[**CIA Compliance Manager Documentation v1.0.1**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / formatNumber

# Variable: formatNumber()

> **formatNumber**: (`value`, `decimalPlaces?`) => `string`

Defined in: [utils/index.ts:68](https://github.com/Hack23/cia-compliance-manager/blob/c7987c008cc0b8531a9c787c68851dc49ec5f6e0/src/utils/index.ts#L68)

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
