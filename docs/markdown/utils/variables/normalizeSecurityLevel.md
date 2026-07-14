[**CIA Compliance Manager — Markdown Documentation v1.1.109**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / normalizeSecurityLevel

# Variable: normalizeSecurityLevel

> **normalizeSecurityLevel**: (`level?`) => [`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [utils/index.ts:127](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/utils/index.ts#L127)

Normalize any security level input to a valid SecurityLevel enum value

Handles various input formats including case variations and null/undefined values.
Provides a robust way to convert user input or API responses to valid SecurityLevel values.

## Parameters

### level?

`string` \| `null`

Input that might be a security level (can be string, SecurityLevel, null, or undefined)

## Returns

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

A valid SecurityLevel enum value (defaults to 'Moderate' if invalid)

## Example

```typescript
normalizeSecurityLevel('high')        // 'High' (case normalization)
normalizeSecurityLevel('VERY HIGH')   // 'Very High' (case normalization)
normalizeSecurityLevel(null)          // 'Moderate' (default)
normalizeSecurityLevel(undefined)     // 'Moderate' (default)
normalizeSecurityLevel('invalid')     // 'Moderate' (default for invalid input)
normalizeSecurityLevel('High')        // 'High' (already valid)
```
