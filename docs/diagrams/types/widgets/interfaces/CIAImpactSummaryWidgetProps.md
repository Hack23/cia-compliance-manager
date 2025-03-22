[**CIA Compliance Manager Diagrams v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/widgets](../README.md) / CIAImpactSummaryWidgetProps

# Interface: CIAImpactSummaryWidgetProps

Defined in: [src/types/widgets.ts:186](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L186)

Props for the CIA Impact Summary Widget

## Extends

- [`WidgetBaseProps`](WidgetBaseProps.md).[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [src/types/widgets.ts:187](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L187)

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`availabilityLevel`](SecurityLevelWidgetProps.md#availabilitylevel)

***

### className?

> `optional` **className**: `string`

Defined in: [src/types/widgets.ts:87](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L87)

Optional CSS class name

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`className`](SecurityLevelWidgetProps.md#classname)

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [src/types/widgets.ts:189](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L189)

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`confidentialityLevel`](SecurityLevelWidgetProps.md#confidentialitylevel)

***

### disabled?

> `optional` **disabled**: `boolean`

Defined in: [src/types/widgets.ts:114](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L114)

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`disabled`](SecurityLevelWidgetProps.md#disabled)

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [src/types/widgets.ts:188](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L188)

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`integrityLevel`](SecurityLevelWidgetProps.md#integritylevel)

***

### onLevelChange()?

> `optional` **onLevelChange**: (`component`, `level`) => `void`

Defined in: [src/types/widgets.ts:110](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L110)

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

Defined in: [src/types/widgets.ts:97](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L97)

Optional security level for widgets that only need one level

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`securityLevel`](SecurityLevelWidgetProps.md#securitylevel)

***

### showDetails?

> `optional` **showDetails**: `boolean`

Defined in: [src/types/widgets.ts:236](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L236)

***

### testId?

> `optional` **testId**: `string`

Defined in: [src/types/widgets.ts:92](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L92)

Optional test ID for testing

#### Inherited from

[`SecurityLevelWidgetProps`](SecurityLevelWidgetProps.md).[`testId`](SecurityLevelWidgetProps.md#testid)
