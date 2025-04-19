[**CIA Compliance Manager Diagrams v0.8.8**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/compliance](../README.md) / FrameworkComplianceStatus

# Interface: FrameworkComplianceStatus

Defined in: [types/compliance.ts:178](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/types/compliance.ts#L178)

Status of compliance with a specific framework

## Properties

### applicable

> **applicable**: `boolean`

Defined in: [types/compliance.ts:183](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/types/compliance.ts#L183)

Whether the framework applies

***

### complianceGaps

> **complianceGaps**: `string`[]

Defined in: [types/compliance.ts:192](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/types/compliance.ts#L192)

Key gaps in compliance

***

### compliancePercentage

> **compliancePercentage**: `number`

Defined in: [types/compliance.ts:189](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/types/compliance.ts#L189)

Percentage of requirements met

***

### name

> **name**: `string`

Defined in: [types/compliance.ts:180](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/types/compliance.ts#L180)

Name of the framework

***

### requiredSecurityLevel

> **requiredSecurityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/compliance.ts:195](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/types/compliance.ts#L195)

Required security level to satisfy the framework

***

### status

> **status**: `"Compliant"` \| `"Partially Compliant"` \| `"Non-Compliant"`

Defined in: [types/compliance.ts:186](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/types/compliance.ts#L186)

Current compliance status
