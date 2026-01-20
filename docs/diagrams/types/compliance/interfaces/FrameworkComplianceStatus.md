[**CIA Compliance Manager Diagrams v1.1.10**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/compliance](../README.md) / FrameworkComplianceStatus

# Interface: FrameworkComplianceStatus

Defined in: [types/compliance.ts:197](https://github.com/Hack23/cia-compliance-manager/blob/eb3dd66ffaf39f50db4da1b4d578d20d1c37a0b3/src/types/compliance.ts#L197)

Status of compliance with a specific framework

## Properties

### applicable

> **applicable**: `boolean`

Defined in: [types/compliance.ts:202](https://github.com/Hack23/cia-compliance-manager/blob/eb3dd66ffaf39f50db4da1b4d578d20d1c37a0b3/src/types/compliance.ts#L202)

Whether the framework applies

***

### complianceGaps

> **complianceGaps**: `string`[]

Defined in: [types/compliance.ts:211](https://github.com/Hack23/cia-compliance-manager/blob/eb3dd66ffaf39f50db4da1b4d578d20d1c37a0b3/src/types/compliance.ts#L211)

Key gaps in compliance

***

### compliancePercentage

> **compliancePercentage**: `number`

Defined in: [types/compliance.ts:208](https://github.com/Hack23/cia-compliance-manager/blob/eb3dd66ffaf39f50db4da1b4d578d20d1c37a0b3/src/types/compliance.ts#L208)

Percentage of requirements met

***

### name

> **name**: `string`

Defined in: [types/compliance.ts:199](https://github.com/Hack23/cia-compliance-manager/blob/eb3dd66ffaf39f50db4da1b4d578d20d1c37a0b3/src/types/compliance.ts#L199)

Name of the framework

***

### requiredSecurityLevel

> **requiredSecurityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/compliance.ts:214](https://github.com/Hack23/cia-compliance-manager/blob/eb3dd66ffaf39f50db4da1b4d578d20d1c37a0b3/src/types/compliance.ts#L214)

Required security level to satisfy the framework

***

### status

> **status**: `"Compliant"` \| `"Partially Compliant"` \| `"Non-Compliant"`

Defined in: [types/compliance.ts:205](https://github.com/Hack23/cia-compliance-manager/blob/eb3dd66ffaf39f50db4da1b4d578d20d1c37a0b3/src/types/compliance.ts#L205)

Current compliance status
