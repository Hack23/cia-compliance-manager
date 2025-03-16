[**CIA Compliance Manager Documentation v0.8.1**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / getComplianceStatus

# Function: getComplianceStatus()

> **getComplianceStatus**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `object`

Defined in: [src/services/ciaContentService.ts:1380](https://github.com/Hack23/cia-compliance-manager/blob/aea527f1006de96602c10bb201453301cffe7b07/src/services/ciaContentService.ts#L1380)

Get compliance status based on CIA security levels

## Parameters

### availabilityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

### integrityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

### confidentialityLevel

[`SecurityLevel`](../type-aliases/SecurityLevel.md)

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
