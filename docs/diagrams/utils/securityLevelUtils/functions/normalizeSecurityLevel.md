[**CIA Compliance Manager Diagrams v1.1.12**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/securityLevelUtils](../README.md) / normalizeSecurityLevel

# Function: normalizeSecurityLevel()

> **normalizeSecurityLevel**(`level?`): [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [utils/securityLevelUtils.ts:52](https://github.com/Hack23/cia-compliance-manager/blob/2fe41170de20f6c4fdd8b4b044dd9ce34202b4fe/src/utils/securityLevelUtils.ts#L52)

Normalize any security level input to a valid SecurityLevel enum value

Handles various input formats including case variations and null/undefined values.
Provides a robust way to convert user input or API responses to valid SecurityLevel values.

## Parameters

### level?

Input that might be a security level (can be string, SecurityLevel, null, or undefined)

`string` | `null`

## Returns

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

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
