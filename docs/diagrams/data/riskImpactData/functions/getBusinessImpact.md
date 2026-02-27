[**CIA Compliance Manager Diagrams v1.1.25**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [data/riskImpactData](../README.md) / getBusinessImpact

# Function: getBusinessImpact()

> **getBusinessImpact**(`component`, `level`): [`BusinessImpactDetail`](../../../types/interfaces/BusinessImpactDetail.md)

Defined in: [data/riskImpactData.ts:394](https://github.com/Hack23/cia-compliance-manager/blob/59ebd29f77a54a25971ff7a3c0faf33a391bbcc5/src/data/riskImpactData.ts#L394)

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
