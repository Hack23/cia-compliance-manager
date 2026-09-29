[**CIA Compliance Manager — UML Diagrams v1.1.154**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/widgetHelpers](../README.md) / formatSecurityLevel

# Function: formatSecurityLevel()

> **formatSecurityLevel**(`level`): `string`

Defined in: [utils/widgetHelpers.ts:46](https://github.com/Hack23/cia-compliance-manager/blob/42e66b46977944fe728f624a83223bbbb90a81b2/src/utils/widgetHelpers.ts#L46)

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
