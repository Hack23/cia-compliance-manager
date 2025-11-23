[**CIA Compliance Manager Documentation v1.0.0**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [utils/riskUtils](../README.md) / createBusinessImpact

# Variable: createBusinessImpact()

> `const` **createBusinessImpact**: (`component`, `level`) => [`BusinessImpactDetails`](../../../types/interfaces/BusinessImpactDetails.md) = `createDefaultBusinessImpact`

Defined in: [utils/riskUtils.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/6290ffdea026b27178aa3dd9f66b65db82b8b040/src/utils/riskUtils.ts#L35)

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
