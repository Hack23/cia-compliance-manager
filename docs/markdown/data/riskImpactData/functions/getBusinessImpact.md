[**CIA Compliance Manager Documentation v1.0.2**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [data/riskImpactData](../README.md) / getBusinessImpact

# Function: getBusinessImpact()

> **getBusinessImpact**(`component`, `level`): [`BusinessImpactDetail`](../../../types/interfaces/BusinessImpactDetail.md)

Defined in: [data/riskImpactData.ts:394](https://github.com/Hack23/cia-compliance-manager/blob/175c46a72442c615bb0c104848c5b4deec0cfc31/src/data/riskImpactData.ts#L394)

Get business impact details for a specific component and security level

This function retrieves comprehensive business impact information based on
the CIA component (availability, integrity, or confidentiality) and the
selected security level.

## Parameters

### component

[`CIAComponent`](../../../types/cia/type-aliases/CIAComponent.md)

CIA component to get impact for

### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level for the component

## Returns

[`BusinessImpactDetail`](../../../types/interfaces/BusinessImpactDetail.md)

Business impact details including risk level, revenue loss, and recovery time

## Throws

If component or level is invalid

## Example

```typescript
const impact = getBusinessImpact("availability", "High");
console.log(impact.riskLevel); // "Low"
console.log(impact.annualRevenueLoss); // "Potential revenue loss <2% annually"
```
