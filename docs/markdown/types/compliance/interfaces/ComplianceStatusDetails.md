[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/compliance](../README.md) / ComplianceStatusDetails

# Interface: ComplianceStatusDetails

Defined in: [types/compliance.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L61)

Represents the overall compliance status

## Properties

### status

> **status**: `string`

Defined in: [types/compliance.ts:63](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L63)

***

### compliantFrameworks

> **compliantFrameworks**: `string`[]

Defined in: [types/compliance.ts:64](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L64)

***

### partiallyCompliantFrameworks

> **partiallyCompliantFrameworks**: `string`[]

Defined in: [types/compliance.ts:65](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L65)

***

### nonCompliantFrameworks

> **nonCompliantFrameworks**: `string`[]

Defined in: [types/compliance.ts:66](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L66)

***

### frameworks?

> `optional` **frameworks?**: [`ComplianceFramework`](ComplianceFramework.md)[]

Defined in: [types/compliance.ts:67](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L67)

***

### remediationSteps?

> `optional` **remediationSteps?**: `string`[]

Defined in: [types/compliance.ts:70](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L70)

***

### requirements?

> `optional` **requirements?**: `string`[]

Defined in: [types/compliance.ts:71](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L71)

***

### complianceScore

> **complianceScore**: `number`

Defined in: [types/compliance.ts:72](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L72)

***

### statusText?

> `optional` **statusText?**: `string`

Defined in: [types/compliance.ts:75](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L75)

***

### frameworkName?

> `optional` **frameworkName?**: `string`

Defined in: [types/compliance.ts:78](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L78)

***

### findings?

> `optional` **findings?**: `string`[]

Defined in: [types/compliance.ts:79](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L79)

***

### metRequirements?

> `optional` **metRequirements?**: `string`[]

Defined in: [types/compliance.ts:80](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L80)

***

### unmetRequirements?

> `optional` **unmetRequirements?**: `string`[]

Defined in: [types/compliance.ts:81](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L81)

***

### recommendations?

> `optional` **recommendations?**: `string`[]

Defined in: [types/compliance.ts:82](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L82)
