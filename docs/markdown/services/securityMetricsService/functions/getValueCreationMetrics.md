[**CIA Compliance Manager — Markdown Documentation v1.1.122**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [services/securityMetricsService](../README.md) / getValueCreationMetrics

# Function: getValueCreationMetrics()

> **getValueCreationMetrics**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<[`ValueCreationMetrics`](../interfaces/ValueCreationMetrics.md)\>

Defined in: [services/securityMetricsService.ts:1412](https://github.com/Hack23/cia-compliance-manager/blob/fdbd0224f5e379f45807637facf704ea40d9b47d/src/services/securityMetricsService.ts#L1412)

Get value creation metrics based on security levels

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

`Promise`\<[`ValueCreationMetrics`](../interfaces/ValueCreationMetrics.md)\>

Value creation metrics
