[**CIA Compliance Manager Diagrams v0.8.15**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/securityMetricsService](../README.md) / getTechnicalDetails

# Function: getTechnicalDetails()

> **getTechnicalDetails**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<`any`\>

Defined in: [services/securityMetricsService.ts:1318](https://github.com/Hack23/cia-compliance-manager/blob/50a3bb1fa64948444e36c06fee075b5043350db0/src/services/securityMetricsService.ts#L1318)

Get technical details based on security levels

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

Technical details
