[**CIA Compliance Manager Diagrams v0.8.28**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [data/riskImpactData](../README.md) / getBusinessImpact

# Function: getBusinessImpact()

> **getBusinessImpact**(`component`, `level`): [`BusinessImpactDetail`](../../../types/interfaces/BusinessImpactDetail.md)

Defined in: [data/riskImpactData.ts:317](https://github.com/Hack23/cia-compliance-manager/blob/7619f76b35999bc4eb3f6ff6c1e77c13be78f250/src/data/riskImpactData.ts#L317)

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
