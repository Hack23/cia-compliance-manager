[**CIA Compliance Manager Diagrams v1.0.6**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/formatUtils](../README.md) / formatSecurityLevel

# Function: formatSecurityLevel()

> **formatSecurityLevel**(`level`): `string`

Defined in: [utils/formatUtils.ts:148](https://github.com/Hack23/cia-compliance-manager/blob/9b3072efb30bdaf3352c14e8d2bbb95562548f7a/src/utils/formatUtils.ts#L148)

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
