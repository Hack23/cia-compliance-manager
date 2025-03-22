[**CIA Compliance Manager Diagrams v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/widgets](../README.md) / SecurityLevelSelectorProps

# Interface: SecurityLevelSelectorProps

Defined in: [src/types/widgets.ts:216](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L216)

Base props for all widgets

## Extends

- [`WidgetBaseProps`](WidgetBaseProps.md)

## Properties

### className?

> `optional` **className**: `string`

Defined in: [src/types/widgets.ts:87](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L87)

Optional CSS class name

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`className`](WidgetBaseProps.md#classname)

***

### compact?

> `optional` **compact**: `boolean`

Defined in: [src/types/widgets.ts:222](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L222)

***

### component

> **component**: `"confidentiality"` \| `"integrity"` \| `"availability"`

Defined in: [src/types/widgets.ts:219](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L219)

***

### disabled?

> `optional` **disabled**: `boolean`

Defined in: [src/types/widgets.ts:223](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L223)

***

### highlight?

> `optional` **highlight**: `boolean`

Defined in: [src/types/widgets.ts:221](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L221)

***

### mode?

> `optional` **mode**: `"horizontal"` \| `"vertical"`

Defined in: [src/types/widgets.ts:220](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L220)

***

### onLevelChange()

> **onLevelChange**: (`level`) => `void`

Defined in: [src/types/widgets.ts:218](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L218)

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

### selectedLevel

> **selectedLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [src/types/widgets.ts:217](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L217)

***

### testId?

> `optional` **testId**: `string`

Defined in: [src/types/widgets.ts:92](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L92)

Optional test ID for testing

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`testId`](WidgetBaseProps.md#testid)
