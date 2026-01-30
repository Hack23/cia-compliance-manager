[**CIA Compliance Manager Diagrams v1.1.14**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/compliance](../README.md) / ComplianceFrameworkStatusDetails

# Interface: ComplianceFrameworkStatusDetails

Defined in: [types/compliance.ts:174](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/compliance.ts#L174)

Details about compliance status for a specific framework

## Properties

### findings

> **findings**: `string`[]

Defined in: [types/compliance.ts:182](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/compliance.ts#L182)

List of findings or gaps

***

### frameworkName

> **frameworkName**: `string`

Defined in: [types/compliance.ts:176](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/compliance.ts#L176)

Name of the framework

***

### metRequirements

> **metRequirements**: `string`[]

Defined in: [types/compliance.ts:185](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/compliance.ts#L185)

List of requirements that are met

***

### recommendations

> **recommendations**: `string`[]

Defined in: [types/compliance.ts:191](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/compliance.ts#L191)

Recommendations for achieving compliance

***

### status

> **status**: `string`

Defined in: [types/compliance.ts:179](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/compliance.ts#L179)

Current compliance status

***

### unmetRequirements

> **unmetRequirements**: `string`[]

Defined in: [types/compliance.ts:188](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/compliance.ts#L188)

List of requirements that are not met
