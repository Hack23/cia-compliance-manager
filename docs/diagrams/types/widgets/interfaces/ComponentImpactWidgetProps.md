[**CIA Compliance Manager Diagrams v1.0.5**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/widgets](../README.md) / ComponentImpactWidgetProps

# Interface: ComponentImpactWidgetProps

Defined in: [types/widgets.ts:490](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/types/widgets.ts#L490)

Props for component impact widgets

## Business Perspective

These widgets help analyze the impact of security levels on specific
CIA components, allowing focused assessment of individual security aspects. 🔍

## Extends

- [`WidgetBaseProps`](WidgetBaseProps.md)

## Properties

### className?

> `optional` **className**: `string`

Defined in: [types/widgets.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/types/widgets.ts#L56)

Optional CSS class name

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`className`](WidgetBaseProps.md#classname)

***

### componentType

> **componentType**: `"confidentiality"` \| `"integrity"` \| `"availability"`

Defined in: [types/widgets.ts:499](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/types/widgets.ts#L499)

The CIA component type to display

***

### level

> **level**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:494](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/types/widgets.ts#L494)

Security level for this component

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:66](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/types/widgets.ts#L66)

Optional security level for widgets that only need one level

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`securityLevel`](WidgetBaseProps.md#securitylevel)

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widgets.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/c49a34536cfcfd69c910d0edcabcf96845464e51/src/types/widgets.ts#L61)

Optional test ID for testing

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`testId`](WidgetBaseProps.md#testid)
