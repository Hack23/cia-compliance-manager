[**CIA Compliance Manager Diagrams v0.8.5**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [typedoc-entry](../README.md) / SecurityLevelWidgetProps

# Interface: SecurityLevelWidgetProps

Defined in: [types/widgets.ts:208](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/widgets.ts#L208)

Security level widget props for selecting and displaying security levels

## Business Perspective

These widgets provide interactive controls for security professionals to
adjust security levels and immediately see the impact of their choices. 🔄

## Extends

- [`CIABaseWidgetProps`](../../types/interfaces/CIABaseWidgetProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:99](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/widgets.ts#L99)

Availability security level

#### Inherited from

[`CIABaseWidgetProps`](../../types/interfaces/CIABaseWidgetProps.md).[`availabilityLevel`](../../types/interfaces/CIABaseWidgetProps.md#availabilitylevel)

***

### className?

> `optional` **className**: `string`

Defined in: [types/widgets.ts:68](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/widgets.ts#L68)

Optional CSS class name

#### Inherited from

[`CIABaseWidgetProps`](../../types/interfaces/CIABaseWidgetProps.md).[`className`](../../types/interfaces/CIABaseWidgetProps.md#classname)

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:109](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/widgets.ts#L109)

Confidentiality security level

#### Inherited from

[`CIABaseWidgetProps`](../../types/interfaces/CIABaseWidgetProps.md).[`confidentialityLevel`](../../types/interfaces/CIABaseWidgetProps.md#confidentialitylevel)

***

### disabled?

> `optional` **disabled**: `boolean`

Defined in: [types/widgets.ts:220](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/widgets.ts#L220)

Whether the widget is disabled

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:104](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/widgets.ts#L104)

Integrity security level

#### Inherited from

[`CIABaseWidgetProps`](../../types/interfaces/CIABaseWidgetProps.md).[`integrityLevel`](../../types/interfaces/CIABaseWidgetProps.md#integritylevel)

***

### onLevelChange()?

> `optional` **onLevelChange**: (`component`, `level`) => `void`

Defined in: [types/widgets.ts:212](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/widgets.ts#L212)

Callback for when security levels change

#### Parameters

##### component

`"confidentiality"` | `"integrity"` | `"availability"`

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:78](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/widgets.ts#L78)

Optional security level for widgets that only need one level

#### Inherited from

[`CIABaseWidgetProps`](../../types/interfaces/CIABaseWidgetProps.md).[`securityLevel`](../../types/interfaces/CIABaseWidgetProps.md#securitylevel)

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widgets.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/widgets.ts#L73)

Optional test ID for testing

#### Inherited from

[`CIABaseWidgetProps`](../../types/interfaces/CIABaseWidgetProps.md).[`testId`](../../types/interfaces/CIABaseWidgetProps.md#testid)
