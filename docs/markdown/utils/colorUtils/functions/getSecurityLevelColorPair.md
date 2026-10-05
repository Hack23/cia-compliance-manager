[**CIA Compliance Manager — Markdown Documentation v1.1.160**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/colorUtils](../README.md) / getSecurityLevelColorPair

# Function: getSecurityLevelColorPair()

> **getSecurityLevelColorPair**(`level`): [`SecurityLevelColorPair`](../../../colorConstants/interfaces/SecurityLevelColorPair.md)

Defined in: [utils/colorUtils.ts:42](https://github.com/Hack23/cia-compliance-manager/blob/65d80050336fcb6ec803a647b772abde27cf817d/src/utils/colorUtils.ts#L42)

Get color pair (background and text) for a specific security level

Returns coordinated background and text colors optimized for readability
and visual hierarchy in security level displays. Colors follow consistent
semantic meaning across the application.

## Parameters

### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level to get color for

## Returns

[`SecurityLevelColorPair`](../../../colorConstants/interfaces/SecurityLevelColorPair.md)

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
