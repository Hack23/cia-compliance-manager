[**CIA Compliance Manager Diagrams v0.8.38**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/ciaContentService](../README.md) / getSecuritySummary

# Function: getSecuritySummary()

> **getSecuritySummary**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<`any`\>

Defined in: [services/ciaContentService.ts:1428](https://github.com/Hack23/cia-compliance-manager/blob/aedb85c440cd82a5c63a8b131e99fe72da8b07ec/src/services/ciaContentService.ts#L1428)

Get security summary based on security levels

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

Security summary details
