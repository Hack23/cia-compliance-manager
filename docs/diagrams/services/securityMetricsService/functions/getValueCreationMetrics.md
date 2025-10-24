[**CIA Compliance Manager Diagrams v0.8.34**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/securityMetricsService](../README.md) / getValueCreationMetrics

# Function: getValueCreationMetrics()

> **getValueCreationMetrics**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<`any`\>

Defined in: [services/securityMetricsService.ts:1229](https://github.com/Hack23/cia-compliance-manager/blob/a33140701dae02a85d2f0d957645dda4d2c4da41/src/services/securityMetricsService.ts#L1229)

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

`Promise`\<`any`\>

Value creation metrics
