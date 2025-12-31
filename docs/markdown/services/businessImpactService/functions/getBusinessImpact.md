[**CIA Compliance Manager Documentation v1.1.4**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [services/businessImpactService](../README.md) / getBusinessImpact

# Function: getBusinessImpact()

> **getBusinessImpact**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<[`BusinessImpactDetail`](../../../types/interfaces/BusinessImpactDetail.md)\>

Defined in: [services/businessImpactService.ts:566](https://github.com/Hack23/cia-compliance-manager/blob/fba74cc782d525f67b6f2f9479471d38ebdbdb99/src/services/businessImpactService.ts#L566)

Get business impact details based on security levels

## Parameters

### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Integrity security level

### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality security level

## Returns

`Promise`\<[`BusinessImpactDetail`](../../../types/interfaces/BusinessImpactDetail.md)\>

Business impact details
