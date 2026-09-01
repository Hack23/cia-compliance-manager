[**CIA Compliance Manager — Markdown Documentation v1.1.142**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/compliance](../README.md) / ComplianceFrameworkStatusDetails

# Interface: ComplianceFrameworkStatusDetails

Defined in: [types/compliance.ts:170](https://github.com/Hack23/cia-compliance-manager/blob/7749169fe0dfb00ea4da12e5941787f96c33f1d8/src/types/compliance.ts#L170)

Details about compliance status for a specific framework

## Properties

### frameworkName

> **frameworkName**: `string`

Defined in: [types/compliance.ts:172](https://github.com/Hack23/cia-compliance-manager/blob/7749169fe0dfb00ea4da12e5941787f96c33f1d8/src/types/compliance.ts#L172)

Name of the framework

***

### status

> **status**: `string`

Defined in: [types/compliance.ts:175](https://github.com/Hack23/cia-compliance-manager/blob/7749169fe0dfb00ea4da12e5941787f96c33f1d8/src/types/compliance.ts#L175)

Current compliance status

***

### findings

> **findings**: `string`[]

Defined in: [types/compliance.ts:178](https://github.com/Hack23/cia-compliance-manager/blob/7749169fe0dfb00ea4da12e5941787f96c33f1d8/src/types/compliance.ts#L178)

List of findings or gaps

***

### metRequirements

> **metRequirements**: `string`[]

Defined in: [types/compliance.ts:181](https://github.com/Hack23/cia-compliance-manager/blob/7749169fe0dfb00ea4da12e5941787f96c33f1d8/src/types/compliance.ts#L181)

List of requirements that are met

***

### unmetRequirements

> **unmetRequirements**: `string`[]

Defined in: [types/compliance.ts:184](https://github.com/Hack23/cia-compliance-manager/blob/7749169fe0dfb00ea4da12e5941787f96c33f1d8/src/types/compliance.ts#L184)

List of requirements that are not met

***

### recommendations

> **recommendations**: `string`[]

Defined in: [types/compliance.ts:187](https://github.com/Hack23/cia-compliance-manager/blob/7749169fe0dfb00ea4da12e5941787f96c33f1d8/src/types/compliance.ts#L187)

Recommendations for achieving compliance
