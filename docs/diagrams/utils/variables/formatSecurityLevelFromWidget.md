[**CIA Compliance Manager Diagrams v1.1.20**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / formatSecurityLevelFromWidget

# Variable: formatSecurityLevelFromWidget()

> **formatSecurityLevelFromWidget**: (`level`) => `string`

Defined in: [utils/index.ts:144](https://github.com/Hack23/cia-compliance-manager/blob/c2ee7b2fcb69460ebb29176ad9c216fcb0830779/src/utils/index.ts#L144)

Format security level string to the standardized format

Normalizes security level strings to match the SecurityLevel enum values,
handling case variations and trimming whitespace. Essential for ensuring
consistent level representation across the application.

## Parameters

### level

Security level string to format

`string` | `null` | `undefined`

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
