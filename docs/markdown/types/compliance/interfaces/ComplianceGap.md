[**CIA Compliance Manager Documentation v1.1.11**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/compliance](../README.md) / ComplianceGap

# Interface: ComplianceGap

Defined in: [types/compliance.ts:133](https://github.com/Hack23/cia-compliance-manager/blob/bdceac647232fcd21e28eab47eb85ed4588b8e2a/src/types/compliance.ts#L133)

Interface for individual compliance gap

## Properties

### components

> **components**: `object`

Defined in: [types/compliance.ts:147](https://github.com/Hack23/cia-compliance-manager/blob/bdceac647232fcd21e28eab47eb85ed4588b8e2a/src/types/compliance.ts#L147)

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

Defined in: [types/compliance.ts:137](https://github.com/Hack23/cia-compliance-manager/blob/bdceac647232fcd21e28eab47eb85ed4588b8e2a/src/types/compliance.ts#L137)

Framework name

***

### frameworkDescription

> **frameworkDescription**: `string`

Defined in: [types/compliance.ts:142](https://github.com/Hack23/cia-compliance-manager/blob/bdceac647232fcd21e28eab47eb85ed4588b8e2a/src/types/compliance.ts#L142)

Framework description

***

### recommendations

> **recommendations**: `string`[]

Defined in: [types/compliance.ts:168](https://github.com/Hack23/cia-compliance-manager/blob/bdceac647232fcd21e28eab47eb85ed4588b8e2a/src/types/compliance.ts#L168)

Recommendations for addressing this gap
