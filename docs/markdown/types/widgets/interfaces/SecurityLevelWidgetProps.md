[**CIA Compliance Manager Documentation v1.1.14**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/widgets](../README.md) / SecurityLevelWidgetProps

# Interface: SecurityLevelWidgetProps

Defined in: [types/widgets.ts:196](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/widgets.ts#L196)

Security level widget props for selecting and displaying security levels

## Business Perspective

These widgets provide interactive controls for security professionals to
adjust security levels and immediately see the impact of their choices. 🔄

## Extends

- [`CIABaseWidgetProps`](CIABaseWidgetProps.md)

## Extended by

- [`CIAImpactSummaryWidgetProps`](CIAImpactSummaryWidgetProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:87](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/widgets.ts#L87)

Availability security level

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`availabilityLevel`](CIABaseWidgetProps.md#availabilitylevel)

***

### className?

> `optional` **className**: `string`

Defined in: [types/widgets.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/widgets.ts#L56)

Optional CSS class name

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`className`](CIABaseWidgetProps.md#classname)

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:97](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/widgets.ts#L97)

Confidentiality security level

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`confidentialityLevel`](CIABaseWidgetProps.md#confidentialitylevel)

***

### disabled?

> `optional` **disabled**: `boolean`

Defined in: [types/widgets.ts:208](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/widgets.ts#L208)

Whether the widget is disabled

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:92](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/widgets.ts#L92)

Integrity security level

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`integrityLevel`](CIABaseWidgetProps.md#integritylevel)

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

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:66](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/widgets.ts#L66)

Optional security level for widgets that only need one level

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`securityLevel`](CIABaseWidgetProps.md#securitylevel)

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widgets.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/2572cfa2ede06cc7942019b0f742928ad9d5ceb3/src/types/widgets.ts#L61)

Optional test ID for testing

#### Inherited from

[`CIABaseWidgetProps`](CIABaseWidgetProps.md).[`testId`](CIABaseWidgetProps.md#testid)
