[**CIA Compliance Manager API Documentation v0.7.0**](../../../README.md)

***

[CIA Compliance Manager API Documentation](../../../modules.md) / [types/cia](../README.md) / ComplianceFramework

# Interface: ComplianceFramework

Defined in: [src/types/cia.tsx:212](https://github.com/Hack23/cia-compliance-manager/blob/a904e43458f81faf7066f9da9fc149cc9f6e236d/src/types/cia.tsx#L212)

ComplianceFramework represents a compliance framework and its
associated requirements

## Properties

### description

> **description**: `string`

Defined in: [src/types/cia.tsx:214](https://github.com/Hack23/cia-compliance-manager/blob/a904e43458f81faf7066f9da9fc149cc9f6e236d/src/types/cia.tsx#L214)

***

### name

> **name**: `string`

Defined in: [src/types/cia.tsx:213](https://github.com/Hack23/cia-compliance-manager/blob/a904e43458f81faf7066f9da9fc149cc9f6e236d/src/types/cia.tsx#L213)

***

### requirements

> **requirements**: [`ComplianceRequirement`](ComplianceRequirement.md)[]

Defined in: [src/types/cia.tsx:215](https://github.com/Hack23/cia-compliance-manager/blob/a904e43458f81faf7066f9da9fc149cc9f6e236d/src/types/cia.tsx#L215)

***

### score?

> `optional` **score**: `number`

Defined in: [src/types/cia.tsx:217](https://github.com/Hack23/cia-compliance-manager/blob/a904e43458f81faf7066f9da9fc149cc9f6e236d/src/types/cia.tsx#L217)

***

### status

> **status**: `"compliant"` \| `"non-compliant"` \| `"partial"`

Defined in: [src/types/cia.tsx:216](https://github.com/Hack23/cia-compliance-manager/blob/a904e43458f81faf7066f9da9fc149cc9f6e236d/src/types/cia.tsx#L216)
