[**CIA Compliance Manager Documentation v0.8.23**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [services/securityMetricsService](../README.md) / getTechnicalDetails

# Function: getTechnicalDetails()

> **getTechnicalDetails**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<`any`\>

Defined in: [services/securityMetricsService.ts:1318](https://github.com/Hack23/cia-compliance-manager/blob/55488ba3ac0003e4435eb3634b6ab6e9b8b05a9b/src/services/securityMetricsService.ts#L1318)

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
