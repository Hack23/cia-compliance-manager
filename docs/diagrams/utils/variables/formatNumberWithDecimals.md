[**CIA Compliance Manager — UML Diagrams v1.1.143**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / formatNumberWithDecimals

# Variable: formatNumberWithDecimals

> **formatNumberWithDecimals**: (`value`, `decimalPlaces`) => `string`

Defined in: [utils/index.ts:85](https://github.com/Hack23/cia-compliance-manager/blob/ed90fd0069f5cd488ae5acffca473ead6710addb/src/utils/index.ts#L85)

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
