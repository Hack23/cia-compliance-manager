[**CIA Compliance Manager Diagrams v1.1.29**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/securityMetricsService](../README.md) / getSecurityMetrics

# Function: getSecurityMetrics()

> **getSecurityMetrics**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<[`SecurityMetrics`](../interfaces/SecurityMetrics.md)\>

Defined in: [services/securityMetricsService.ts:1478](https://github.com/Hack23/cia-compliance-manager/blob/6b0efc4a0e6dc19fe754f64606c6464995b0f7f5/src/services/securityMetricsService.ts#L1478)

Get security metrics based on security levels

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

`Promise`\<[`SecurityMetrics`](../interfaces/SecurityMetrics.md)\>

Security metrics
