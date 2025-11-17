[**CIA Compliance Manager Diagrams v0.8.40**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/widgets](../README.md) / SecurityLevelSelectorProps

# Interface: SecurityLevelSelectorProps

Defined in: [types/widgets.ts:457](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/widgets.ts#L457)

Props for security level selector components

## Business Perspective

These interactive controls allow users to adjust security levels,
providing immediate feedback on the impact of their choices. 🎚️

## Extends

- [`WidgetBaseProps`](WidgetBaseProps.md)

## Properties

### className?

> `optional` **className**: `string`

Defined in: [types/widgets.ts:68](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/widgets.ts#L68)

Optional CSS class name

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`className`](WidgetBaseProps.md#classname)

***

### compact?

> `optional` **compact**: `boolean`

Defined in: [types/widgets.ts:486](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/widgets.ts#L486)

Whether to use compact layout

***

### component

> **component**: `"confidentiality"` \| `"integrity"` \| `"availability"`

Defined in: [types/widgets.ts:471](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/widgets.ts#L471)

The CIA component this selector controls

***

### disabled?

> `optional` **disabled**: `boolean`

Defined in: [types/widgets.ts:491](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/widgets.ts#L491)

Whether the selector is disabled

***

### highlight?

> `optional` **highlight**: `boolean`

Defined in: [types/widgets.ts:481](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/widgets.ts#L481)

Whether to highlight the selector

***

### mode?

> `optional` **mode**: `"horizontal"` \| `"vertical"`

Defined in: [types/widgets.ts:476](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/widgets.ts#L476)

Layout orientation

***

### onLevelChange()

> **onLevelChange**: (`level`) => `void`

Defined in: [types/widgets.ts:466](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/widgets.ts#L466)

Callback when level changes

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:78](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/widgets.ts#L78)

Optional security level for widgets that only need one level

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`securityLevel`](WidgetBaseProps.md#securitylevel)

***

### selectedLevel

> **selectedLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:461](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/widgets.ts#L461)

Currently selected security level

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widgets.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/widgets.ts#L73)

Optional test ID for testing

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`testId`](WidgetBaseProps.md#testid)
