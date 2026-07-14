[**CIA Compliance Manager — Markdown Documentation v1.1.109**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/compliance](../README.md) / ComplianceGap

# Interface: ComplianceGap

Defined in: [types/compliance.ts:129](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/compliance.ts#L129)

Interface for individual compliance gap

## Properties

### framework

> **framework**: `string`

Defined in: [types/compliance.ts:133](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/compliance.ts#L133)

Framework name

***

### frameworkDescription

> **frameworkDescription**: `string`

Defined in: [types/compliance.ts:138](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/compliance.ts#L138)

Framework description

***

### components

> **components**: `object`

Defined in: [types/compliance.ts:143](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/compliance.ts#L143)

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

Defined in: [types/compliance.ts:164](https://github.com/Hack23/cia-compliance-manager/blob/4b7a9ab8adfe47657e87aecf132299a35e49435a/src/types/compliance.ts#L164)

Recommendations for addressing this gap
