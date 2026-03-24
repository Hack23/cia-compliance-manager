[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/compliance](../README.md) / ComplianceGap

# Interface: ComplianceGap

Defined in: [types/compliance.ts:133](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L133)

Interface for individual compliance gap

## Properties

### framework

> **framework**: `string`

Defined in: [types/compliance.ts:137](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L137)

Framework name

***

### frameworkDescription

> **frameworkDescription**: `string`

Defined in: [types/compliance.ts:142](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L142)

Framework description

***

### components

> **components**: `object`

Defined in: [types/compliance.ts:147](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L147)

Component-specific gap details

#### availability

> **availability**: `object`

##### availability.current

> **current**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

##### availability.required

> **required**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

##### availability.gap

> **gap**: `number`

#### integrity

> **integrity**: `object`

##### integrity.current

> **current**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

##### integrity.required

> **required**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

##### integrity.gap

> **gap**: `number`

#### confidentiality

> **confidentiality**: `object`

##### confidentiality.current

> **current**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

##### confidentiality.required

> **required**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

##### confidentiality.gap

> **gap**: `number`

***

### recommendations

> **recommendations**: `string`[]

Defined in: [types/compliance.ts:168](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/compliance.ts#L168)

Recommendations for addressing this gap
