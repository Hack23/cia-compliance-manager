[**CIA Compliance Manager Documentation v1.1.15**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/colorUtils](../README.md) / getSecurityLevelColorPair

# Function: getSecurityLevelColorPair()

> **getSecurityLevelColorPair**(`level`): `SecurityLevelColorPair`

Defined in: [utils/colorUtils.ts:42](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/utils/colorUtils.ts#L42)

Get color pair (background and text) for a specific security level

Returns coordinated background and text colors optimized for readability
and visual hierarchy in security level displays. Colors follow consistent
semantic meaning across the application.

## Parameters

### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level to get color for

## Returns

`SecurityLevelColorPair`

Object with background and text color hex codes

## Example

```typescript
const colors = getSecurityLevelColorPair('High');
console.log(colors.bg);   // "#fff8e1" (light amber background)
console.log(colors.text); // "#ff8f00" (amber text)

// Usage in component
<div style={{
  backgroundColor: colors.bg,
  color: colors.text
}}>
  High Security Level
</div>
```
