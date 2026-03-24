[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/compliance](../README.md) / FrameworkComplianceStatus

# Interface: FrameworkComplianceStatus

Defined in: [types/compliance.ts:197](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L197)

Status of compliance with a specific framework

## Properties

### name

> **name**: `string`

Defined in: [types/compliance.ts:199](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L199)

Name of the framework

***

### applicable

> **applicable**: `boolean`

Defined in: [types/compliance.ts:202](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L202)

Whether the framework applies

***

### status

> **status**: `"Compliant"` \| `"Partially Compliant"` \| `"Non-Compliant"`

Defined in: [types/compliance.ts:205](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L205)

Current compliance status

***

### compliancePercentage

> **compliancePercentage**: `number`

Defined in: [types/compliance.ts:208](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L208)

Percentage of requirements met

***

### complianceGaps

> **complianceGaps**: `string`[]

Defined in: [types/compliance.ts:211](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L211)

Key gaps in compliance

***

### requiredSecurityLevel

> **requiredSecurityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/compliance.ts:214](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L214)

Required security level to satisfy the framework
