[**CIA Compliance Manager Documentation v0.8.32**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/widgets](../README.md) / CIAImpactSummaryWidgetProps

# Interface: CIAImpactSummaryWidgetProps

Defined in: [types/widgets.ts:376](https://github.com/Hack23/cia-compliance-manager/blob/0dc9a11e510cc2f2986e7debe532892627f2b00f/src/types/widgets.ts#L376)

Props for the CIA Impact Summary Widget

## Business Perspective

This widget provides a consolidated view of security impacts across the
CIA triad, helping security officers understand the overall security
posture at a glance. 📊

## Extends

- [`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:99](https://github.com/Hack23/cia-compliance-manager/blob/0dc9a11e510cc2f2986e7debe532892627f2b00f/src/types/widgets.ts#L99)

Availability security level

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`availabilityLevel`](SecurityLevelWidgetProps.md#availabilitylevel)

***

### className?

> `optional` **className**: `string`

Defined in: [types/widgets.ts:68](https://github.com/Hack23/cia-compliance-manager/blob/0dc9a11e510cc2f2986e7debe532892627f2b00f/src/types/widgets.ts#L68)

Optional CSS class name

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`className`](SecurityLevelWidgetProps.md#classname)

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:109](https://github.com/Hack23/cia-compliance-manager/blob/0dc9a11e510cc2f2986e7debe532892627f2b00f/src/types/widgets.ts#L109)

Confidentiality security level

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`confidentialityLevel`](SecurityLevelWidgetProps.md#confidentialitylevel)

***

### disabled?

> `optional` **disabled**: `boolean`

Defined in: [types/widgets.ts:220](https://github.com/Hack23/cia-compliance-manager/blob/0dc9a11e510cc2f2986e7debe532892627f2b00f/src/types/widgets.ts#L220)

Whether the widget is disabled

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`disabled`](SecurityLevelWidgetProps.md#disabled)

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:104](https://github.com/Hack23/cia-compliance-manager/blob/0dc9a11e510cc2f2986e7debe532892627f2b00f/src/types/widgets.ts#L104)

Integrity security level

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`integrityLevel`](SecurityLevelWidgetProps.md#integritylevel)

***

### onLevelChange()?

> `optional` **onLevelChange**: (`component`, `level`) => `void`

Defined in: [types/widgets.ts:212](https://github.com/Hack23/cia-compliance-manager/blob/0dc9a11e510cc2f2986e7debe532892627f2b00f/src/types/widgets.ts#L212)

Callback for when security levels change

#### Parameters

##### component

`"confidentiality"` | `"integrity"` | `"availability"`

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`onLevelChange`](SecurityLevelWidgetProps.md#onlevelchange)

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:78](https://github.com/Hack23/cia-compliance-manager/blob/0dc9a11e510cc2f2986e7debe532892627f2b00f/src/types/widgets.ts#L78)

Optional security level for widgets that only need one level

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`securityLevel`](SecurityLevelWidgetProps.md#securitylevel)

***

### showDetails?

> `optional` **showDetails**: `boolean`

Defined in: [types/widgets.ts:380](https://github.com/Hack23/cia-compliance-manager/blob/0dc9a11e510cc2f2986e7debe532892627f2b00f/src/types/widgets.ts#L380)

Whether to show detailed information

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widgets.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/0dc9a11e510cc2f2986e7debe532892627f2b00f/src/types/widgets.ts#L73)

Optional test ID for testing

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`testId`](SecurityLevelWidgetProps.md#testid)
