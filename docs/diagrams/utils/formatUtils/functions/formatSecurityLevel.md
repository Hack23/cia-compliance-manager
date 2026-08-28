[**CIA Compliance Manager — UML Diagrams v1.1.140**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/formatUtils](../README.md) / formatSecurityLevel

# Function: formatSecurityLevel()

> **formatSecurityLevel**(`level`): `string`

Defined in: [utils/formatUtils.ts:156](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/utils/formatUtils.ts#L156)

Format security level for display

Currently returns the security level as-is since SecurityLevel type
values are already properly capitalized. This function exists for
consistency and potential future formatting needs.

## Parameters

### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level to format

## Returns

`string`

Formatted security level string

## Example

```typescript
formatSecurityLevel('High')       // "High"
formatSecurityLevel('Very High')  // "Very High"
formatSecurityLevel('Moderate')   // "Moderate"
```
