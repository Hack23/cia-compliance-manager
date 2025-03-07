[**CIA Compliance Manager API Documentation v0.6.0**](../../../README.md)

***

[CIA Compliance Manager API Documentation](../../../modules.md) / [types/cia](../README.md) / ComplianceFramework

# Interface: ComplianceFramework

Defined in: [src/types/cia.ts:217](https://github.com/Hack23/cia-compliance-manager/blob/ca083b463223765b22422b66b3a43930241849bd/src/types/cia.ts#L217)

ComplianceFramework represents a compliance framework and its
associated requirements

## Properties

### description

> **description**: `string`

Defined in: [src/types/cia.ts:219](https://github.com/Hack23/cia-compliance-manager/blob/ca083b463223765b22422b66b3a43930241849bd/src/types/cia.ts#L219)

***

### name

> **name**: `string`

Defined in: [src/types/cia.ts:218](https://github.com/Hack23/cia-compliance-manager/blob/ca083b463223765b22422b66b3a43930241849bd/src/types/cia.ts#L218)

***

### requirements

> **requirements**: [`ComplianceRequirement`](ComplianceRequirement.md)[]

Defined in: [src/types/cia.ts:220](https://github.com/Hack23/cia-compliance-manager/blob/ca083b463223765b22422b66b3a43930241849bd/src/types/cia.ts#L220)

***

### score?

> `optional` **score**: `number`

Defined in: [src/types/cia.ts:222](https://github.com/Hack23/cia-compliance-manager/blob/ca083b463223765b22422b66b3a43930241849bd/src/types/cia.ts#L222)

***

### status

> **status**: `"compliant"` \| `"non-compliant"` \| `"partial"`

Defined in: [src/types/cia.ts:221](https://github.com/Hack23/cia-compliance-manager/blob/ca083b463223765b22422b66b3a43930241849bd/src/types/cia.ts#L221)
