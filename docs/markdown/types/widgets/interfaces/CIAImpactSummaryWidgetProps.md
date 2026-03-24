[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/widgets](../README.md) / CIAImpactSummaryWidgetProps

# Interface: CIAImpactSummaryWidgetProps

Defined in: [types/widgets.ts:362](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widgets.ts#L362)

Props for the CIA Impact Summary Widget

## Business Perspective

This widget provides a consolidated view of security impacts across the
CIA triad, helping security officers understand the overall security
posture at a glance. 📊

## Extends

- [`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md)

## Properties

### className?

> `optional` **className?**: `string`

Defined in: [types/widgets.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widgets.ts#L56)

Optional CSS class name

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`className`](SecurityLevelWidgetProps.md#classname)

***

### testId?

> `optional` **testId?**: `string`

Defined in: [types/widgets.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widgets.ts#L61)

Optional test ID for testing

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`testId`](SecurityLevelWidgetProps.md#testid)

***

### securityLevel?

> `optional` **securityLevel?**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:66](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widgets.ts#L66)

Optional security level for widgets that only need one level

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`securityLevel`](SecurityLevelWidgetProps.md#securitylevel)

***

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:87](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widgets.ts#L87)

Availability security level

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`availabilityLevel`](SecurityLevelWidgetProps.md#availabilitylevel)

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:92](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widgets.ts#L92)

Integrity security level

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`integrityLevel`](SecurityLevelWidgetProps.md#integritylevel)

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:97](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widgets.ts#L97)

Confidentiality security level

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`confidentialityLevel`](SecurityLevelWidgetProps.md#confidentialitylevel)

***

### onLevelChange?

> `optional` **onLevelChange?**: (`component`, `level`) => `void`

Defined in: [types/widgets.ts:200](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widgets.ts#L200)

Callback for when security levels change

#### Parameters

##### component

`"confidentiality"` \| `"integrity"` \| `"availability"`

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`onLevelChange`](SecurityLevelWidgetProps.md#onlevelchange)

***

### disabled?

> `optional` **disabled?**: `boolean`

Defined in: [types/widgets.ts:208](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widgets.ts#L208)

Whether the widget is disabled

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`disabled`](SecurityLevelWidgetProps.md#disabled)

***

### showDetails?

> `optional` **showDetails?**: `boolean`

Defined in: [types/widgets.ts:366](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/widgets.ts#L366)

Whether to show detailed information
