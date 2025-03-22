[**CIA Compliance Manager Diagrams v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/widgets](../README.md) / IntegrityImpactWidgetProps

# Interface: IntegrityImpactWidgetProps

Defined in: [src/types/widgets.ts:257](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L257)

Props for the Integrity Impact Widget

## Extends

- [`WidgetBaseProps`](WidgetBaseProps.md)

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [src/types/widgets.ts:263](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L263)

***

### className?

> `optional` **className**: `string`

Defined in: [src/types/widgets.ts:87](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L87)

Optional CSS class name

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`className`](WidgetBaseProps.md#classname)

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [src/types/widgets.ts:264](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L264)

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [src/types/widgets.ts:262](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L262)

***

### level?

> `optional` **level**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [src/types/widgets.ts:259](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L259)

***

### onLevelChange()?

> `optional` **onLevelChange**: (`level`) => `void`

Defined in: [src/types/widgets.ts:266](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L266)

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [src/types/widgets.ts:97](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L97)

Optional security level for widgets that only need one level

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`securityLevel`](WidgetBaseProps.md#securitylevel)

***

### testId?

> `optional` **testId**: `string`

Defined in: [src/types/widgets.ts:92](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L92)

Optional test ID for testing

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`testId`](WidgetBaseProps.md#testid)
