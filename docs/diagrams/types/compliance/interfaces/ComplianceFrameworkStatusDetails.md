[**CIA Compliance Manager Diagrams v0.8.9**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/compliance](../README.md) / ComplianceFrameworkStatusDetails

# Interface: ComplianceFrameworkStatusDetails

Defined in: [types/compliance.ts:155](https://github.com/Hack23/cia-compliance-manager/blob/e1ae27dd41c4ccea8a13cdec993022242a97dce3/src/types/compliance.ts#L155)

Details about compliance status for a specific framework

## Properties

### findings

> **findings**: `string`[]

Defined in: [types/compliance.ts:163](https://github.com/Hack23/cia-compliance-manager/blob/e1ae27dd41c4ccea8a13cdec993022242a97dce3/src/types/compliance.ts#L163)

List of findings or gaps

***

### frameworkName

> **frameworkName**: `string`

Defined in: [types/compliance.ts:157](https://github.com/Hack23/cia-compliance-manager/blob/e1ae27dd41c4ccea8a13cdec993022242a97dce3/src/types/compliance.ts#L157)

Name of the framework

***

### metRequirements

> **metRequirements**: `string`[]

Defined in: [types/compliance.ts:166](https://github.com/Hack23/cia-compliance-manager/blob/e1ae27dd41c4ccea8a13cdec993022242a97dce3/src/types/compliance.ts#L166)

List of requirements that are met

***

### recommendations

> **recommendations**: `string`[]

Defined in: [types/compliance.ts:172](https://github.com/Hack23/cia-compliance-manager/blob/e1ae27dd41c4ccea8a13cdec993022242a97dce3/src/types/compliance.ts#L172)

Recommendations for achieving compliance

***

### status

> **status**: `string`

Defined in: [types/compliance.ts:160](https://github.com/Hack23/cia-compliance-manager/blob/e1ae27dd41c4ccea8a13cdec993022242a97dce3/src/types/compliance.ts#L160)

Current compliance status

***

### unmetRequirements

> **unmetRequirements**: `string`[]

Defined in: [types/compliance.ts:169](https://github.com/Hack23/cia-compliance-manager/blob/e1ae27dd41c4ccea8a13cdec993022242a97dce3/src/types/compliance.ts#L169)

List of requirements that are not met
