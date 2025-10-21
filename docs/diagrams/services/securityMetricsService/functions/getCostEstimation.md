[**CIA Compliance Manager Diagrams v0.8.33**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/securityMetricsService](../README.md) / getCostEstimation

# Function: getCostEstimation()

> **getCostEstimation**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<`any`\>

Defined in: [services/securityMetricsService.ts:1109](https://github.com/Hack23/cia-compliance-manager/blob/1f4f2c51bc48d917eff1eb43881cee05d381f406/src/services/securityMetricsService.ts#L1109)

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

`Promise`\<`any`\>

Cost estimation details
