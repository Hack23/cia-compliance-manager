[**CIA Compliance Manager Diagrams v1.1.15**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/formatUtils](../README.md) / formatSecurityLevel

# Function: formatSecurityLevel()

> **formatSecurityLevel**(`level`): `string`

Defined in: [utils/formatUtils.ts:165](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/utils/formatUtils.ts#L165)

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
