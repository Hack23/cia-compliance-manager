[**CIA Compliance Manager Diagrams v1.1.14**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/widgets](../README.md) / CIAImpactSummaryWidgetProps

# Interface: CIAImpactSummaryWidgetProps

Defined in: [types/widgets.ts:362](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/widgets.ts#L362)

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

Defined in: [types/widgets.ts:87](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/widgets.ts#L87)

Availability security level

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`availabilityLevel`](SecurityLevelWidgetProps.md#availabilitylevel)

***

### className?

> `optional` **className**: `string`

Defined in: [types/widgets.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/widgets.ts#L56)

Optional CSS class name

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`className`](SecurityLevelWidgetProps.md#classname)

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:97](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/widgets.ts#L97)

Confidentiality security level

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`confidentialityLevel`](SecurityLevelWidgetProps.md#confidentialitylevel)

***

### disabled?

> `optional` **disabled**: `boolean`

Defined in: [types/widgets.ts:208](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/widgets.ts#L208)

Whether the widget is disabled

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`disabled`](SecurityLevelWidgetProps.md#disabled)

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:92](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/widgets.ts#L92)

Integrity security level

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`integrityLevel`](SecurityLevelWidgetProps.md#integritylevel)

***

### onLevelChange()?

> `optional` **onLevelChange**: (`component`, `level`) => `void`

Defined in: [types/widgets.ts:200](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/widgets.ts#L200)

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

Defined in: [types/widgets.ts:66](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/widgets.ts#L66)

Optional security level for widgets that only need one level

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`securityLevel`](SecurityLevelWidgetProps.md#securitylevel)

***

### showDetails?

> `optional` **showDetails**: `boolean`

Defined in: [types/widgets.ts:366](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/widgets.ts#L366)

Whether to show detailed information

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widgets.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/widgets.ts#L61)

Optional test ID for testing

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`testId`](SecurityLevelWidgetProps.md#testid)
