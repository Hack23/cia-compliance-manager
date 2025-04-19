[**CIA Compliance Manager Documentation v0.8.8**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/compliance](../README.md) / ComplianceGap

# Interface: ComplianceGap

Defined in: [types/compliance.ts:114](https://github.com/Hack23/cia-compliance-manager/blob/283c1f3ddf6c7084b20c21176cda3bc5166ffcb9/src/types/compliance.ts#L114)

Interface for individual compliance gap

## Properties

### components

> **components**: `object`

Defined in: [types/compliance.ts:128](https://github.com/Hack23/cia-compliance-manager/blob/283c1f3ddf6c7084b20c21176cda3bc5166ffcb9/src/types/compliance.ts#L128)

Component-specific gap details

#### availability

> **availability**: `object`

##### availability.current

> **current**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

##### availability.gap

> **gap**: `number`

##### availability.required

> **required**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### confidentiality

> **confidentiality**: `object`

##### confidentiality.current

> **current**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

##### confidentiality.gap

> **gap**: `number`

##### confidentiality.required

> **required**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### integrity

> **integrity**: `object`

##### integrity.current

> **current**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

##### integrity.gap

> **gap**: `number`

##### integrity.required

> **required**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

***

### framework

> **framework**: `string`

Defined in: [types/compliance.ts:118](https://github.com/Hack23/cia-compliance-manager/blob/283c1f3ddf6c7084b20c21176cda3bc5166ffcb9/src/types/compliance.ts#L118)

Framework name

***

### frameworkDescription

> **frameworkDescription**: `string`

Defined in: [types/compliance.ts:123](https://github.com/Hack23/cia-compliance-manager/blob/283c1f3ddf6c7084b20c21176cda3bc5166ffcb9/src/types/compliance.ts#L123)

Framework description

***

### recommendations

> **recommendations**: `string`[]

Defined in: [types/compliance.ts:149](https://github.com/Hack23/cia-compliance-manager/blob/283c1f3ddf6c7084b20c21176cda3bc5166ffcb9/src/types/compliance.ts#L149)

Recommendations for addressing this gap
