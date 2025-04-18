[**CIA Compliance Manager Diagrams v0.8.8**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [types](../README.md) / SecurityResourcesWidgetProps

# Interface: SecurityResourcesWidgetProps

Defined in: [types/widgets.ts:412](https://github.com/Hack23/cia-compliance-manager/blob/67855c73d041b21b5f90a46884e0e48cd0961cda/src/types/widgets.ts#L412)

Props for security resources widgets

## Business Perspective

These widgets provide resources and guidance for implementing security
controls, supporting security practitioners with practical implementation
advice and best practices. 📚

## Extends

- [`CIABaseWidgetProps`](CIABaseWidgetProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:99](https://github.com/Hack23/cia-compliance-manager/blob/67855c73d041b21b5f90a46884e0e48cd0961cda/src/types/widgets.ts#L99)

Availability security level

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`availabilityLevel`](CIABaseWidgetProps.md#availabilitylevel)

***

### className?

> `optional` **className**: `string`

Defined in: [types/widgets.ts:68](https://github.com/Hack23/cia-compliance-manager/blob/67855c73d041b21b5f90a46884e0e48cd0961cda/src/types/widgets.ts#L68)

Optional CSS class name

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`className`](CIABaseWidgetProps.md#classname)

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:109](https://github.com/Hack23/cia-compliance-manager/blob/67855c73d041b21b5f90a46884e0e48cd0961cda/src/types/widgets.ts#L109)

Confidentiality security level

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`confidentialityLevel`](CIABaseWidgetProps.md#confidentialitylevel)

***

### filter?

> `optional` **filter**: `string`

Defined in: [types/widgets.ts:416](https://github.com/Hack23/cia-compliance-manager/blob/67855c73d041b21b5f90a46884e0e48cd0961cda/src/types/widgets.ts#L416)

Optional filter for resources

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:104](https://github.com/Hack23/cia-compliance-manager/blob/67855c73d041b21b5f90a46884e0e48cd0961cda/src/types/widgets.ts#L104)

Integrity security level

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`integrityLevel`](CIABaseWidgetProps.md#integritylevel)

***

### maxItems?

> `optional` **maxItems**: `number`

Defined in: [types/widgets.ts:421](https://github.com/Hack23/cia-compliance-manager/blob/67855c73d041b21b5f90a46884e0e48cd0961cda/src/types/widgets.ts#L421)

Maximum number of items to display

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:78](https://github.com/Hack23/cia-compliance-manager/blob/67855c73d041b21b5f90a46884e0e48cd0961cda/src/types/widgets.ts#L78)

Optional security level for widgets that only need one level

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`securityLevel`](CIABaseWidgetProps.md#securitylevel)

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widgets.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/67855c73d041b21b5f90a46884e0e48cd0961cda/src/types/widgets.ts#L73)

Optional test ID for testing

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`testId`](CIABaseWidgetProps.md#testid)
