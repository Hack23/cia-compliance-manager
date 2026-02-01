[**CIA Compliance Manager Diagrams v1.1.15**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/widgets](../README.md) / SecurityLevelSelectorProps

# Interface: SecurityLevelSelectorProps

Defined in: [types/widgets.ts:443](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widgets.ts#L443)

Props for security level selector components

## Business Perspective

These interactive controls allow users to adjust security levels,
providing immediate feedback on the impact of their choices. 🎚️

## Extends

- [`WidgetBaseProps`](WidgetBaseProps.md)

## Properties

### className?

> `optional` **className**: `string`

Defined in: [types/widgets.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widgets.ts#L56)

Optional CSS class name

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`className`](WidgetBaseProps.md#classname)

***

### compact?

> `optional` **compact**: `boolean`

Defined in: [types/widgets.ts:472](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widgets.ts#L472)

Whether to use compact layout

***

### component

> **component**: `"confidentiality"` \| `"integrity"` \| `"availability"`

Defined in: [types/widgets.ts:457](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widgets.ts#L457)

The CIA component this selector controls

***

### disabled?

> `optional` **disabled**: `boolean`

Defined in: [types/widgets.ts:477](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widgets.ts#L477)

Whether the selector is disabled

***

### highlight?

> `optional` **highlight**: `boolean`

Defined in: [types/widgets.ts:467](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widgets.ts#L467)

Whether to highlight the selector

***

### mode?

> `optional` **mode**: `"horizontal"` \| `"vertical"`

Defined in: [types/widgets.ts:462](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widgets.ts#L462)

Layout orientation

***

### onLevelChange()

> **onLevelChange**: (`level`) => `void`

Defined in: [types/widgets.ts:452](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widgets.ts#L452)

Callback when level changes

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:66](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widgets.ts#L66)

Optional security level for widgets that only need one level

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`securityLevel`](WidgetBaseProps.md#securitylevel)

***

### selectedLevel

> **selectedLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:447](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widgets.ts#L447)

Currently selected security level

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widgets.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/4266fd44b58119e0a4772b578ef7fb2d2999a68d/src/types/widgets.ts#L61)

Optional test ID for testing

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`testId`](WidgetBaseProps.md#testid)
