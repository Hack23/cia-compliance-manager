[**CIA Compliance Manager Documentation v1.0.3**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/widgets](../README.md) / SecurityComponentProps

# Interface: SecurityComponentProps

Defined in: [types/widgets.ts:421](https://github.com/Hack23/cia-compliance-manager/blob/154d4849b7a49eb8fb95e15a0e05f6b86eed9405/src/types/widgets.ts#L421)

Props for security component widgets

## Business Perspective

These widgets represent individual CIA components, allowing detailed
analysis and adjustment of specific security aspects (availability,
integrity, or confidentiality). 🔍

## Extends

- [`WidgetBaseProps`](WidgetBaseProps.md)

## Properties

### className?

> `optional` **className**: `string`

Defined in: [types/widgets.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/154d4849b7a49eb8fb95e15a0e05f6b86eed9405/src/types/widgets.ts#L56)

Optional CSS class name

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`className`](WidgetBaseProps.md#classname)

***

### component

> **component**: `"confidentiality"` \| `"integrity"` \| `"availability"`

Defined in: [types/widgets.ts:425](https://github.com/Hack23/cia-compliance-manager/blob/154d4849b7a49eb8fb95e15a0e05f6b86eed9405/src/types/widgets.ts#L425)

The CIA component this widget represents

***

### level

> **level**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:430](https://github.com/Hack23/cia-compliance-manager/blob/154d4849b7a49eb8fb95e15a0e05f6b86eed9405/src/types/widgets.ts#L430)

Security level for this component

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:66](https://github.com/Hack23/cia-compliance-manager/blob/154d4849b7a49eb8fb95e15a0e05f6b86eed9405/src/types/widgets.ts#L66)

Optional security level for widgets that only need one level

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`securityLevel`](WidgetBaseProps.md#securitylevel)

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widgets.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/154d4849b7a49eb8fb95e15a0e05f6b86eed9405/src/types/widgets.ts#L61)

Optional test ID for testing

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`testId`](WidgetBaseProps.md#testid)
