[**CIA Compliance Manager — UML Diagrams v1.1.142**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / formatSecurityLevelFromWidget

# Variable: formatSecurityLevelFromWidget

> **formatSecurityLevelFromWidget**: (`level`) => `string`

Defined in: [utils/index.ts:131](https://github.com/Hack23/cia-compliance-manager/blob/7749169fe0dfb00ea4da12e5941787f96c33f1d8/src/utils/index.ts#L131)

Format security level string to the standardized format

Normalizes security level strings to match the SecurityLevel enum values,
handling case variations and trimming whitespace. Essential for ensuring
consistent level representation across the application.

## Parameters

### level

`string` \| `null` \| `undefined`

Security level string to format

## Returns

`string`

Formatted security level matching SecurityLevel enum

## Example

```typescript
formatSecurityLevel('high')        // 'High'
formatSecurityLevel('VERY HIGH')   // 'Very High'
formatSecurityLevel('  low  ')     // 'Low'
formatSecurityLevel(null)          // 'None'
formatSecurityLevel(undefined)     // 'None'
formatSecurityLevel('invalid')     // 'None' (defaults to None)
```
