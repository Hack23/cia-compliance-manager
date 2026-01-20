[**CIA Compliance Manager Diagrams v1.1.10**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / formatSecurityLevelFromWidget

# Variable: formatSecurityLevelFromWidget()

> **formatSecurityLevelFromWidget**: (`level`) => `string`

Defined in: [utils/index.ts:144](https://github.com/Hack23/cia-compliance-manager/blob/eb3dd66ffaf39f50db4da1b4d578d20d1c37a0b3/src/utils/index.ts#L144)

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
