[**CIA Compliance Manager Diagrams v0.8.0**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [services/ciaContentService](../README.md) / getComplianceStatus

# Function: getComplianceStatus()

> **getComplianceStatus**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `object`

Defined in: [src/services/ciaContentService.ts:1380](https://github.com/Hack23/cia-compliance-manager/blob/fa2f95f029cdcd192b3882a37d0d34753edcd349/src/services/ciaContentService.ts#L1380)

Get compliance status based on CIA security levels

## Parameters

### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

## Returns

`object`

### compliantFrameworks

> **compliantFrameworks**: `string`[]

### nonCompliantFrameworks

> **nonCompliantFrameworks**: `string`[]

### partiallyCompliantFrameworks

> **partiallyCompliantFrameworks**: `string`[]

### remediationSteps?

> `optional` **remediationSteps**: `string`[]

### requirements?

> `optional` **requirements**: `string`[]
