[**CIA Compliance Manager Diagrams v0.8.40**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/securityMetricsService](../README.md) / getCostEstimation

# Function: getCostEstimation()

> **getCostEstimation**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<[`CostEstimation`](../interfaces/CostEstimation.md)\>

Defined in: [services/securityMetricsService.ts:1189](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/services/securityMetricsService.ts#L1189)

Get cost estimation based on security levels

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

`Promise`\<[`CostEstimation`](../interfaces/CostEstimation.md)\>

Cost estimation details
