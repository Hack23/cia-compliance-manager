[**CIA Compliance Manager — UML Diagrams v1.1.129**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [services/securityMetricsService](../README.md) / getSecurityResources

# Function: getSecurityResources()

> **getSecurityResources**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<`Record`\<`string`, `unknown`\>\>

Defined in: [services/securityMetricsService.ts:1581](https://github.com/Hack23/cia-compliance-manager/blob/caa20908239c393ad6ffb27f9a5d3b0eb037294e/src/services/securityMetricsService.ts#L1581)

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

`Promise`\<`Record`\<`string`, `unknown`\>\>

Security resources
