[**CIA Compliance Manager Diagrams v1.0.4**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / formatNumberWithDecimals

# Variable: formatNumberWithDecimals()

> **formatNumberWithDecimals**: (`value`, `decimalPlaces`) => `string`

Defined in: [utils/index.ts:69](https://github.com/Hack23/cia-compliance-manager/blob/0b7da06a2d009cc9cac58e6400d72865b757f5d4/src/utils/index.ts#L69)

Format a number with specified decimal places

Similar to formatNumber but always returns a string with exact
decimal places, without locale-based thousands separators.

## Parameters

### value

`number`

Number to format

### decimalPlaces

`number`

Exact number of decimal places to display

## Returns

`string`

Formatted number string with fixed decimals

## Example

```typescript
formatNumberWithDecimals(1234.5678, 2)   // "1234.57"
formatNumberWithDecimals(99.5, 3)        // "99.500"
formatNumberWithDecimals(1000, 0)        // "1000"
```
