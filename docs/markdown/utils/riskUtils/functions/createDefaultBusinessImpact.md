[**CIA Compliance Manager Documentation v1.1.18**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/riskUtils](../README.md) / createDefaultBusinessImpact

# Function: createDefaultBusinessImpact()

> **createDefaultBusinessImpact**(`component`, `level`): [`BusinessImpactDetails`](../../../types/interfaces/BusinessImpactDetails.md)

Defined in: [data/riskImpactData.ts:540](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/data/riskImpactData.ts#L540)

Create a default business impact object with minimum required fields

Generates a basic business impact assessment structure for a given
CIA component and security level, suitable for initial assessments
or as a fallback when detailed data is unavailable.

## Parameters

### component

`string`

CIA component type (availability, integrity, confidentiality, or custom)

### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level for the component

## Returns

[`BusinessImpactDetails`](../../../types/interfaces/BusinessImpactDetails.md)

Business impact details with financial, operational, and reputational aspects

## Example

```typescript
const impact = createDefaultBusinessImpact("availability", "Moderate");
console.log(impact.summary); // "availability impact analysis for Moderate level"
console.log(impact.financial?.riskLevel); // "Medium"
```
