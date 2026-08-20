[**CIA Compliance Manager — Markdown Documentation v1.1.135**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [services/securityMetricsService](../README.md) / getCostEstimation

# Function: getCostEstimation()

> **getCostEstimation**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<[`CostEstimation`](../interfaces/CostEstimation.md)\>

Defined in: [services/securityMetricsService.ts:1292](https://github.com/Hack23/cia-compliance-manager/blob/adbb4925fe59f61a674ca7ca5a3bd8d1bad15900/src/services/securityMetricsService.ts#L1292)

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
