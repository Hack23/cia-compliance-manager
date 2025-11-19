[**CIA Compliance Manager Diagrams v0.9.1**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [hooks](../README.md) / useBusinessImpact

# Function: useBusinessImpact()

> **useBusinessImpact**(`component`, `level`): [`BusinessImpactDetails`](../../types/interfaces/BusinessImpactDetails.md)

Defined in: [hooks/useBusinessImpact.ts:30](https://github.com/Hack23/cia-compliance-manager/blob/ed529758bfc0094a33b4d59489764ae95f191acd/src/hooks/useBusinessImpact.ts#L30)

Custom hook for fetching business impact details with fallback

## Business Perspective

This hook provides consistent access to business impact information
across all widget components. It automatically falls back to default
values when the service is unavailable, ensuring widgets always display
meaningful impact information to stakeholders. 💼

## Parameters

### component

[`CIAComponent`](../../types/cia/type-aliases/CIAComponent.md)

CIA component (availability, integrity, confidentiality)

### level

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Security level for the component

## Returns

[`BusinessImpactDetails`](../../types/interfaces/BusinessImpactDetails.md)

Business impact details with automatic fallback

## Example

```typescript
const impact = useBusinessImpact('confidentiality', 'Very High');

// Always returns impact data, never null
console.log(impact.financialImpact);
console.log(impact.operationalImpact);
```
