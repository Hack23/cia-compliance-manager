[**CIA Compliance Manager Documentation v1.1.5**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [services/complianceService](../README.md) / getComplianceStatus

# Function: getComplianceStatus()

> **getComplianceStatus**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<[`ComplianceStatusDetails`](../../../types/compliance/interfaces/ComplianceStatusDetails.md)\>

Defined in: [services/complianceService.ts:1059](https://github.com/Hack23/cia-compliance-manager/blob/a17ff8a572d7423ca01410dd8a5a66308c170558/src/services/complianceService.ts#L1059)

Get compliance status based on security levels

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

`Promise`\<[`ComplianceStatusDetails`](../../../types/compliance/interfaces/ComplianceStatusDetails.md)\>

Compliance status details
