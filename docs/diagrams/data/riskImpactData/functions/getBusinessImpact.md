[**CIA Compliance Manager Diagrams v0.8.17**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [data/riskImpactData](../README.md) / getBusinessImpact

# Function: getBusinessImpact()

> **getBusinessImpact**(`component`, `level`): [`BusinessImpactDetail`](../../../types/interfaces/BusinessImpactDetail.md)

Defined in: [data/riskImpactData.ts:317](https://github.com/Hack23/cia-compliance-manager/blob/6a2219920f4c187f7eafa3e355e36b35c9c19248/src/data/riskImpactData.ts#L317)

Get business impact details for a specific component and security level

## Parameters

### component

CIA component

`"confidentiality"` | `"integrity"` | `"availability"`

### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

## Returns

[`BusinessImpactDetail`](../../../types/interfaces/BusinessImpactDetail.md)

Business impact details
