[**CIA Compliance Manager Diagrams v1.1.5**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/securityMetricsService](../README.md) / getCostEstimation

# Function: getCostEstimation()

> **getCostEstimation**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<[`CostEstimation`](../interfaces/CostEstimation.md)\>

Defined in: [services/securityMetricsService.ts:1288](https://github.com/Hack23/cia-compliance-manager/blob/a17ff8a572d7423ca01410dd8a5a66308c170558/src/services/securityMetricsService.ts#L1288)

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
