[**CIA Compliance Manager Documentation v0.8.39**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/widgets](../README.md) / SecurityComponentProps

# Interface: SecurityComponentProps

Defined in: [types/widgets.ts:435](https://github.com/Hack23/cia-compliance-manager/blob/9eb094f233d2f30300190730a81ad03ea8549a0e/src/types/widgets.ts#L435)

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

Defined in: [types/widgets.ts:68](https://github.com/Hack23/cia-compliance-manager/blob/9eb094f233d2f30300190730a81ad03ea8549a0e/src/types/widgets.ts#L68)

Optional CSS class name

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`className`](WidgetBaseProps.md#classname)

***

### component

> **component**: `"confidentiality"` \| `"integrity"` \| `"availability"`

Defined in: [types/widgets.ts:439](https://github.com/Hack23/cia-compliance-manager/blob/9eb094f233d2f30300190730a81ad03ea8549a0e/src/types/widgets.ts#L439)

The CIA component this widget represents

***

### level

> **level**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:444](https://github.com/Hack23/cia-compliance-manager/blob/9eb094f233d2f30300190730a81ad03ea8549a0e/src/types/widgets.ts#L444)

Security level for this component

***

### securityLevel?

> `optional` **securityLevel**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:78](https://github.com/Hack23/cia-compliance-manager/blob/9eb094f233d2f30300190730a81ad03ea8549a0e/src/types/widgets.ts#L78)

Optional security level for widgets that only need one level

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`securityLevel`](WidgetBaseProps.md#securitylevel)

***

### testId?

> `optional` **testId**: `string`

Defined in: [types/widgets.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/9eb094f233d2f30300190730a81ad03ea8549a0e/src/types/widgets.ts#L73)

Optional test ID for testing

#### Inherited from

[`WidgetBaseProps`](WidgetBaseProps.md).[`testId`](WidgetBaseProps.md#testid)
