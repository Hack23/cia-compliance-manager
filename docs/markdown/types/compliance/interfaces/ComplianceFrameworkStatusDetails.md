[**CIA Compliance Manager Documentation v1.1.18**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/compliance](../README.md) / ComplianceFrameworkStatusDetails

# Interface: ComplianceFrameworkStatusDetails

Defined in: [types/compliance.ts:174](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/types/compliance.ts#L174)

Details about compliance status for a specific framework

## Properties

### findings

> **findings**: `string`[]

Defined in: [types/compliance.ts:182](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/types/compliance.ts#L182)

List of findings or gaps

***

### frameworkName

> **frameworkName**: `string`

Defined in: [types/compliance.ts:176](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/types/compliance.ts#L176)

Name of the framework

***

### metRequirements

> **metRequirements**: `string`[]

Defined in: [types/compliance.ts:185](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/types/compliance.ts#L185)

List of requirements that are met

***

### recommendations

> **recommendations**: `string`[]

Defined in: [types/compliance.ts:191](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/types/compliance.ts#L191)

Recommendations for achieving compliance

***

### status

> **status**: `string`

Defined in: [types/compliance.ts:179](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/types/compliance.ts#L179)

Current compliance status

***

### unmetRequirements

> **unmetRequirements**: `string`[]

Defined in: [types/compliance.ts:188](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/types/compliance.ts#L188)

List of requirements that are not met
