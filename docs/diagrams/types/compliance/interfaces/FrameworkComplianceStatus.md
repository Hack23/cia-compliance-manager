[**CIA Compliance Manager — UML Diagrams v1.1.118**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/compliance](../README.md) / FrameworkComplianceStatus

# Interface: FrameworkComplianceStatus

Defined in: [types/compliance.ts:193](https://github.com/Hack23/cia-compliance-manager/blob/191e4152219d006312588704a3d133d539cb2315/src/types/compliance.ts#L193)

Status of compliance with a specific framework

## Properties

### name

> **name**: `string`

Defined in: [types/compliance.ts:195](https://github.com/Hack23/cia-compliance-manager/blob/191e4152219d006312588704a3d133d539cb2315/src/types/compliance.ts#L195)

Name of the framework

***

### applicable

> **applicable**: `boolean`

Defined in: [types/compliance.ts:198](https://github.com/Hack23/cia-compliance-manager/blob/191e4152219d006312588704a3d133d539cb2315/src/types/compliance.ts#L198)

Whether the framework applies

***

### status

> **status**: `"Compliant"` \| `"Partially Compliant"` \| `"Non-Compliant"`

Defined in: [types/compliance.ts:201](https://github.com/Hack23/cia-compliance-manager/blob/191e4152219d006312588704a3d133d539cb2315/src/types/compliance.ts#L201)

Current compliance status

***

### compliancePercentage

> **compliancePercentage**: `number`

Defined in: [types/compliance.ts:204](https://github.com/Hack23/cia-compliance-manager/blob/191e4152219d006312588704a3d133d539cb2315/src/types/compliance.ts#L204)

Percentage of requirements met

***

### complianceGaps

> **complianceGaps**: `string`[]

Defined in: [types/compliance.ts:207](https://github.com/Hack23/cia-compliance-manager/blob/191e4152219d006312588704a3d133d539cb2315/src/types/compliance.ts#L207)

Key gaps in compliance

***

### requiredSecurityLevel

> **requiredSecurityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/compliance.ts:210](https://github.com/Hack23/cia-compliance-manager/blob/191e4152219d006312588704a3d133d539cb2315/src/types/compliance.ts#L210)

Required security level to satisfy the framework
