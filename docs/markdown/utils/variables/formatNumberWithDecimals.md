[**CIA Compliance Manager Documentation v1.1.17**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / formatNumberWithDecimals

# Variable: formatNumberWithDecimals()

> **formatNumberWithDecimals**: (`value`, `decimalPlaces`) => `string`

Defined in: [utils/index.ts:94](https://github.com/Hack23/cia-compliance-manager/blob/64549ac2e28eb854ca1acff8c4df7f34bf49dfaa/src/utils/index.ts#L94)

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
