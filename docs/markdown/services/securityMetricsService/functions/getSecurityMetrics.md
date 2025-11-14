[**CIA Compliance Manager Documentation v0.8.39**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [services/securityMetricsService](../README.md) / getSecurityMetrics

# Function: getSecurityMetrics()

> **getSecurityMetrics**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<[`SecurityMetrics`](../interfaces/SecurityMetrics.md)\>

Defined in: [services/securityMetricsService.ts:1294](https://github.com/Hack23/cia-compliance-manager/blob/9eb094f233d2f30300190730a81ad03ea8549a0e/src/services/securityMetricsService.ts#L1294)

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
