[**CIA Compliance Manager Diagrams v0.6.0**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/cia](../README.md) / ComplianceFramework

# Interface: ComplianceFramework

Defined in: [types/cia.ts:217](https://github.com/Hack23/cia-compliance-manager/blob/af4d490af0cc82f9f34cb714ef32da0325624163/src/types/cia.ts#L217)

ComplianceFramework represents a compliance framework and its
associated requirements

## Properties

### description

> **description**: `string`

Defined in: [types/cia.ts:219](https://github.com/Hack23/cia-compliance-manager/blob/af4d490af0cc82f9f34cb714ef32da0325624163/src/types/cia.ts#L219)

***

### name

> **name**: `string`

Defined in: [types/cia.ts:218](https://github.com/Hack23/cia-compliance-manager/blob/af4d490af0cc82f9f34cb714ef32da0325624163/src/types/cia.ts#L218)

***

### requirements

> **requirements**: [`ComplianceRequirement`](ComplianceRequirement.md)[]

Defined in: [types/cia.ts:220](https://github.com/Hack23/cia-compliance-manager/blob/af4d490af0cc82f9f34cb714ef32da0325624163/src/types/cia.ts#L220)

***

### score?

> `optional` **score**: `number`

Defined in: [types/cia.ts:222](https://github.com/Hack23/cia-compliance-manager/blob/af4d490af0cc82f9f34cb714ef32da0325624163/src/types/cia.ts#L222)

***

### status

> **status**: `"compliant"` \| `"non-compliant"` \| `"partial"`

Defined in: [types/cia.ts:221](https://github.com/Hack23/cia-compliance-manager/blob/af4d490af0cc82f9f34cb714ef32da0325624163/src/types/cia.ts#L221)
