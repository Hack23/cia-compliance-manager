[**CIA Compliance Manager — Markdown Documentation v1.1.112**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/compliance](../README.md) / ComplianceStatusDetails

# Interface: ComplianceStatusDetails

Defined in: [types/compliance.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/72fa42d162c7bd411972c979f0e49eb7a915751c/src/types/compliance.ts#L61)

Represents the overall compliance status

## Properties

### status

> **status**: `string`

Defined in: [types/compliance.ts:62](https://github.com/Hack23/cia-compliance-manager/blob/72fa42d162c7bd411972c979f0e49eb7a915751c/src/types/compliance.ts#L62)

***

### compliantFrameworks

> **compliantFrameworks**: `string`[]

Defined in: [types/compliance.ts:63](https://github.com/Hack23/cia-compliance-manager/blob/72fa42d162c7bd411972c979f0e49eb7a915751c/src/types/compliance.ts#L63)

***

### partiallyCompliantFrameworks

> **partiallyCompliantFrameworks**: `string`[]

Defined in: [types/compliance.ts:64](https://github.com/Hack23/cia-compliance-manager/blob/72fa42d162c7bd411972c979f0e49eb7a915751c/src/types/compliance.ts#L64)

***

### nonCompliantFrameworks

> **nonCompliantFrameworks**: `string`[]

Defined in: [types/compliance.ts:65](https://github.com/Hack23/cia-compliance-manager/blob/72fa42d162c7bd411972c979f0e49eb7a915751c/src/types/compliance.ts#L65)

***

### frameworks?

> `optional` **frameworks?**: [`ComplianceFramework`](ComplianceFramework.md)[]

Defined in: [types/compliance.ts:66](https://github.com/Hack23/cia-compliance-manager/blob/72fa42d162c7bd411972c979f0e49eb7a915751c/src/types/compliance.ts#L66)

***

### remediationSteps?

> `optional` **remediationSteps?**: `string`[]

Defined in: [types/compliance.ts:68](https://github.com/Hack23/cia-compliance-manager/blob/72fa42d162c7bd411972c979f0e49eb7a915751c/src/types/compliance.ts#L68)

***

### requirements?

> `optional` **requirements?**: `string`[]

Defined in: [types/compliance.ts:69](https://github.com/Hack23/cia-compliance-manager/blob/72fa42d162c7bd411972c979f0e49eb7a915751c/src/types/compliance.ts#L69)

***

### complianceScore

> **complianceScore**: `number`

Defined in: [types/compliance.ts:70](https://github.com/Hack23/cia-compliance-manager/blob/72fa42d162c7bd411972c979f0e49eb7a915751c/src/types/compliance.ts#L70)

***

### statusText?

> `optional` **statusText?**: `string`

Defined in: [types/compliance.ts:72](https://github.com/Hack23/cia-compliance-manager/blob/72fa42d162c7bd411972c979f0e49eb7a915751c/src/types/compliance.ts#L72)

***

### frameworkName?

> `optional` **frameworkName?**: `string`

Defined in: [types/compliance.ts:74](https://github.com/Hack23/cia-compliance-manager/blob/72fa42d162c7bd411972c979f0e49eb7a915751c/src/types/compliance.ts#L74)

***

### findings?

> `optional` **findings?**: `string`[]

Defined in: [types/compliance.ts:75](https://github.com/Hack23/cia-compliance-manager/blob/72fa42d162c7bd411972c979f0e49eb7a915751c/src/types/compliance.ts#L75)

***

### metRequirements?

> `optional` **metRequirements?**: `string`[]

Defined in: [types/compliance.ts:76](https://github.com/Hack23/cia-compliance-manager/blob/72fa42d162c7bd411972c979f0e49eb7a915751c/src/types/compliance.ts#L76)

***

### unmetRequirements?

> `optional` **unmetRequirements?**: `string`[]

Defined in: [types/compliance.ts:77](https://github.com/Hack23/cia-compliance-manager/blob/72fa42d162c7bd411972c979f0e49eb7a915751c/src/types/compliance.ts#L77)

***

### recommendations?

> `optional` **recommendations?**: `string`[]

Defined in: [types/compliance.ts:78](https://github.com/Hack23/cia-compliance-manager/blob/72fa42d162c7bd411972c979f0e49eb7a915751c/src/types/compliance.ts#L78)
