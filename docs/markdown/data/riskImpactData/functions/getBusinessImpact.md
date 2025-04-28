[**CIA Compliance Manager Documentation v0.8.12**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [data/riskImpactData](../README.md) / getBusinessImpact

# Function: getBusinessImpact()

> **getBusinessImpact**(`component`, `level`): [`BusinessImpactDetail`](../../../types/interfaces/BusinessImpactDetail.md)

Defined in: [data/riskImpactData.ts:317](https://github.com/Hack23/cia-compliance-manager/blob/e7811142a771ec75716a7ce3a0d60f18cb91cd06/src/data/riskImpactData.ts#L317)

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
