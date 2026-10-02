[**CIA Compliance Manager — UML Diagrams v1.1.159**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [services/securityMetricsService](../README.md) / getCostEstimation

# Function: getCostEstimation()

> **getCostEstimation**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<[`CostEstimation`](../interfaces/CostEstimation.md)\>

Defined in: [services/securityMetricsService.ts:1292](https://github.com/Hack23/cia-compliance-manager/blob/3584178e3069ad9fa75313e892d98650e1068c19/src/services/securityMetricsService.ts#L1292)

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
