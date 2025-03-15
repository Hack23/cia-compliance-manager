[**CIA Compliance Manager API Documentation v0.7.0**](../../../README.md)

***

[CIA Compliance Manager API Documentation](../../../modules.md) / [services/ciaContentService](../README.md) / getComplianceStatus

# Function: getComplianceStatus()

> **getComplianceStatus**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `object`

Defined in: [src/services/ciaContentService.ts:1379](https://github.com/Hack23/cia-compliance-manager/blob/a904e43458f81faf7066f9da9fc149cc9f6e236d/src/services/ciaContentService.ts#L1379)

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
