[**CIA Compliance Manager Diagrams v1.1.23**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/securityMetricsService](../README.md) / getTechnicalDetails

# Function: getTechnicalDetails()

> **getTechnicalDetails**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<[`TechnicalDetailsResponse`](../interfaces/TechnicalDetailsResponse.md)\>

Defined in: [services/securityMetricsService.ts:1502](https://github.com/Hack23/cia-compliance-manager/blob/eea5df051b2f33de27cf3c67b4e7f761c2c7959f/src/services/securityMetricsService.ts#L1502)

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

`Promise`\<[`TechnicalDetailsResponse`](../interfaces/TechnicalDetailsResponse.md)\>

Technical details
