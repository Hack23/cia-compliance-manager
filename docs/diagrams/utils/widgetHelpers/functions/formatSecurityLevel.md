[**CIA Compliance Manager — UML Diagrams v1.1.140**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/widgetHelpers](../README.md) / formatSecurityLevel

# Function: formatSecurityLevel()

> **formatSecurityLevel**(`level`): `string`

Defined in: [utils/widgetHelpers.ts:46](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/utils/widgetHelpers.ts#L46)

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
