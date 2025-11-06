[**CIA Compliance Manager Diagrams v0.8.36**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/securityMetricsService](../README.md) / getSecurityResources

# Function: getSecurityResources()

> **getSecurityResources**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<`any`\>

Defined in: [services/securityMetricsService.ts:1393](https://github.com/Hack23/cia-compliance-manager/blob/2ec0557cf80706d3ac1df0334a4af519a5787366/src/services/securityMetricsService.ts#L1393)

Get security resources based on security levels

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

Security resources
