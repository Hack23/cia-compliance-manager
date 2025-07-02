[**CIA Compliance Manager Documentation v0.8.18**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/compliance](../README.md) / ComplianceFrameworkStatusDetails

# Interface: ComplianceFrameworkStatusDetails

Defined in: [types/compliance.ts:155](https://github.com/Hack23/cia-compliance-manager/blob/509f2f6138f4e24aa7fe1ae9432ec1ccefbe5f32/src/types/compliance.ts#L155)

Details about compliance status for a specific framework

## Properties

### findings

> **findings**: `string`[]

Defined in: [types/compliance.ts:163](https://github.com/Hack23/cia-compliance-manager/blob/509f2f6138f4e24aa7fe1ae9432ec1ccefbe5f32/src/types/compliance.ts#L163)

List of findings or gaps

***

### frameworkName

> **frameworkName**: `string`

Defined in: [types/compliance.ts:157](https://github.com/Hack23/cia-compliance-manager/blob/509f2f6138f4e24aa7fe1ae9432ec1ccefbe5f32/src/types/compliance.ts#L157)

Name of the framework

***

### metRequirements

> **metRequirements**: `string`[]

Defined in: [types/compliance.ts:166](https://github.com/Hack23/cia-compliance-manager/blob/509f2f6138f4e24aa7fe1ae9432ec1ccefbe5f32/src/types/compliance.ts#L166)

List of requirements that are met

***

### recommendations

> **recommendations**: `string`[]

Defined in: [types/compliance.ts:172](https://github.com/Hack23/cia-compliance-manager/blob/509f2f6138f4e24aa7fe1ae9432ec1ccefbe5f32/src/types/compliance.ts#L172)

Recommendations for achieving compliance

***

### status

> **status**: `string`

Defined in: [types/compliance.ts:160](https://github.com/Hack23/cia-compliance-manager/blob/509f2f6138f4e24aa7fe1ae9432ec1ccefbe5f32/src/types/compliance.ts#L160)

Current compliance status

***

### unmetRequirements

> **unmetRequirements**: `string`[]

Defined in: [types/compliance.ts:169](https://github.com/Hack23/cia-compliance-manager/blob/509f2f6138f4e24aa7fe1ae9432ec1ccefbe5f32/src/types/compliance.ts#L169)

List of requirements that are not met
